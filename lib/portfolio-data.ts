// -----------------------------------------------------------------------------
// CONTENUTI DEL PORTFOLIO — modifica qui, non nei componenti.
// I campi segnati con "TODO" sono placeholder: sostituiscili con i tuoi dati reali.
// -----------------------------------------------------------------------------

export const profile = {
  name: "Matteo Iazzolino",
  role: "Software Engineer",
  location: "Cosenza, Italia",
  // Segue il ruolo nella prima schermata: tienila corta.
  tagline: "Dal modello dati all'interfaccia, curo tutto il percorso.",
  intro:
    "Studente al terzo anno di Informatica all'Università della Calabria, con laurea prevista a dicembre 2026. Ho maturato esperienza pratica costruendo progetti universitari e personali in ambito web e mobile: sviluppo full-stack, applicazioni Android e architetture enterprise. Cerco un ruolo part-time da sviluppatore per portare queste competenze su codice di produzione, in parallelo alla laurea magistrale.",
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
    // Il ruolo è esplicitato: il progetto è di gruppo, il contributo personale
    // è il modulo catalogo dell'app Android (come dichiarato nel CV).
    description:
      "App Android per la ricerca e prenotazione di viaggi, voli, hotel ed escursioni, parte di una piattaforma a microservizi sviluppata per il corso di Enterprise Architecture: servizi Spring Boot con un database Postgres ciascuno, Keycloak, RabbitMQ e API gateway, il tutto in Docker. Mio contributo: il modulo catalogo dell'app, in Kotlin e Jetpack Compose.",
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
      "Piattaforma web per la gestione delle finanze personali e degli investimenti: dashboard con grafici, sezione mercati con azioni ed ETF. Progetto di gruppo (4 persone); mio contributo full-stack, dal backend Spring Boot con persistenza Hibernate su PostgreSQL fino al frontend Angular.",
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
      "Questo sito: portfolio statico in Next.js con export su GitHub Pages. Animazioni legate allo scorrimento in CSS, interfaccia in vetro e contenuti separati dal markup in un unico file di dati.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    repo: "https://github.com/Matteoiazz/Matteoiazz.github.io",
    demo: "https://matteoiazz.github.io",
  },
]

export const stack: { group: string; items: string[] }[] = [
  { group: "Linguaggi", items: ["Java", "Kotlin", "Python", "C++", "C"] },
  { group: "Frontend", items: ["Angular", "React", "Tailwind CSS"] },
  { group: "Backend e database", items: ["Spring Boot", "Node.js", "PostgreSQL", "MySQL"] },
  { group: "Mobile e desktop", items: ["Kotlin", "Jetpack Compose", "JavaFX", "Electron"] },
]

export type Experience = {
  role: string
  company: string
  period: string
  description: string
}

export const experiences: Experience[] = [
  {
    role: "Laurea Triennale in Informatica",
    company: "Università della Calabria",
    period: "In corso · prevista dic. 2026",
    description:
      "Terzo anno. Progetti universitari in ambito web, mobile e architetture enterprise, affiancati da progetti personali.",
  },
  {
    role: "Sommelier / Cameriere",
    company: "Sale ricevimenti",
    period: "Dal 2024",
    description:
      "Servizio di sala e sommellerie in eventi e ricevimenti: gestione del cliente, lavoro in team sotto pressione e cura del dettaglio.",
  },
  {
    role: "Diploma Scientifico — Scienze Applicate",
    company: "Liceo Scientifico \"Scorza\", Cosenza",
    period: "2023 · 97/100",
    description:
      "Percorso con indirizzo Scienze Applicate, primo contatto strutturato con la programmazione.",
  },
]

export const contact = {
  email: "matteo.iazzolino@gmail.com",
  github: "https://github.com/Matteoiazz",
  linkedin: "https://www.linkedin.com/in/matteoiazzolino",
  x: "#", // TODO: link al tuo profilo X (o rimuovilo da components/contact.tsx)
}
