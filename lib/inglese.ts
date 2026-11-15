// -----------------------------------------------------------------------------
// TESTI IN INGLESE — affiancano quelli italiani di portfolio-data.ts e
// casi-studio.ts. Le chiavi sono gli slug dei progetti, i ruoli del percorso e
// i percorsi delle schermate. I capitoli dei casi di studio, con schemi, numeri
// e commenti del codice, stanno in casi-studio-en.ts.
// -----------------------------------------------------------------------------

export type ProgettoEn = {
  kind: string
  team: string
  squadra: string
  tagline: string
  description: string
  highlights: string[]
}

export const progettiEn: Record<string, ProgettoEn> = {
  tripify: {
    kind: "Android app",
    team: "Team of four · Enterprise Architecture, UniCal · I built catalogue and itineraries, backend and app",
    squadra: "Team of 4",
    tagline:
      "A travel platform of microservices for flights, hotels and activities. I built the catalogue and itineraries, from the Spring Boot services to the Android app.",
    description:
      "A travel booking platform made of six Spring Boot microservices, each with its own database, and a native Android app. I built the catalogue and the itineraries from start to finish. The catalogue gathers flights, hotels and activities, makes them searchable with combinable filters and keeps real availability of seats and rooms, so that two people can't book the last seat at the same moment. Itineraries are ordered travel lists, private, shared or public: you build them by hand with a consistency check on cities and dates, or have them generated from city, length, number of travellers and budget, and export them to your calendar.",
    highlights: [
      "Search with a dozen combinable filters (city, price, rating, dates, seats, direct flights) built at runtime with Spring Data's Specification pattern, on a model with JPA inheritance for flights, hotels and activities",
      "No overbooking across services: seats and rooms held for 15 minutes while the user pays, then confirmed or released, with saga-style compensation when checkout fails",
      "Itineraries with geographic and time consistency checks, automatic generation that picks the cheapest flight with seats for the whole group, and .ics calendar export with events that update instead of duplicating",
      "Security: roles and listing ownership checked from the Keycloak JWT, images validated by their leading bytes rather than their extension, 404 instead of 403 on private lists so their existence isn't revealed, optimistic locking on shared lists",
      "Android app in Kotlin and Jetpack Compose with MVVM, StateFlow and Retrofit: a home with recommendations, search with city autocomplete, a detail page with gallery and map, and an itinerary timeline split by actual day",
      "The whole platform runs in Docker: an API gateway with rate limiting, Keycloak with Google sign-in, RabbitMQ for notifications, one PostgreSQL database per service",
    ],
  },
  tesi: {
    kind: "Desktop app · Thesis",
    team: "Bachelor's thesis in Computer Science · UniCal · solo project",
    squadra: "Solo",
    tagline:
      "A desktop app a lecturer uses to prepare programming exams for Moodle: solutions verified against tests, and an AI that generates, reviews and fixes, always with the lecturer's confirmation.",
    description:
      "A desktop application for the lecturer of Programming Fundamentals at UniCal, who prepares Python exams and pre-tests for Moodle with CodeRunner questions. For each exercise you write the text, the hidden solution, the students' starter code and the tests; the app computes the expected outputs by running the solution, verifies every test and exports an XML file Moodle imports first time. The second part of the thesis brings AI into the tool: with an OpenRouter key it generates the solution from the text, reviews it for bugs, edge cases and missing tests, and proposes fixes and similar exercises in the lecturer's style. Every proposal is checked against the tests, you see what will be sent to the model before each request, and nothing changes without confirmation.",
    highlights: [
      "Import and export in the same XML format as Moodle's exports, with CDATA and images embedded in the text, verified on the lecturer's real exam exercises",
      "Expected outputs computed by running the solution the way CodeRunner does, with a 3-second time limit and 1 MB of output at most: export stays blocked until every test passes",
      "AI features behind a LanguageModel port in the hexagonal backend, with the OpenRouter adapter: a solution generated from the text and checked against the tests in up to three attempts, a review by type of problem with the suggested tests already run, fixes shown as diffs, similar exercises in the lecturer's style",
      "Nothing changes without confirmation: you see the request to the model before it's sent, with the lecturer's own instructions; the key stays in the system keychain or behind a master password, and Electron's main process adds it to each request",
      "A tabbed SQLite archive with autosave: tracks by year, reusable exercises, a bin, filters by type and date, multi-file XML import, backup and restore",
      "Installers for Windows, macOS and Linux with Python bundled, built by GitHub Actions after more than 500 tests (pytest and Vitest), with automatic updates from GitHub releases",
    ],
  },
  apkit4d: {
    kind: "Desktop app · R&D",
    team: "Team of eight · Research and Development Methodologies, UniCal master's · for the Physics Department · I did the GUI research and the fast 3D view",
    squadra: "Team of 8",
    tagline:
      "A Python desktop app for a physics lab: it opens 4D acquisitions from a Zeiss microscope, shows them in 3D over time and follows the algae. My part is the 3D view and its speed.",
    description:
      "A master's project for a researcher in the Physics Department who studies algae acquired with a Zeiss light-field microscope: .czi files holding a 3D volume that changes over time. The group works in Scrum, with the researcher as Product Owner, and is building a Python app with PySide6 and PyVista that opens the acquisition, shows it in 3D frame by frame and takes it through a pipeline: cropping the region of interest, preprocessing, detecting the algae, tracking them over time and exporting. My part: the GUI research, from running the starting prototype to the base of the window and the napari and PyVista demos measured side by side; then the 3D view that got slow when zooming, the left panel and the controls for the view's appearance.",
    highlights: [
      "Reading .czi files with czifile instead of the prototype's library: same data, 3 to 6 times faster and compatible with Python 3.14",
      "GUI base in PySide6: the window, the File menu, a file_opened signal and a run(path) function the command line uses too",
      "Two demos with the same features (3D volume, time, contrast, clickable blobs, tracks, region of interest), one in napari and one in PyVista, measured on the same real data; a first round of measurements was wrong, we redid it and the report says so. The group chose PyVista",
      "A fast 3D view when zooming: one draw per change, no redraws while still, half resolution only while the view moves. A wheel step went from about 300 to 34–45 ms, dragging from 165–182 to 57–76 ms, a frame change from 206 to 106 ms",
      "VTK's reduced quality turned the algae into diamonds while moving: half resolution is just as fast, and when still the image is identical, pixel for pixel",
      "Scrum with a Jira backlog, pull requests with review (thirteen comments on the 3D view, resolved one by one with new tests) and CI on GitHub with tests, linting and type checking",
    ],
  },
  goldenstay: {
    kind: "Web app",
    team: "Pair project · Web Application course, UniCal",
    squadra: "Pair",
    tagline:
      "Bookings for a seaside resort in Tropea: search by dates, rooms and suites, payment and back office.",
    description:
      "A booking web app for a seafront property in Tropea. Guests pick dates and number of guests, compare rooms and suites with the total for the stay already worked out, open a room's page and book from the payment window, getting a PDF receipt. A private area lets the administrator create rooms and manage bookings.",
    highlights: [
      "Prices with the Strategy pattern: base rate, August high season and weekends (+20%), a discount beyond seven nights (−15%), applied in order of priority",
      "A Factory pattern in the backend to create Standard, Deluxe and Suite rooms",
      "A Spring Boot REST API for rooms, bookings and users, with JPA persistence on PostgreSQL",
      "An Angular frontend organised by feature, with guards on the private area's routes and a PDF receipt generated with jsPDF",
    ],
  },
  moneymind: {
    kind: "Web app",
    team: "Team of four, my contribution full-stack",
    squadra: "Team of 4",
    tagline: "Personal finance and investing: shared wallets, budgets, transactions and markets.",
    description:
      "A web platform to manage personal finances and follow investments. Income and expenses are organised in wallets, which can be shared with other people by invitation or code, with budgets and transfers between wallets; the dashboard sums up balance and trends with charts. In the markets section you browse stocks, ETFs and crypto, each asset's chart and financial news, and simulate trades on your own portfolio.",
    highlights: [
      "Shared wallets with invitations, access codes, budgets, ownership transfer and transfers between wallets",
      "Quotes and news from Finnhub, with news cached and refreshed by a scheduler so the API quota isn't exhausted",
      "A Spring Boot backend with Spring Security and JPA/Hibernate on PostgreSQL, with the Proxy pattern for users and portfolios",
      "An Angular frontend rebuilt on a shared design system, with Chart.js charts",
    ],
  },
  "muscle-fitness": {
    kind: "Site and members area",
    team: "Personal project",
    squadra: "Personal",
    tagline: "A site for a smart gym with a members area: memberships, QR badge and medical certificates.",
    description:
      "A site for the A.S.D. Muscle & Fitness gym in Spezzano Piccolo, with a members area and an admin panel. From the home page you discover disciplines, equipment and memberships, and buy a plan at checkout, with a simulated payment. In their dashboard members find the QR badge to get in, their membership status, medical certificate and activity history: entry is allowed only with valid access and an approved certificate. The administrator manages members, approves or rejects certificates and checks the statistics.",
    highlights: [
      "An Express API with JWT authentication, passwords hashed with bcrypt, rate limiting on sensitive routes and Helmet; security headers such as CSP and HSTS on the Vercel deployment",
      "Input validation with Zod, and certificate uploads that check the file's real type, not just its extension",
      "Data with Prisma on SQLite: users, memberships with renewal and cancellation, certificates and activity history",
      "A React frontend with Vite, Tailwind CSS and Framer Motion, with protected routes for members and administrators",
    ],
  },
  wavely: {
    kind: "Desktop app",
    team: "Exam project for three · refactored by me in 2026",
    squadra: "Team of 3, rebuilt by me",
    tagline: "A JavaFX desktop music player: playlists, artists, equaliser and themes.",
    description:
      "A desktop application to listen to and organise music, born as an exam project in a team of three and then entirely refactored by me. After signing in you browse tracks and artists, create playlists and favourites, search the catalogue and customise your profile and theme; the player manages the queue and resumes listening where you left off.",
    highlights: [
      "A player with a play queue, a 6-band equaliser and resume of the last listen",
      "A layered architecture: repositories on SQLite, services for session, player and themes, FXML controllers observing state through JavaFX properties",
      "Passwords hashed with BCrypt and terms of use exported to PDF with PDFBox",
      "Five colour themes and custom graphic components, such as the animated 'aurora' background",
    ],
  },
}

