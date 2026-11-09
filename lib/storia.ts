// -----------------------------------------------------------------------------
// LA STORIA — i testi della casa raccontata con lo scorrimento.
// Quattro capitoli seguono il titolo ("dal database all'interfaccia, verso
// l'AI"): ognuno accende uno strato del disegno. Solo fatti già nel portfolio.
// -----------------------------------------------------------------------------

export type Testo = { it: string; en: string }

export type Strato = "database" | "server" | "interfaccia" | "ai"

/** Le quattro fasce del disegno degli strati, in percentuale dell'altezza dall'alto. */
export const fasce: { id: Strato; nome: Testo; da: number; a: number }[] = [
  { id: "ai", nome: { it: "AI", en: "AI" }, da: 0, a: 25.55 },
  { id: "interfaccia", nome: { it: "Interfaccia", en: "Interface" }, da: 25.55, a: 50.44 },
  { id: "server", nome: { it: "Server", en: "Server" }, da: 50.44, a: 73.84 },
  { id: "database", nome: { it: "Database", en: "Database" }, da: 73.84, a: 100 },
]

/** Ordine in cui gli strati si costruiscono, dal basso. */
export const ordineStrati: Strato[] = ["database", "server", "interfaccia", "ai"]

export const prologo: Testo = {
  it: "Sono Matteo, vengo da Cosenza e studio Informatica all'Università della Calabria. Al liceo ho incontrato la programmazione; da allora costruisco app intere, dal database fino a quello che si vede sullo schermo. E adesso sto imparando a farle ragionare. Questa è la storia, uno strato alla volta.",
  en: "I'm Matteo, I'm from Cosenza and I study Computer Science at the University of Calabria. I met programming in high school; since then I've been building whole apps, from the database to what you see on screen. Now I'm learning to make them reason. This is the story, one layer at a time.",
}

export type Capitolo = {
  id: string
  /** Lo strato che il capitolo accende; null per l'intermezzo, che li mostra tutti. */
  strato: Strato | null
  titolo: Testo
  seconda: Testo
  testo: { it: string[]; en: string[] }
  /** Progetti citati nel capitolo, con il loro link. */
  progetti?: string[]
  /** Schermate da mostrare nel capitolo (slug dei progetti). */
  schermate?: string[]
}

