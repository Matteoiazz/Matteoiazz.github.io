// -----------------------------------------------------------------------------
// CONTENUTI DEL PORTFOLIO — modifica qui, non nei componenti.
// I campi segnati con "TODO" sono placeholder: sostituiscili con i tuoi dati reali.
// -----------------------------------------------------------------------------

export const profile = {
  name: "Matteo Iazzolino",
  role: "Junior Full-Stack Developer",
  location: "Cosenza, Italia",
  // Foto della sezione Profilo: mettila in public/ e scrivi qui il percorso,
  // per esempio "/matteo.jpg" (quadrata, almeno 320px). Vuota: si vedono le iniziali.
  photo: "",
  // Segue il ruolo nella prima schermata: tienila corta.
  tagline: "Dal modello dati all'interfaccia, curo tutto il percorso.",
  intro:
    "Studente al terzo anno di Informatica all'Università della Calabria, con laurea prevista a dicembre 2026 e una tesi che porta l'intelligenza artificiale dentro uno strumento per la didattica. Da ottobre 2026 seguo anche la magistrale in Artificial Intelligence and Computer Science, sempre all'UniCal, dove lavoro in un gruppo di otto a un progetto per il Dipartimento di Fisica. Nel frattempo ho costruito progetti universitari e personali per web, mobile e desktop: sviluppo full-stack, applicazioni Android e architetture a microservizi.",
}

export type Shot = {
  src: string
  alt: string
  /** Didascalia sotto la schermata, nella scheda del progetto. */
  caption?: string
  /** "browser" per le web app, "phone" per le app mobile, "window" per le app desktop. */
  frame: "browser" | "phone" | "window"
}

export type Platform = "web" | "mobile" | "desktop"

export type Project = {
  slug: string
  /** Per i filtri della sezione Progetti. */
  platform: Platform
  /** Ha una pagina /progetti/<slug>/: il contenuto è in lib/casi-studio.ts. */
  casoStudio?: boolean
  title: string
  year: string
  /** Tipo di progetto, mostrato sulla copertina della card. */
  kind: string
  team: string
  /** Chi l'ha fatto, in breve: per l'indice dei progetti. */
  squadra: string
  /** Una o due righe: è il testo della card nella home. */
  tagline: string
  /** Descrizione completa, nella scheda che si apre cliccando la card. */
  description: string
  highlights: string[]
  stack: string[]
  /** Link al codice su GitHub. Se manca, la scheda mostra "Codice privato". */
  repo?: string
  /** Link al sito online (es. Vercel). Se manca, il pulsante Visit non compare. */
  demo?: string
  cover: Shot
  /** Cattura a tutta pagina: nella card scorre al passaggio del mouse. */
  coverTall?: string
  /** Schermate successive alla copertina, nella scheda del progetto. */
  gallery: Shot[]
}