/** Didascalie delle schermate, per percorso dell'immagine. */
export const didascalieEn: Record<string, string> = {
  "/projects/tripify/cover.webp": "Home with search and the most popular",
  "/projects/tripify/dettaglio.webp": "A hotel's page, with room types and prices",
  "/projects/tripify/ricerca.webp": "Search results",
  "/projects/tripify/itinerari.webp": "Public itineraries shared by users",
  "/projects/tesi/cover.webp": "A real exam imported from Moodle: 45 of 45 tests passed",
  "/projects/tesi/ai.webp": "AI features on the solution: generate it from the text or review it",
  "/projects/tesi/richiesta.webp": "Before every request you see what goes to the model",
  "/projects/tesi/archivio.webp": "The track archive, with filters and backup",
  "/projects/tesi/impostazioni.webp": "Settings: the OpenRouter key and the model",
  "/projects/apkit4d/cover.webp": "A lab acquisition open in ApKit4D, frame 1 of 600",
  "/projects/apkit4d/scuro.webp": "The same view with the dark theme",
  "/projects/goldenstay/cover.webp": "Home with search by dates and number of guests",
  "/projects/goldenstay/demo.gif": "Demo: search, booking, payment and receipt",
  "/projects/goldenstay/camera.webp": "A room's page",
  "/projects/goldenstay/prezzi.webp": "The pricing rules, explained to the guest",
  "/projects/goldenstay/esperienza.webp": "Presenting the property",
  "/projects/goldenstay/mobile.webp": "Mobile version",
  "/projects/moneymind/cover.webp": "Dashboard with balance and yearly trend",
  "/projects/moneymind/portafoglio.webp": "Investment portfolio",
  "/projects/moneymind/wallet.webp": "A shared wallet, with an invitation code",
  "/projects/moneymind/mercati.webp": "Markets: stocks, ETFs and crypto",
  "/projects/moneymind/grafico.webp": "An asset's chart and statistics",
  "/projects/muscle-fitness/cover.webp": "Home",
  "/projects/muscle-fitness/discipline.webp": "Disciplines included in the membership",
  "/projects/muscle-fitness/attrezzature.webp": "The gym's equipment",
  "/projects/muscle-fitness/abbonamenti.webp": "Memberships and prices",
  "/projects/muscle-fitness/mobile.webp": "Mobile version",
  "/projects/wavely/cover.webp": "Home with trending albums and the player",
  "/projects/wavely/artista.webp": "An artist's page with popular tracks",
  "/projects/wavely/album.webp": "An album with tracklist and total length",
  "/projects/wavely/impostazioni.webp": "Settings and the 6-band equaliser",
  "/projects/wavely/ricerca.webp": "Catalogue search",
}