export const capitoli: Capitolo[] = [
  {
    id: "fondamenta",
    strato: "database",
    titolo: { it: "Le fondamenta.", en: "The foundations." },
    seconda: { it: "Dal liceo all'università.", en: "From high school to university." },
    testo: {
      it: [
        "Al Liceo Scientifico Scorza, indirizzo Scienze Applicate, la programmazione è diventata una materia vera. Mi sono diplomato nel 2023 con 97/100.",
        "Poi Informatica all'Università della Calabria: C e C++, Java, le basi di dati. È lo strato che non si vede e che regge tutto il resto.",
      ],
      en: [
        "At the Scorza scientific high school, applied sciences track, programming became a real subject. I graduated in 2023 with 97/100.",
        "Then Computer Science at the University of Calabria: C and C++, Java, databases. It's the layer you don't see, and it holds up everything else.",
      ],
    },
  },
  {
    id: "motore",
    strato: "server",
    titolo: { it: "Il motore.", en: "The engine." },
    seconda: { it: "Servizi che non si vedono, ma devono reggere.", en: "Services you don't see, that have to hold." },
    testo: {
      it: [
        "Tripify è il progetto che racchiude la triennale: in un gruppo di quattro ho costruito catalogo e itinerari, due dei sei microservizi Spring Boot, ognuno con il suo database, fino alle schermate dell'app Android.",
        "Il problema più bello: due persone che provano a prenotare l'ultimo posto nello stesso istante. Posti e camere restano bloccati per 15 minuti mentre si paga, e se il pagamento fallisce si liberano da soli.",
        "In GoldenStay le tariffe sono regole che si compongono, con il pattern Strategy; nella tesi il backend in FastAPI è esagonale.",
      ],
      en: [
        "Tripify is the project that sums up my bachelor's: in a team of four I built the catalogue and itineraries, two of the six Spring Boot microservices, each with its own database, all the way to the Android screens.",
        "The best problem: two people trying to book the last seat at the same instant. Seats and rooms stay locked for 15 minutes while you pay, and they free themselves if the payment fails.",
        "In GoldenStay prices are rules that compose, with the Strategy pattern; in my thesis the FastAPI backend is hexagonal.",
      ],
    },
    progetti: ["tripify", "goldenstay"],
  },
  {
    id: "interfaccia",
    strato: "interfaccia",
    titolo: { it: "Quello che si vede.", en: "What you see." },
    seconda: { it: "Web, Android, desktop.", en: "Web, Android, desktop." },
    testo: {
      it: [
        "Lo stesso catalogo di Tripify diventa un'app Android in Kotlin e Jetpack Compose. Le prenotazioni di GoldenStay e i wallet di MoneyMind girano su Angular; il sito di Muscle & Fitness e l'editor della tesi su React; WAVE.LY è un lettore musicale in JavaFX.",
        "Cambia la piattaforma, resta il lavoro: far capire a chi usa l'app che cosa sta succedendo.",
      ],
      en: [
        "The same Tripify catalogue becomes an Android app in Kotlin and Jetpack Compose. GoldenStay's bookings and MoneyMind's wallets run on Angular; the Muscle & Fitness site and my thesis editor on React; WAVE.LY is a music player in JavaFX.",
        "The platform changes, the job stays: making clear to whoever uses the app what is going on.",
      ],
    },
    schermate: ["tripify", "goldenstay", "wavely"],
  },
  {
    id: "ai",
    strato: "ai",
    titolo: { it: "Verso l'AI.", en: "Heading into AI." },
    seconda: { it: "Dove sto andando.", en: "Where I'm going." },
    testo: {
      it: [
        "La tesi porta l'intelligenza artificiale dentro uno strumento per la didattica: l'editor con cui il docente prepara gli esami di programmazione per Moodle genera la soluzione dal testo, la rivede cercando errori e casi limite, propone correzioni ed esercizi simili. Ogni proposta passa dai test, e niente cambia senza conferma.",
        "ApKit4D apre la magistrale in Artificial Intelligence and Computer Science: in otto, per il Dipartimento di Fisica, un'app che mostra in 3D alghe al microscopio e le segue nel tempo. Mia la ricerca sulla vista 3D e la sua velocità: con lo zoom, uno scatto della rotella è passato da circa 300 a meno di 50 millisecondi.",
      ],
      en: [
        "My thesis brings AI into a teaching tool: the editor the lecturer uses to prepare programming exams for Moodle generates the solution from the text, reviews it for bugs and edge cases, and proposes fixes and similar exercises. Every proposal goes through the tests, and nothing changes without confirmation.",
        "ApKit4D opens my master's in Artificial Intelligence and Computer Science: eight of us, for the Physics Department, building an app that shows algae under the microscope in 3D and follows them over time. My part is the 3D view and its speed: with zoom, a wheel step went from about 300 to under 50 milliseconds.",
      ],
    },
    progetti: ["tesi", "apkit4d"],
  },
  {
    id: "parallelo",
    strato: null,
    titolo: { it: "In parallelo.", en: "Alongside." },
    seconda: { it: "Un anno di servizio civile.", en: "A year of civil service." },
    testo: {
      it: [
        "Da settembre 2025 a settembre 2026 ho fatto il Servizio Civile Universale come operatore volontario, insieme agli studi.",
      ],
      en: [
        "From September 2025 to September 2026 I served in the Italian Universal Civil Service as a volunteer, alongside my studies.",
      ],
    },
  },
]
