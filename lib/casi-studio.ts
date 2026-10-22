// -----------------------------------------------------------------------------
// CASI DI STUDIO — una pagina per i progetti principali (/progetti/<slug>/).
// Il codice viene dai repository: dove è accorciato c'è "// …" (o "# …"),
// a volte con qualche riga compattata per stare nel riquadro.
// -----------------------------------------------------------------------------

export type Codice = {
  /** Percorso del file nel repository, mostrato nella barra del riquadro. */
  file: string
  righe: string
}

export type Capitolo = {
  titolo: string
  testo: string[]
  codice?: Codice
}

/** Schema a livelli: ogni livello è una riga di blocchi. `mio` evidenzia la parte personale. */
export type Livello = {
  nome: string
  blocchi: { nome: string; nota?: string; mio?: boolean }[]
}

export type CasoStudio = {
  slug: string
  /** Paragrafo d'apertura, sotto il titolo. */
  sommario: string
  ruolo: string
  architettura: { didascalia: string; livelli: Livello[] }
  capitoli: Capitolo[]
  numeri: { v: string; k: string }[]
}

export const casiStudio: CasoStudio[] = [
  {
    slug: "tripify",
    sommario:
      "Una piattaforma di viaggi costruita in quattro, come sei microservizi indipendenti e un'app Android. La mia parte è il cuore del prodotto: il catalogo di voli, hotel e attività, con la disponibilità reale, e gli itinerari che gli utenti compongono, condividono o si fanno generare.",
    ruolo: "catalog-service e itinerary-service, dal database alle schermate Android",
    architettura: {
      didascalia:
        "Ogni servizio ha il suo database e nessuno condivide tabelle: si parlano via HTTP (Feign) o eventi (RabbitMQ). Itinerari non copia i dati del catalogo, li chiede ogni volta, così i due servizi non vanno mai fuori sincrono.",
      livelli: [
        { nome: "Client", blocchi: [{ nome: "App Android", nota: "Kotlin · Compose · MVVM", mio: true }] },
        {
          nome: "Ingresso",
          blocchi: [
            { nome: "API Gateway", nota: "rate limiting" },
            { nome: "Keycloak", nota: "OAuth2 · accesso Google" },
          ],
        },
        {
          nome: "Servizi",
          blocchi: [
            { nome: "catalog", nota: "annunci · ricerca · disponibilità", mio: true },
            { nome: "itinerary", nota: "liste · generazione · .ics", mio: true },
            { nome: "booking", nota: "carrello · checkout" },
            { nome: "user-auth", nota: "profili" },
            { nome: "communication", nota: "notifiche" },
          ],
        },
        {
          nome: "Dati",
          blocchi: [
            { nome: "PostgreSQL", nota: "uno per servizio" },
            { nome: "RabbitMQ", nota: "eventi" },
          ],
        },
      ],
    },
    capitoli: [
      {
        titolo: "Niente overbooking",
        testo: [
          "Quando un utente avvia il checkout, il catalogo blocca posti o camere per 15 minuti. Mentre si calcola la disponibilità la riga della classe tariffaria è bloccata in scrittura: due richieste per l'ultimo posto vengono servite una dopo l'altra, e la seconda trova il posto già occupato.",
          "La disponibilità non è un contatore: è il totale meno i blocchi ancora attivi, e per un hotel il minimo notte per notte. Alla fine il pagamento conferma il blocco; se il checkout fallisce, booking chiama la compensazione e il blocco si libera, come in una saga.",
        ],
        codice: {
          file: "catalog-service/…/AvailabilityServiceImpl.java",
          righe: `// FareClassRepository: la riga resta bloccata fino alla fine della transazione
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT fc FROM FareClass fc WHERE fc.id = :id")
Optional<FareClass> findByIdForUpdate(@Param("id") Long id);

@Transactional
public HoldResultDTO holdSeats(Long fareClassId, int seats, String userId) {
    // … controlli su posti richiesti e volo già partito
    FareClass fareClass = fareClassRepository.findByIdForUpdate(fareClassId)
            .orElseThrow(() -> new CatalogItemNotFoundException(fareClassId));

    LocalDateTime now = LocalDateTime.now();
    int available = computeSeatAvailability(fareClass, now);
    if (available < seats) {
        throw new InsufficientAvailabilityException("Disponibilità insufficiente …");
    }

    SeatHold hold = SeatHold.builder()
            .fareClass(fareClass).seats(seats).userId(userId)
            .status(HoldStatus.HELD)
            .createdAt(now)
            .expiresAt(now.plus(HOLD_DURATION)) // 15 minuti
            .build();
    hold = seatHoldRepository.save(hold);
    return new HoldResultDTO(SEAT_PREFIX + hold.getId(), hold.getExpiresAt());
}`,
        },
      },
      {
        titolo: "Una ricerca, undici filtri",
        testo: [
          "Voli, hotel e attività sono sottoclassi della stessa entità JPA, quindi una sola ricerca li copre tutti. I filtri (categoria, parola chiave, prezzo, voto, destinazione, partenza, guida, servizi, voli diretti, data, posti) si combinano liberamente: la query si costruisce a runtime con il pattern Specification, aggiungendo un predicato per ogni filtro presente.",
          "La destinazione cambia significato a seconda del tipo: città d'arrivo per un volo, città per un hotel o un'attività. Con treat() la stessa condizione guarda il campo giusto per ogni sottoclasse.",
        ],
        codice: {
          file: "catalog-service/…/spec/CatalogItemSpecification.java",
          righe: `return (root, query, cb) -> {
    List<Predicate> predicates = new ArrayList<>();
    predicates.add(cb.isTrue(root.get("isActive")));

    if (keyword != null && !keyword.trim().isEmpty()) {
        String likePattern = "%" + keyword.toLowerCase() + "%";
        predicates.add(cb.or(
                cb.like(cb.lower(root.get("title")), likePattern),
                cb.like(cb.lower(root.get("description")), likePattern)));
    }

    // Destinazione: arrivalCity per i voli, city per hotel e attività
    if (destination != null && !destination.trim().isEmpty()) {
        String destPattern = "%" + destination.trim().toLowerCase() + "%";
        Root<Flight> flightRoot = cb.treat(root, Flight.class);
        Root<Hotel> hotelRoot = cb.treat(root, Hotel.class);
        predicates.add(cb.or(
                cb.and(cb.equal(root.type(), Flight.class),
                       cb.like(cb.lower(flightRoot.get("arrivalCity")), destPattern)),
                cb.and(cb.equal(root.type(), Hotel.class),
                       cb.like(cb.lower(hotelRoot.get("city")), destPattern))
                // …
        ));
    }
    // … prezzo, voto, servizi, voli diretti, data, posti
    return cb.and(predicates.toArray(new Predicate[0]));
};`,
        },
      },
      {
        titolo: "L'itinerario che si scrive da solo",
        testo: [
          "Da città, durata, numero di viaggiatori e budget, il servizio compone un itinerario completo: il volo più economico che abbia posti per tutta la comitiva (non il più economico in assoluto), un hotel nella stessa città esatta d'arrivo, un'attività al giorno finché il budget lo permette, e il volo di ritorno se c'è.",
          "Per l'hotel conta il costo totale, non il prezzo a listino: una camera da 80 € per due persone, per una comitiva di quattro, costa più di una da 100 € per quattro.",
        ],
        codice: {
          file: "itinerary-service/…/ItineraryService.java",
          righe: `// Il più economico tra i voli con posti per tutta la comitiva: uno con una sola
// tariffa da 6 posti non basta per 10 viaggiatori, anche se costa meno.
CatalogItemSummaryDTO flight = flights.stream()
        .filter(f -> flightHasCapacityFor(f, travelers))
        .findFirst()
        .orElse(null);

// Una camera da 80 € che ospita 2 persone richiede 2 camere (160 €) per una
// comitiva di 4, mentre una da 100 € che ne ospita 4 basta da sola.
private RoomChoice cheapestRoomChoiceFor(CatalogItemSummaryDTO hotel, int travelers) {
    if (hotel.roomTypes() == null || hotel.roomTypes().isEmpty()) return null;
    RoomChoice best = null;
    for (CatalogItemSummaryDTO.RoomTypeSummaryDTO roomType : hotel.roomTypes()) {
        int occupancy = (roomType.maxOccupancy() != null && roomType.maxOccupancy() > 0)
                ? roomType.maxOccupancy() : travelers;
        int rooms = (int) Math.ceil(travelers / (double) occupancy);
        BigDecimal totalPerNight = (roomType.price() != null ? roomType.price() : BigDecimal.ZERO)
                .multiply(BigDecimal.valueOf(rooms));
        if (best == null || totalPerNight.compareTo(best.totalPerNight()) < 0) {
            best = new RoomChoice(roomType, rooms, totalPerNight);
        }
    }
    return best;
}`,
        },
      },
      {
        titolo: "Due bug che ora riconosco",
        testo: [
          "Il primo: il lock ottimistico sulle liste condivise. Aggiungendo @Version a una tabella che aveva già delle righe, la colonna nasceva vuota; in SQL NULL = NULL non è mai vero, quindi ogni modifica a una lista esistente falliva con un falso conflitto. La correzione è un valore di default sulla colonna e una sistemazione una tantum delle righe vecchie.",
          "Il secondo: «Prenota tutto» aggiungeva davvero tutto al carrello, ma rispondeva con un errore 500. Un metodo della classe ne chiamava un altro annotato @Transactional, e una chiamata interna scavalca il proxy di Spring: la transazione non si apriva mai. Nei test non si vedeva perché ogni test gira già dentro una transazione. Ora la transazione si apre in modo esplicito.",
        ],
        codice: {
          file: "itinerary-service/…/ItineraryService.java · FavoriteList.java",
          righe: `// Prima: this.registerBookingAttempt(...) ignorava @Transactional
// (chiamata interna, il proxy di Spring non entra in gioco).
if (successCount > 0) {
    new TransactionTemplate(transactionManager)
            .executeWithoutResult(status -> repository.incrementBookingsCount(listId));
}

// Lock ottimistico: senza default le righe già esistenti restavano a NULL
@Version
@Column(name = "version", nullable = false, columnDefinition = "bigint default 0")
private Long version = 0L;`,
        },
      },
    ],
    numeri: [
      { v: "6", k: "microservizi" },
      { v: "2", k: "miei, dal database all'app" },
      { v: "11", k: "filtri combinabili" },
      { v: "15′", k: "di blocco al checkout" },
    ],
  },
  {
    slug: "tesi",
    sommario:
      "La mia tesi triennale: un'app desktop con cui il docente di Fondamenti di Programmazione prepara gli esami in Python per Moodle. Prima si scrivevano a mano, domanda per domanda, e un output atteso sbagliato arrivava agli studenti durante l'esame. Qui ogni test viene verificato eseguendo la soluzione, e si esporta solo quando tutto passa.",
    ruolo: "Tutto: interfaccia, backend, installer. Progetto individuale",
    architettura: {
      didascalia:
        "Electron avvia il backend Python su una porta libera e gli passa un codice segreto diverso a ogni avvio. La pagina non vede Node.js: parla solo col preload e, via HTTP, col backend. Il backend è esagonale: il dominio non dipende da niente, i dettagli stanno negli adattatori.",
      livelli: [
        {
          nome: "Finestra",
          blocchi: [
            { nome: "Interfaccia React", nota: "TypeScript · Monaco · Tiptap", mio: true },
            { nome: "Preload", nota: "unico ponte · contextIsolation", mio: true },
          ],
        },
        {
          nome: "Electron",
          blocchi: [{ nome: "Processo principale", nota: "porta libera · codice segreto · finestra", mio: true }],
        },
        {
          nome: "Backend",
          blocchi: [
            { nome: "API FastAPI", nota: "X-App-Token · solo 127.0.0.1", mio: true },
            { nome: "Applicazione", nota: "verifica · codice studenti · archivio", mio: true },
            { nome: "Dominio", nota: "esercizi · tracce", mio: true },
          ],
        },
        {
          nome: "Adattatori",
          blocchi: [
            { nome: "Esecuzione Python", nota: "3 s · 1 MB", mio: true },
            { nome: "Moodle XML", nota: "import · export", mio: true },
            { nome: "Archivio SQLite", nota: "backup · cestino", mio: true },
          ],
        },
      ],
    },
    capitoli: [
      {
        titolo: "Eseguire la soluzione come fa CodeRunner",
        testo: [
          "Gli output attesi non si scrivono: si ottengono eseguendo la soluzione del docente su ogni input. Per avere lo stesso risultato di Moodle l'app riproduce il tipo CodeRunner python3_w_input, che ristampa ogni riga letta con input(): per questo negli XML l'output atteso comincia con l'input.",
          "Ogni esecuzione ha un tempo limite di 3 secondi e un output massimo di 1 MB, controllato mentre il programma gira: una soluzione con un ciclo infinito viene fermata invece di bloccare l'app.",
        ],
        codice: {
          file: "backend/src/tesi/adapters/local_runner.py",
          righe: `# Riproduce il tipo CodeRunner "python3_w_input": ogni riga letta con input()
# viene ristampata sull'output.
_W_INPUT_PRELUDE = """\\
__saved_input__ = input
def input(prompt=""):
    s = __saved_input__(prompt)
    print(s)
    return s
"""

DEFAULT_TIMEOUT_S = 3.0
MAX_OUTPUT_BYTES = 1_000_000

def _wait(self, process, stdout_path, stderr_path):
    """Attende la fine del programma; lo interrompe se supera il tempo o l'output massimo."""
    deadline = time.monotonic() + self.timeout_s
    while process.poll() is None:
        output_size = stdout_path.stat().st_size + stderr_path.stat().st_size
        if output_size > self.max_output_bytes:
            _stop(process)
            return False, True
        if time.monotonic() > deadline:
            _stop(process)
            return True, False
        time.sleep(_POLL_INTERVAL_S)
    return False, False`,
        },
      },
      {
        titolo: "Un backend che solo l'app può usare",
        testo: [
          "Il backend esegue codice Python, quindi non deve rispondere a chiunque. Ascolta solo su 127.0.0.1, su una porta scelta all'avvio, e ogni richiesta alle API deve portare il codice segreto che Electron genera e passa sia al backend sia alla pagina. Una pagina web aperta nel browser non lo conosce e riceve un 401.",
          "Nell'app installata la pagina ha anche una Content Security Policy: un eventuale script dentro il testo di un esercizio importato non viene eseguito.",
        ],
        codice: {
          file: "backend/src/tesi/api/app.py · frontend/electron/main.cjs",
          righe: `@app.middleware("http")
async def require_token(request: Request, call_next):
    # Le richieste preliminari CORS (OPTIONS) non portano intestazioni personalizzate
    if request.url.path.startswith("/api") and request.method != "OPTIONS":
        sent = request.headers.get(TOKEN_HEADER, "")
        if not secrets.compare_digest(sent, token):
            return JSONResponse({"detail": "Richiesta non autorizzata"}, status_code=401)
    return await call_next(request)

// Electron: una porta libera a ogni avvio, poi il backend e l'attesa di /health
function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}`,
        },
      },
      {
        titolo: "Dominio al centro, dettagli ai bordi",
        testo: [
          "Il backend segue l'architettura esagonale. Il dominio (esercizi e tracce) non importa niente di FastAPI, SQLite o subprocess; l'applicazione usa solo le porte, cioè le interfacce per eseguire codice e per l'archivio; gli adattatori sono le implementazioni concrete.",
          "Così i test del dominio non hanno bisogno di un database o di un processo Python, e cambiare il modo di eseguire il codice tocca un solo file. In tutto più di 200 test automatici, tra pytest sul backend e Vitest sull'interfaccia, girano anche su GitHub Actions prima di ogni installer.",
        ],
        codice: {
          file: "backend/src/tesi/",
          righe: `tesi/
├── domain/          # esercizi e tracce: nessuna dipendenza esterna
│   ├── question.py
│   └── track.py
├── ports/           # interfacce di cui l'applicazione ha bisogno
│   ├── code_runner.py
│   └── track_archive.py
├── application/     # casi d'uso
│   ├── verification.py
│   ├── student_code.py
│   └── archive.py
├── adapters/        # implementazioni concrete
│   ├── local_runner.py
│   ├── moodle_xml.py
│   └── sqlite_archive.py
└── api/             # FastAPI: rotte, codice segreto, CORS`,
        },
      },
      {
        titolo: "Prossimo passo: l'assistente AI",
        testo: [
          "La seconda parte della tesi è un assistente basato su RAG: recupera i passaggi giusti dal materiale del corso e li usa per proporre tracce e test case coerenti con quello che è stato spiegato a lezione. È in sviluppo: la prima parte doveva prima funzionare da sola, con soluzioni verificate e un export affidabile.",
        ],
      },
    ],
    numeri: [
      { v: "200+", k: "test automatici" },
      { v: "3", k: "sistemi operativi" },
      { v: "3 s", k: "limite per esecuzione" },
      { v: "1.1.2", k: "versione attuale" },
    ],
  },
  {
    slug: "goldenstay",
    sommario:
      "Una web app di prenotazione per un resort sul mare di Tropea, fatta in coppia per il corso di Web Application e messa online. L'ospite sceglie le date, vede solo le camere libere con il totale già calcolato, prenota e scarica la ricevuta; l'amministratore crea camere e gestisce le prenotazioni.",
    ruolo: "Progetto in coppia, corso di Web Application",
    architettura: {
      didascalia:
        "Frontend Angular su Vercel, API Spring Boot in un container Docker su Render, database PostgreSQL gestito. Le variabili d'ambiente separano lo sviluppo dalla produzione: indirizzi del database e origini CORS non sono scritti nel codice.",
      livelli: [
        { nome: "Frontend", blocchi: [{ nome: "Angular", nota: "standalone · signals · guard · Vercel" }] },
        { nome: "Backend", blocchi: [{ nome: "Spring Boot", nota: "REST · JPA · Docker su Render" }] },
        { nome: "Dati", blocchi: [{ nome: "PostgreSQL", nota: "Render" }] },
      ],
    },
    capitoli: [
      {
        titolo: "Il prezzo come strategia",
        testo: [
          "Le tariffe cambiano con il periodo: agosto e i weekend costano il 20% in più, oltre le sette notti c'è uno sconto del 15%. Ogni tariffa è una classe che implementa la stessa interfaccia, e un solo punto decide quale applicare, in ordine di priorità.",
          "Aggiungere una tariffa vuol dire scrivere una classe nuova, senza toccare le altre né il codice che le usa. Lo stesso preventivo dà anche il prezzo a listino, per mostrare il risparmio o la maggiorazione.",
        ],
        codice: {
          file: "GoldenStay-Angular/src/app/core/…/booking-calculator.ts",
          righe: `export interface PricingStrategy {
  calculate(pricePerNight: number, nights: number): number;
  getName(): string;
}

/** Oltre le sette notti si applica uno sconto del 15% sull'intero soggiorno. */
export class LongStayDiscountStrategy implements PricingStrategy {
  calculate(pricePerNight: number, nights: number): number {
    const total = pricePerNight * nights;
    return nights > 7 ? total * 0.85 : total;
  }
  getName(): string {
    return 'Sconto Soggiorno Lungo (-15%)';
  }
}

/** Priorità: agosto, poi lo sconto lungo soggiorno, poi il weekend, infine il listino. */
getBestStrategy(checkIn: string, checkOut: string): PricingStrategy {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (start.getMonth() === 7 || end.getMonth() === 7) return new AugustPricingStrategy();
  if (countNights(checkIn, checkOut) > 7) return new LongStayDiscountStrategy();
  if (this.hasWeekend(start, end)) return new WeekendStrategy();
  return new StandardPricingStrategy();
}`,
        },
      },
      {
        titolo: "Camere da una factory",
        testo: [
          "Standard, Deluxe e Suite si creano con il pattern Factory. Ogni factory è un componente Spring con il nome del tipo, e Spring le raccoglie da solo in una mappa: il controller sceglie quella giusta dal tipo richiesto, senza una catena di if.",
        ],
        codice: {
          file: "GoldenStayBackEnd/…/controller/RoomController.java",
          righe: `@Component("SUITE")
public class SuiteRoomFactory implements RoomFactory {
    @Override
    public Room createRoom() {
        return new SuiteRoom();
    }
}

// Spring inietta tutte le factory, indicizzate per nome del componente
@Autowired
private Map<String, RoomFactory> factories;

public ResponseEntity<?> createRoomFactory(@PathVariable String type) {
    RoomFactory factory = factories.get(type.toUpperCase());
    if (factory == null) {
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Tipo di camera non valido: " + type));
    }
    // …
}`,
        },
      },
      {
        titolo: "Libera o occupata",
        testo: [
          "Una camera è occupata se ha una prenotazione attiva che si sovrappone alle date richieste. Due intervalli si sovrappongono quando ognuno comincia prima che l'altro finisca; il giorno di partenza non conta, così chi parte e chi arriva lo stesso giorno non si escludono.",
        ],
        codice: {
          file: "GoldenStayBackEnd/…/repository/BookingRepository.java",
          righe: `/**
 * Vero se la camera ha già una prenotazione attiva che si sovrappone
 * all'intervallo richiesto. Il giorno di partenza non conta come occupato.
 */
@Query("""
        SELECT COUNT(b) > 0 FROM Booking b
        WHERE b.room.id = :roomId
          AND b.status <> 'CANCELLATA'
          AND b.checkIn < :checkOut
          AND b.checkOut > :checkIn
        """)
boolean isRoomBusy(@Param("roomId") Long roomId,
                   @Param("checkIn") LocalDate checkIn,
                   @Param("checkOut") LocalDate checkOut);`,
        },
      },
    ],
    numeri: [
      { v: "4", k: "tariffe" },
      { v: "3", k: "tipi di camera" },
      { v: "PDF", k: "ricevuta generata" },
      { v: "Online", k: "Vercel e Render" },
    ],
  },
]

export function casoStudio(slug: string) {
  return casiStudio.find((c) => c.slug === slug)
}