/** Apertura dei casi di studio: riassunto e la mia parte. I capitoli sono in casi-studio-en.ts. */
export const casiStudioEn: Record<string, { sommario: string; ruolo: string }> = {
  tripify: {
    sommario:
      "A travel platform built by four of us as six independent microservices and an Android app. My part is the heart of the product: the catalogue of flights, hotels and activities, with real availability, and the itineraries users put together, share or have generated.",
    ruolo: "catalog-service and itinerary-service, from the database to the Android screens",
  },
  tesi: {
    sommario:
      "My bachelor's thesis: a desktop app the lecturer of Programming Fundamentals uses to prepare Python exams for Moodle. They used to be written by hand, question by question, and a wrong expected output reached students during the exam. Here every test is verified by running the solution, export only happens when everything passes, and a language model helps write and review: each of its proposals goes through the tests and nothing changes without confirmation.",
    ruolo: "Everything: interface, backend, AI features, installers. Solo project",
  },
  apkit4d: {
    sommario:
      "The project that opens my master's: eight of us, with a researcher from the Physics Department as Product Owner, are building an app that opens the 4D acquisitions of a Zeiss microscope, shows them in 3D over time and follows the algae. My part is the view: the research on the graphics library, the base of the window, and the 3D view that got slow when zooming.",
    ruolo: "GUI research, the window's base, the fast 3D view, the left panel",
  },
  goldenstay: {
    sommario:
      "A booking web app for a seaside resort in Tropea, built as a pair for the Web Application course and put online. Guests pick their dates, see only the free rooms with the total already worked out, book and download the receipt; the administrator creates rooms and manages bookings.",
    ruolo: "Pair project, Web Application course",
  },
}

