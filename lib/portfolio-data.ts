// -----------------------------------------------------------------------------
// CONTENUTI DEL PORTFOLIO — modifica qui, non nei componenti.
// I campi segnati con "TODO" sono placeholder: sostituiscili con i tuoi dati reali.
// -----------------------------------------------------------------------------

export const profile = {
  name: "Matteo Iazzolino",
  role: "Full-Stack Engineer",
  location: "Cosenza, Italia",
  // Il titolo hero stile Proxio: prima parte accesa (bianca), seconda parte tenue (grigia).
  headlineLead: "Full-stack engineer",
  headlineMuted: "che costruisce software solido & curato",
  // Usato come seconda metà del titolo in "Chi sono": tienilo corto.
  tagline: "Dal modello dati all'interfaccia, curo tutto il percorso.",
  intro:
    "Sono uno sviluppatore full-stack con base a Cosenza. Mi muovo con naturalezza tra frontend e backend: dal disegno dell'API e del modello dati fino all'ultimo dettaglio dell'interfaccia. Attualmente sto completando la laurea in Informatica all'Università della Calabria (UniCal).",
}

export type Project = {
  title: string
  year: string
  description: string
  stack: string[]
  repo: string
  demo?: string
  /** Screenshot in /public. Se assente, la card mostra i loghi dello stack. */
  image?: string
  imageAlt?: string
  /** Cornice attorno allo screenshot: "phone" per app mobile, "browser" per web app. */
  frame?: "phone" | "browser"
}

// Progetti reali, ricavati dai repository GitHub pubblici.
export const projects: Project[] = [
  {
    title: "Tripify",
    year: "2026",
    description:
      "Piattaforma di prenotazione viaggi (voli, hotel, attività) costruita a microservizi: sei servizi Spring Boot con un database Postgres ciascuno, autenticazione Keycloak, messaggistica RabbitMQ e un API gateway con rate limiting. Include un'app Android nativa in Kotlin e Jetpack Compose. L'intero stack gira in Docker.",
    stack: ["Spring Boot", "Kotlin", "Jetpack Compose", "PostgreSQL", "Keycloak", "RabbitMQ", "Docker"],
    repo: "https://github.com/Matteoiazz/Enterprise-Project",
    image: "/projects/tripify-home.webp",
    imageAlt: "Schermata home dell'app Android Tripify, con ricerca di voli, hotel ed esperienze",
    frame: "phone",
  },
  {
    title: "MoneyMind",
    year: "2026",
    description:
      "Piattaforma web per la gestione delle finanze personali e degli investimenti. Frontend Angular con grafici interattivi, backend Spring Boot con persistenza Hibernate su PostgreSQL. Progetto di gruppo universitario.",
    stack: ["Angular", "TypeScript", "Spring Boot", "Java", "PostgreSQL", "Chart.js"],
    repo: "https://github.com/Matteoiazz/MoneyMind-WebApplication",
    image: "/projects/moneymind-market.webp",
    imageAlt:
      "Sezione Mercati di MoneyMind: panoramica con notizie finanziarie e quotazioni di azioni ed ETF",
    frame: "browser",
  },
  {
    // TODO: descrizione ricavata dallo screenshot. Da confermare: stack e anno,
    // e il link al repository (non è tra quelli pubblici del profilo).
    title: "GoldenStay",
    year: "2026",
    description:
      "Sito di prenotazione per una struttura ricettiva a Tropea: ricerca per date e numero di ospiti, presentazione delle camere e area di back office riservata alla gestione.",
    stack: [],
    repo: "#",
    image: "/projects/goldenstay-home.webp",
    imageAlt:
      "Home di GoldenStay: immagine della struttura sul mare con barra di ricerca per date e ospiti",
    frame: "browser",
  },
  {
    title: "Portfolio",
    year: "2026",
    description:
      "Questo sito: portfolio statico in Next.js con export su GitHub Pages, animazioni Motion e interfaccia costruita con v0 e rifinita a mano.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    repo: "https://github.com/Matteoiazz/Matteoiazz.github.io",
    demo: "https://matteoiazz.github.io",
  },
]

export const stack: { group: string; items: string[] }[] = [
  { group: "Linguaggi", items: ["Java", "Kotlin", "Python", "TypeScript", "JavaScript"] },
  { group: "Frontend", items: ["React", "Angular", "JavaFX"] },
  { group: "Backend", items: ["Spring", "Node.js"] },
  { group: "Database", items: ["PostgreSQL", "MySQL"] },
]

export type Experience = {
  role: string
  company: string
  period: string
  description: string
}

// TODO: timeline fittizia — riempi con le tue esperienze reali.
export const experiences: Experience[] = [
  {
    role: "Full-Stack Engineer",
    company: "Nome Azienda",
    period: "2024 — Presente",
    description: "Una riga sul ruolo, le responsabilità e i risultati principali.",
  },
  {
    role: "Backend Developer",
    company: "Nome Azienda",
    period: "2023 — 2024",
    description: "Una riga sul ruolo, le responsabilità e i risultati principali.",
  },
  {
    role: "Software Developer (Stage)",
    company: "Nome Azienda",
    period: "2022 — 2023",
    description: "Una riga sul ruolo, le responsabilità e i risultati principali.",
  },
]

export const contact = {
  // TODO: quale indirizzo vuoi mostrare pubblicamente? (non l'ho messo io di mia iniziativa)
  email: "tua@email.com",
  github: "https://github.com/Matteoiazz",
  linkedin: "#", // TODO: link al tuo profilo LinkedIn
  x: "#", // TODO: link al tuo profilo X (o rimuovilo da components/contact.tsx)
}