// Progetti reali: descrizioni ricavate dal codice dei singoli repository.
// L'ordine conta: Tripify racchiude la triennale, la tesi la chiude, ApKit4D apre la magistrale.
export const projects: Project[] = [
  {
    slug: "tripify",
    platform: "mobile",
    casoStudio: true,
    title: "Tripify",
    year: "2026",
    kind: "App Android",
    // Progetto di gruppo in quattro: il contributo personale sono catalogo e
    // itinerari, sia i due microservizi sia i moduli dell'app Android
    // (DOCUMENTAZIONE-TECNICA-CATALOG-ITINERARY.md nel repository).
    team: "Progetto di gruppo in quattro · Enterprise Architecture, UniCal · miei catalogo e itinerari, backend e app",
    squadra: "Team di 4",
    tagline:
      "Piattaforma di viaggi a microservizi per voli, hotel e attività. Ho costruito catalogo e itinerari, dai servizi Spring Boot all'app Android.",
    description:
      "Piattaforma di prenotazione viaggi fatta di sei microservizi Spring Boot, ognuno con il proprio database, e di un'app Android nativa. Ho sviluppato il catalogo e gli itinerari dall'inizio alla fine. Il catalogo raccoglie voli, hotel e attività, li rende cercabili con filtri combinabili e tiene la disponibilità reale di posti e camere, in modo che due persone non possano prenotare l'ultimo posto nello stesso momento. Gli itinerari sono liste di viaggio ordinate, private, condivise o pubbliche: si compongono a mano con un controllo di coerenza su città e date, oppure si fanno generare da città, durata, numero di viaggiatori e budget, e si esportano nel calendario.",
    highlights: [
      "Ricerca con una dozzina di filtri combinabili (città, prezzo, voto, date, posti, voli diretti) costruita a runtime con il pattern Specification di Spring Data, su un modello con ereditarietà JPA per voli, hotel e attività",
      "Niente overbooking tra servizi diversi: posti e camere bloccati per 15 minuti mentre l'utente paga, poi confermati o rilasciati, con compensazione in stile saga quando il checkout fallisce",
      "Itinerari con controllo di coerenza geografica e temporale, generazione automatica che sceglie il volo più economico con posti per tutta la comitiva, esportazione in calendario .ics con eventi che si aggiornano invece di duplicarsi",
      "Sicurezza: ruoli e proprietà degli annunci verificati dal JWT di Keycloak, immagini controllate dai byte iniziali e non dall'estensione, 404 invece di 403 sulle liste private per non rivelarne l'esistenza, lock ottimistico sulle liste condivise",
      "App Android in Kotlin e Jetpack Compose con architettura MVVM, StateFlow e Retrofit: home con raccomandazioni, ricerca con autocompletamento delle città, scheda con galleria e mappa, timeline dell'itinerario divisa per giorno reale",
      "Tutta la piattaforma gira in Docker: API gateway con rate limiting, Keycloak con accesso Google, RabbitMQ per le notifiche, un database PostgreSQL per servizio",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Spring Boot", "Java", "PostgreSQL", "Keycloak", "RabbitMQ", "Docker"],
    repo: "https://github.com/Matteoiazz/Enterprise-Project",
    cover: {
      src: "/projects/tripify/cover.webp",
      alt: "Home dell'app Android Tripify con ricerca di voli, hotel ed esperienze e i più apprezzati",
      caption: "Home con ricerca e i più apprezzati",
      frame: "phone",
    },
    gallery: [
      {
        src: "/projects/tripify/dettaglio.webp",
        alt: "Scheda dell'hotel Iron & Spa Resort con galleria, valutazione, date del soggiorno e tipologie di camera",
        caption: "Scheda di un hotel, con tipologie di camera e prezzi",
        frame: "phone",
      },
      {
        src: "/projects/tripify/ricerca.webp",
        alt: "Risultati della ricerca Milano: voli con tratta, prezzo, data e posti disponibili",
        caption: "Risultati di ricerca",
        frame: "phone",
      },
      {
        src: "/projects/tripify/itinerari.webp",
        alt: "Itinerari pubblici più apprezzati, come Fuga a Venezia e Puglia Autentica",
        caption: "Itinerari pubblici condivisi dagli utenti",
        frame: "phone",
      },
    ],
  },
  {
    slug: "tesi",
    platform: "desktop",
    casoStudio: true,
    // Il nome è quello dell'app installata (productName in frontend/package.json).
    title: "Editor tracce CodeRunner",
    year: "2026",
    kind: "App desktop · Tesi",
    team: "Tesi di laurea triennale in Informatica · UniCal · progetto individuale",
    squadra: "Individuale",
    tagline:
      "App desktop con cui il docente prepara gli esami di programmazione per Moodle: soluzioni verificate sui test e un'AI che genera, rivede e corregge, sempre con la sua conferma.",
    description:
      "Applicazione desktop per il docente di Fondamenti di Programmazione dell'UniCal, che prepara esami e pretest in Python per Moodle con le domande CodeRunner. Per ogni esercizio si scrivono testo, soluzione nascosta, codice per gli studenti e test; l'app calcola gli output eseguendo la soluzione, verifica ogni test ed esporta un XML che Moodle importa al primo colpo. La seconda parte della tesi porta l'intelligenza artificiale dentro lo strumento: con una chiave di OpenRouter genera la soluzione dal testo, la rivede cercando errori, casi limite e test mancanti, propone correzioni ed esercizi simili nello stile del docente. Ogni proposta viene controllata sui test, prima di ogni richiesta si vede cosa parte verso il modello e niente cambia senza conferma.",
    highlights: [
      "Import ed export nello stesso formato XML degli export di Moodle, con CDATA e immagini incorporate nel testo, verificato su esercizi d'esame reali del docente",
      "Output attesi calcolati eseguendo la soluzione come fa CodeRunner, con tempo limite di 3 secondi e output massimo di 1 MB: l'esportazione resta bloccata finché ogni test non è superato",
      "Funzioni AI dietro una porta LanguageModel del backend esagonale, con l'adattatore per OpenRouter: soluzione generata dal testo e controllata sui test fino a tre tentativi, revisione per tipo di problema con i test suggeriti già eseguiti, correzioni mostrate come differenze, esercizi simili nello stile del docente",
      "Niente cambia senza conferma: la richiesta al modello si vede prima dell'invio, con le indicazioni del docente; la chiave resta nel portachiavi del sistema o protetta da una master password e la aggiunge il processo principale di Electron a ogni richiesta",
      "Archivio SQLite a schede con salvataggio automatico: tracce per anno, esercizi da riusare, cestino, filtri per tipo e data, importazione di più XML, backup e ripristino",
      "Installer per Windows, macOS e Linux con Python incluso, creati da GitHub Actions dopo più di 500 test (pytest e Vitest), e aggiornamento automatico dalle release di GitHub",
    ],
    stack: ["Electron", "React", "TypeScript", "Python", "FastAPI", "SQLite", "OpenRouter", "GitHub Actions"],
    repo: "https://github.com/Matteoiazz/editor-tracce-coderunner",
    // Schermate della versione 1.4.0 con gli XML d'esame pubblicati nel repository
    // (backend/tests/fixtures/moodle), importati in un archivio di prova.
    cover: {
      src: "/projects/tesi/cover.webp",
      alt: "Esame del 3 luglio 2026 aperto nell'editor: tre esercizi pronti, 45 test su 45 superati e il testo dell'esercizio 3",
      caption: "Un esame reale importato da Moodle: 45 test su 45 superati",
      frame: "window",
    },
    gallery: [
      {
        src: "/projects/tesi/ai.webp",
        alt: "La soluzione dell'esercizio 3 nell'editor con il menu AI aperto: Genera la soluzione e Rivedi la soluzione",
        caption: "Le funzioni AI sulla soluzione: generarla dal testo o rivederla",
        frame: "window",
      },
      {
        src: "/projects/tesi/richiesta.webp",
        alt: "Finestra Richiesta all'AI per la revisione della soluzione, con lo spazio per le indicazioni del docente, prima dell'invio",
        caption: "Prima di ogni richiesta si vede cosa parte verso il modello",
        frame: "window",
      },
      {
        src: "/projects/tesi/archivio.webp",
        alt: "Archivio a schede con le tracce raggruppate per anno, i filtri per tipo, anno e data e la sezione di backup",
        caption: "Archivio delle tracce, con filtri e backup",
        frame: "window",
      },
      {
        src: "/projects/tesi/impostazioni.webp",
        alt: "Impostazioni con la chiave di OpenRouter mascherata, il modello scelto e l'opzione per vedere la richiesta prima dell'invio",
        caption: "Impostazioni: la chiave di OpenRouter e il modello",
        frame: "window",
      },
    ],
  },
  {
    // Progetto della magistrale (repository del gruppo physics-3d-group-7).
    slug: "apkit4d",
    platform: "desktop",
    casoStudio: true,
    title: "ApKit4D",
    year: "2026",
    kind: "App desktop · R&D",
    team: "Progetto di gruppo in otto · Research and Development Methodologies, magistrale UniCal · per il Dipartimento di Fisica · mie la ricerca sulla GUI e la vista 3D veloce",
    squadra: "Team di 8",
    tagline:
      "App desktop in Python per un laboratorio di fisica: apre le acquisizioni 4D di un microscopio Zeiss, le mostra in 3D nel tempo e segue le alghe. Mie la ricerca sulla vista 3D e la sua velocità.",
    description:
      "Progetto della magistrale per una ricercatrice del Dipartimento di Fisica che studia alghe acquisite con un microscopio light-field Zeiss: file .czi con un volume 3D che cambia nel tempo. Il gruppo lavora in Scrum, con la ricercatrice come Product Owner, e costruisce un'app in Python con PySide6 e PyVista che apre l'acquisizione, la mostra in 3D frame per frame e la porta lungo una pipeline: ritaglio della regione di interesse, preprocessing, rilevamento delle alghe, tracce nel tempo ed export. La mia parte: la ricerca sulla GUI, dal prototipo di partenza alla base della finestra fino alle demo napari e PyVista misurate a confronto; poi la vista 3D che con lo zoom diventava lenta, il pannello di sinistra e i controlli dell'aspetto della vista.",
    highlights: [
      "Lettura dei .czi con czifile al posto della libreria del prototipo: stessi dati, da 3 a 6 volte più veloce e compatibile con Python 3.14",
      "Base della GUI in PySide6: finestra, menu File, segnale file_opened e funzione run(path) usata anche dalla riga di comando",
      "Due demo con le stesse funzioni (volume 3D, tempo, contrasto, blob cliccabili, tracce, regione di interesse), una in napari e una in PyVista, misurate sugli stessi dati reali; una prima serie di misure era sbagliata, l'abbiamo rifatta e il report lo dice. Il gruppo ha scelto PyVista",
      "Vista 3D veloce con lo zoom: un solo disegno per ogni cambiamento, niente ridisegni da ferma, mezza risoluzione solo mentre la vista si muove. Scatto della rotella da circa 300 a 34–45 ms, trascinamento da 165–182 a 57–76 ms, cambio frame da 206 a 106 ms",
      "La qualità ridotta di VTK trasformava le alghe in rombi durante il movimento: la mezza risoluzione è altrettanto veloce e da ferma l'immagine resta identica, pixel per pixel",
      "Scrum con backlog su Jira, pull request con review (tredici commenti sulla vista 3D, risolti uno per uno con test nuovi) e CI su GitHub con test, linting e controllo dei tipi",
    ],
    stack: ["Python", "PySide6", "PyVista", "VTK", "napari", "pytest", "Jira", "GitHub Actions"],
    cover: {
      src: "/projects/apkit4d/cover.webp",
      alt: "ApKit4D con un'acquisizione del microscopio aperta: il volume 3D con le alghe, la barra del tempo sui 600 frame e i cinque passi della pipeline a destra",
      caption: "Un'acquisizione del laboratorio aperta in ApKit4D, frame 1 di 600",
      frame: "window",
    },
    gallery: [
      {
        src: "/projects/apkit4d/scuro.webp",
        alt: "La stessa vista di ApKit4D con il tema scuro",
        caption: "La stessa vista con il tema scuro",
        frame: "window",
      },
    ],
  },
  {
    slug: "goldenstay",
    platform: "web",
    casoStudio: true,
    title: "GoldenStay",
    year: "2026",
    kind: "Web app",
    team: "Progetto in coppia · corso di Web Application, UniCal",
    squadra: "In coppia",
    tagline:
      "Prenotazioni per un resort sul mare di Tropea: ricerca per date, camere e suite, pagamento e back office.",
    description:
      "Web app di prenotazione per una struttura affacciata sul mare a Tropea. L'ospite sceglie date e numero di ospiti, confronta camere e suite con il totale del soggiorno già calcolato, apre la scheda della camera e prenota dalla finestra di pagamento, ricevendo la ricevuta in PDF. Un'area riservata permette all'amministratore di creare camere e gestire le prenotazioni.",
    highlights: [
      "Tariffe con il pattern Strategy: listino, alta stagione di agosto e weekend (+20%), sconto oltre le sette notti (−15%), applicate in ordine di priorità",
      "Pattern Factory nel backend per creare camere Standard, Deluxe e Suite",
      "API REST in Spring Boot per camere, prenotazioni e utenti, con persistenza JPA su PostgreSQL",
      "Frontend Angular organizzato per funzionalità, con guard sulle rotte dell'area riservata e ricevuta generata in PDF con jsPDF",
    ],
    stack: ["Angular", "TypeScript", "Spring Boot", "Java", "PostgreSQL"],
    repo: "https://github.com/Matteoiazz/GoldenStay",
    demo: "https://goldenstay.vercel.app",
    cover: {
      src: "/projects/goldenstay/cover.webp",
      alt: "Home di GoldenStay: la struttura sul mare al tramonto e il modulo di ricerca per date e ospiti",
      caption: "Home con ricerca per date e numero di ospiti",
      frame: "browser",
    },
    coverTall: "/projects/goldenstay/cover-tall.webp",
    gallery: [
      {
        src: "/projects/goldenstay/demo.gif",
        alt: "Registrazione della prenotazione completa su GoldenStay: ricerca camere, scheda, pagamento e ricevuta in PDF",
        caption: "Demo: ricerca, prenotazione, pagamento e ricevuta",
        frame: "browser",
      },
      {
        src: "/projects/goldenstay/camera.webp",
        alt: "Scheda della Suite Vista Mare con foto, capienza, letto e prezzo a notte",
        caption: "Scheda della camera",
        frame: "browser",
      },
      {
        src: "/projects/goldenstay/prezzi.webp",
        alt: "Sezione Come si compone il prezzo: listino, maggiorazioni per weekend e alta stagione, sconto per lungo soggiorno",
        caption: "Le regole di prezzo, spiegate all'ospite",
        frame: "browser",
      },
      {
        src: "/projects/goldenstay/esperienza.webp",
        alt: "Sezione L'esperienza con le foto di una camera e della piscina sul mare",
        caption: "Presentazione della struttura",
        frame: "browser",
      },
      {
        src: "/projects/goldenstay/mobile.webp",
        alt: "Home di GoldenStay su telefono con il modulo di ricerca",
        caption: "Versione mobile",
        frame: "phone",
      },
    ],
  },
  {
    slug: "moneymind",
    platform: "web",
    title: "MoneyMind",
    year: "2026",
    kind: "Web app",
    team: "Progetto di gruppo · 4 persone, mio contributo full-stack",
    squadra: "Team di 4",
    tagline: "Finanze personali e investimenti: wallet condivisi, budget, movimenti e mercati.",
    description:
      "Piattaforma web per gestire le finanze personali e seguire gli investimenti. Entrate e uscite sono organizzate in wallet, anche condivisi con altre persone tramite invito o codice, con budget e trasferimenti tra wallet; la dashboard riassume saldo e andamento con i grafici. Nella sezione mercati si consultano azioni, ETF e crypto, il grafico di ogni titolo e le notizie finanziarie, e si simulano operazioni sul proprio portafoglio.",
    highlights: [
      "Wallet condivisi con inviti, codice di accesso, budget, passaggio di proprietà e trasferimenti tra wallet",
      "Quotazioni e notizie da Finnhub, con le notizie in cache aggiornate da uno scheduler per non esaurire la quota dell'API",
      "Backend Spring Boot con Spring Security e JPA/Hibernate su PostgreSQL, pattern Proxy per utenti e portafogli",
      "Frontend Angular ricostruito su un design system condiviso, con grafici Chart.js",
    ],
    stack: ["Angular", "TypeScript", "Chart.js", "Spring Boot", "Java", "PostgreSQL"],
    repo: "https://github.com/Matteoiazz/MoneyMind-WebApplication",
    cover: {
      src: "/projects/moneymind/cover.webp",
      alt: "Dashboard di MoneyMind con saldo totale, entrate, uscite e grafico dell'andamento annuale",
      caption: "Dashboard con saldo e andamento annuale",
      frame: "browser",
    },
    coverTall: "/projects/moneymind/cover-tall.webp",
    gallery: [
      {
        src: "/projects/moneymind/portafoglio.webp",
        alt: "Portafoglio investimenti con valore totale, torta dell'allocazione e confronto tra capitale investito e valore attuale",
        caption: "Portafoglio investimenti",
        frame: "browser",
      },
      {
        src: "/projects/moneymind/wallet.webp",
        alt: "Wallet condiviso Casa Milano con codice di invito, saldo, entrate e uscite del gruppo",
        caption: "Wallet condiviso, con codice di invito",
        frame: "browser",
      },
      {
        src: "/projects/moneymind/mercati.webp",
        alt: "Sezione Mercati con notizie in evidenza e quotazioni di azioni ed ETF",
        caption: "Mercati: azioni, ETF e crypto",
        frame: "browser",
      },
      {
        src: "/projects/moneymind/grafico.webp",
        alt: "Grafico a candele del titolo Apple con statistiche chiave",
        caption: "Grafico e statistiche di un titolo",
        frame: "browser",
      },
    ],
  },
  {
    slug: "muscle-fitness",
    platform: "web",
    title: "Muscle & Fitness",
    year: "2026",
    kind: "Sito e area soci",
    team: "Progetto personale",
    squadra: "Personale",
    tagline: "Sito per una palestra smart con area soci: abbonamenti, badge QR e certificati medici.",
    description:
      "Sito per la palestra A.S.D. Muscle & Fitness di Spezzano Piccolo, con un'area riservata ai soci e un pannello di amministrazione. Dalla home si scoprono discipline, attrezzature e abbonamenti e si acquista il piano dal checkout, con pagamento simulato. Il socio ritrova nella dashboard il badge QR per entrare, lo stato dell'abbonamento, il certificato medico e lo storico delle attività: l'ingresso è consentito solo con un accesso valido e un certificato approvato. L'amministratore gestisce gli iscritti, approva o rifiuta i certificati e consulta le statistiche.",
    highlights: [
      "API Express con autenticazione JWT, password cifrate con bcrypt, rate limiting sulle rotte sensibili e Helmet; sul deploy Vercel header di sicurezza come CSP e HSTS",
      "Validazione degli input con Zod e upload dei certificati che verifica il tipo reale del file, non solo l'estensione",
      "Dati con Prisma su SQLite: utenti, abbonamenti con rinnovo e disdetta, certificati e storico delle attività",
      "Frontend React con Vite, Tailwind CSS e Framer Motion, con rotte protette per soci e amministratori",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "Prisma", "SQLite"],
    repo: "https://github.com/Matteoiazz/Gym-WebSite",
    demo: "https://muscleefitness.vercel.app",
    cover: {
      src: "/projects/muscle-fitness/cover.webp",
      alt: "Home del sito Muscle & Fitness: il titolo Allenati quando vuoi tu sopra la foto della sala pesi",
      caption: "Home",
      frame: "browser",
    },
    coverTall: "/projects/muscle-fitness/cover-tall.webp",
    gallery: [
      {
        src: "/projects/muscle-fitness/discipline.webp",
        alt: "Griglia delle discipline con kick-boxing, nuoto, crosstraining, riabilitazione, sala pesi e cardio",
        caption: "Discipline incluse nell'abbonamento",
        frame: "browser",
      },
      {
        src: "/projects/muscle-fitness/attrezzature.webp",
        alt: "Sezione Ferro serio, non arredamento con le attrezzature Technogym, Panatta e Diamond",
        caption: "Attrezzature della sala",
        frame: "browser",
      },
      {
        src: "/projects/muscle-fitness/abbonamenti.webp",
        alt: "Sezione Un prezzo, tutta la struttura con ingresso singolo, piano mensile e annuale",
        caption: "Abbonamenti e prezzi",
        frame: "browser",
      },
      {
        src: "/projects/muscle-fitness/mobile.webp",
        alt: "Home del sito Muscle & Fitness su telefono",
        caption: "Versione mobile",
        frame: "phone",
      },
    ],
  },
  {
    slug: "wavely",
    platform: "desktop",
    title: "WAVE.LY",
    year: "2025",
    kind: "App desktop",
    team: "Progetto d'esame in tre · rifattorizzato da me nel 2026",
    squadra: "Team di 3, rifatto da me",
    tagline: "Lettore musicale desktop in JavaFX: playlist, artisti, equalizzatore e temi.",
    description:
      "Applicazione desktop per ascoltare e organizzare musica, nata come progetto d'esame in un gruppo di tre e poi rifattorizzata interamente da me. Dopo l'accesso si esplorano brani e artisti, si creano playlist e preferiti, si cerca nel catalogo e si personalizzano profilo e tema; il player gestisce la coda e riprende l'ascolto da dove era stato interrotto.",
    highlights: [
      "Player con coda di riproduzione, equalizzatore a 6 bande e ripresa dell'ultimo ascolto",
      "Architettura a livelli: repository su SQLite, servizi per sessione, player e temi, controller FXML che osservano lo stato tramite le proprietà JavaFX",
      "Password cifrate con BCrypt e termini d'uso esportati in PDF con PDFBox",
      "Cinque temi colore e componenti grafici personalizzati, come lo sfondo animato «aurora»",
    ],
    stack: ["Java", "JavaFX", "SQLite", "Maven"],
    cover: {
      src: "/projects/wavely/cover.webp",
      alt: "Home di WAVE.LY con il saluto all'utente, gli album in tendenza e il player in basso",
      caption: "Home con gli album in tendenza e il player",
      frame: "window",
    },
    coverTall: "/projects/wavely/cover-tall.webp",
    gallery: [
      {
        src: "/projects/wavely/artista.webp",
        alt: "Pagina dell'artista Sfera Ebbasta con i brani popolari e quello in corso evidenziato",
        caption: "Pagina artista con i brani popolari",
        frame: "window",
      },
      {
        src: "/projects/wavely/album.webp",
        alt: "Pagina dell'album YE di Kanye West con la tracklist",
        caption: "Album con tracklist e durata totale",
        frame: "window",
      },
      {
        src: "/projects/wavely/impostazioni.webp",
        alt: "Impostazioni con riproduzione automatica, ripresa dell'ascolto ed equalizzatore a 6 bande con preset",
        caption: "Impostazioni ed equalizzatore a 6 bande",
        frame: "window",
      },
      {
        src: "/projects/wavely/ricerca.webp",
        alt: "Ricerca nel catalogo con il risultato migliore, i brani e gli artisti",
        caption: "Ricerca nel catalogo",
        frame: "window",
      },
    ],
  },
]

// Le tecnologie che compaiono anche nello stack di un progetto mostrano dove
// sono state usate; le altre (C, C++, MySQL) vengono dai corsi universitari.
export const stack: { group: string; items: string[] }[] = [
  { group: "Linguaggi", items: ["Java", "Kotlin", "Python", "TypeScript", "C++", "C"] },
  { group: "Frontend", items: ["Angular", "React", "Tailwind CSS"] },
  { group: "Backend e database", items: ["Spring Boot", "FastAPI", "Node.js", "PostgreSQL", "SQLite", "MySQL"] },
  { group: "Mobile e desktop", items: ["Kotlin", "Jetpack Compose", "JavaFX", "Electron", "PySide6", "PyVista"] },
  { group: "Infrastruttura", items: ["Docker", "Keycloak", "RabbitMQ", "GitHub Actions"] },
]

/** Progetti che usano una tecnologia, nell'ordine della pagina. */
export function progettiCon(tecnologia: string): Project[] {
  return projects.filter((p) => p.stack.includes(tecnologia))
}

export type Experience = {
  tipo: "Formazione" | "Esperienza"
  role: string
  company: string
  period: string
  description: string
  /** Logo dell'istituzione, in public/loghi/: compare nel percorso. */
  logo?: string
}

export const experiences: Experience[] = [
  {
    tipo: "Formazione",
    role: "Laurea Magistrale in Artificial Intelligence and Computer Science",
    company: "Università della Calabria",
    period: "Da ottobre 2026",
    description:
      "Magistrale in intelligenza artificiale e informatica, in continuità con la triennale. Nel primo semestre Deep Learning e Research and Development Methodologies, con un progetto Scrum in otto per il Dipartimento di Fisica: ApKit4D, l'analisi 3D di alghe al microscopio.",
    logo: "/loghi/unical.svg",
  },
  {
    tipo: "Formazione",
    role: "Laurea Triennale in Informatica",
    company: "Università della Calabria",
    period: "In corso · prevista dic. 2026",
    description:
      "Terzo anno. Progetti universitari in ambito web, mobile e architetture enterprise, affiancati da progetti personali.",
    logo: "/loghi/unical.svg",
  },
  {
    tipo: "Esperienza",
    role: "Operatore volontario",
    company: "Servizio Civile Universale",
    period: "Set 2025 · set 2026",
    description:
      "Un anno di Servizio Civile Universale come operatore volontario, svolto in parallelo agli studi.",
    logo: "/loghi/servizio-civile.webp",
  },
  {
    tipo: "Formazione",
    role: "Diploma Scientifico — Scienze Applicate",
    company: "Liceo Scientifico \"Scorza\", Cosenza",
    period: "2023 · 97/100",
    description:
      "Percorso con indirizzo Scienze Applicate, primo contatto strutturato con la programmazione.",
    logo: "/loghi/scorza.webp",
  },
]

export const contact = {
  email: "matteo.iazzolino@gmail.com",
  github: "https://github.com/Matteoiazz",
  linkedin: "https://www.linkedin.com/in/matteoiazzolino",
  x: "#", // TODO: link al tuo profilo X (o rimuovilo da components/contact.tsx)
}