export const percorsoEn: Record<string, { tipo: string; role: string; company: string; period: string; description: string }> = {
  "Laurea Magistrale in Artificial Intelligence and Computer Science": {
    tipo: "Education",
    role: "MSc in Artificial Intelligence and Computer Science",
    company: "University of Calabria",
    period: "From October 2026",
    description:
      "First semester: Deep Learning and Research and Development Methodologies, with an eight-person Scrum project for the Physics Department: ApKit4D, 3D analysis of algae under the microscope.",
  },
  "Laurea Triennale in Informatica": {
    tipo: "Education",
    role: "BSc in Computer Science",
    company: "University of Calabria",
    period: "In progress · expected Dec 2026",
    description: "Third year. University projects across web, mobile and enterprise architecture, alongside personal projects.",
  },
  "Operatore volontario": {
    tipo: "Experience",
    role: "Volunteer",
    company: "Italian Universal Civil Service",
    period: "Sep 2025 · Sep 2026",
    description: "A year of Italian Universal Civil Service as a volunteer, alongside my studies.",
  },
  "Diploma Scientifico — Scienze Applicate": {
    tipo: "Education",
    role: "Scientific high school diploma — Applied Sciences",
    // Il nome della scuola resta quello ufficiale: che scuola è lo dice già il titolo.
    company: 'Liceo Scientifico "Scorza", Cosenza',
    period: "2023 · 97/100",
    description: "Applied Sciences track, my first structured contact with programming.",
  },
}

export const introEn =
  "Third-year Computer Science student at the University of Calabria, graduating in December 2026 with a thesis that brings AI into a teaching tool. Since October 2026 I have also been attending the master's in Artificial Intelligence and Computer Science at UniCal, working in a team of eight on a project for the Physics Department. Along the way I have built university and personal projects for web, mobile and desktop: full-stack development, Android apps and microservice architectures."

/** I gruppi dello stack (sezione Stack e pagina del curriculum). */
export const gruppiEn: Record<string, string> = {
  Linguaggi: "Languages",
  Frontend: "Frontend",
  "Backend e database": "Backend and databases",
  "Mobile e desktop": "Mobile and desktop",
  Infrastruttura: "Infrastructure",
}

/**
 * Il testo alternativo delle schermate, per percorso dell'immagine: è quello
 * che legge chi non vede l'immagine. Le scritte che si leggono nella schermata
 * restano com'è l'app, in italiano, tra virgolette.
 */
export const altEn: Record<string, string> = {
  "/projects/tripify/cover.webp": "Home of the Tripify Android app with search for flights, hotels and experiences, and the most popular",
  "/projects/tripify/dettaglio.webp": "Page of the Iron & Spa Resort hotel with gallery, rating, stay dates and room types",
  "/projects/tripify/ricerca.webp": "Results of a search for Milan: flights with route, price, date and seats available",
  "/projects/tripify/itinerari.webp": 'The most popular public itineraries, such as "Fuga a Venezia" and "Puglia Autentica"',
  "/projects/tesi/cover.webp":
    "The exam of 3 July 2026 open in the editor: three exercises ready, 45 of 45 tests passed and the text of exercise 3",
  "/projects/tesi/ai.webp":
    "The solution to exercise 3 in the editor with the AI menu open: generate the solution and review the solution",
  "/projects/tesi/richiesta.webp":
    "The request-to-the-AI window for reviewing the solution, with room for the lecturer's instructions, before sending",
  "/projects/tesi/archivio.webp":
    "The tabbed archive with tracks grouped by year, filters by type, year and date, and the backup section",
  "/projects/tesi/impostazioni.webp":
    "Settings with the OpenRouter key masked, the chosen model and the option to see the request before it is sent",
  "/projects/apkit4d/cover.webp":
    "ApKit4D with a microscope acquisition open: the 3D volume with the algae, the time bar over the 600 frames and the five pipeline steps on the right",
  "/projects/apkit4d/scuro.webp": "The same ApKit4D view with the dark theme",
  "/projects/goldenstay/cover.webp": "GoldenStay home: the property by the sea at sunset and the search form for dates and guests",
  "/projects/goldenstay/demo.gif":
    "Recording of a complete booking on GoldenStay: room search, room page, payment and PDF receipt",
  "/projects/goldenstay/camera.webp": 'Page of the "Suite Vista Mare" with photos, capacity, bed and price per night',
  "/projects/goldenstay/prezzi.webp":
    'The "Come si compone il prezzo" section: list price, surcharges for weekends and high season, long-stay discount',
  "/projects/goldenstay/esperienza.webp": 'The "L\'esperienza" section with photos of a room and of the pool by the sea',
  "/projects/goldenstay/mobile.webp": "GoldenStay home on a phone with the search form",
  "/projects/moneymind/cover.webp": "MoneyMind dashboard with total balance, income, expenses and the yearly trend chart",
  "/projects/moneymind/portafoglio.webp":
    "Investment portfolio with total value, allocation pie chart and invested capital compared with current value",
  "/projects/moneymind/wallet.webp": 'The shared wallet "Casa Milano" with invitation code, balance, and the group\'s income and expenses',
  "/projects/moneymind/mercati.webp": "The Markets section with featured news and quotes for stocks and ETFs",
  "/projects/moneymind/grafico.webp": "Candlestick chart of Apple stock with key statistics",
  "/projects/muscle-fitness/cover.webp":
    'Home of the Muscle & Fitness site: the headline "Allenati quando vuoi tu" over the photo of the weights room',
  "/projects/muscle-fitness/discipline.webp":
    "Grid of disciplines with kick-boxing, swimming, cross-training, rehabilitation, weights room and cardio",
  "/projects/muscle-fitness/attrezzature.webp":
    'The "Ferro serio, non arredamento" section with Technogym, Panatta and Diamond equipment',
  "/projects/muscle-fitness/abbonamenti.webp":
    'The "Un prezzo, tutta la struttura" section with single entry, monthly and yearly plans',
  "/projects/muscle-fitness/mobile.webp": "Home of the Muscle & Fitness site on a phone",
  "/projects/wavely/cover.webp": "WAVE.LY home with the greeting to the user, trending albums and the player at the bottom",
  "/projects/wavely/artista.webp": "Page of the artist Sfera Ebbasta with popular tracks and the one playing highlighted",
  "/projects/wavely/album.webp": "Page of the album YE by Kanye West with the tracklist",
  "/projects/wavely/impostazioni.webp": "Settings with autoplay, resume of listening and the 6-band equaliser with presets",
  "/projects/wavely/ricerca.webp": "Catalogue search with the top result, tracks and artists",
}
