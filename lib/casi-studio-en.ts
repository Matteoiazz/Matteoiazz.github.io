// -----------------------------------------------------------------------------
// CASI DI STUDIO IN INGLESE — affianca casi-studio.ts, che resta la fonte.
// I capitoli si cercano per titolo italiano e le etichette corte (livelli e
// blocchi degli schemi, voci dei numeri) per testo italiano: se una voce
// manca, in pagina resta quella italiana.
// Il codice è quello dei repository e non si tocca: in inglese si traducono
// solo i commenti, una riga alla volta, e la pagina lo dice.
// -----------------------------------------------------------------------------

export type CapitoloEn = {
  titolo: string
  testo: string[]
  /** Commenti del codice: riga italiana e riga inglese che la sostituisce. */
  commenti?: [string, string][]
}

/** La didascalia dello schema dell'architettura, per slug. */
export const schemiEn: Record<string, string> = {
  tripify:
    "Each service has its own database and none of them share tables: they talk over HTTP (Feign) or events (RabbitMQ). Itineraries doesn't copy the catalogue's data, it asks for it every time, so the two services never drift out of sync.",
  tesi:
    "Electron starts the Python backend on a free port and hands it a secret token that changes at every launch; it also keeps the OpenRouter key, which the page never sees. The page doesn't see Node.js: it talks only to the preload and, over HTTP, to the backend. The backend is hexagonal: the domain depends on nothing, the language model is a port just like code execution, and the details live in the adapters.",
  apkit4d:
    "The core (reading .czi files, preprocessing, detection, tracks, statistics) is a library that can also be used from the command line; the PySide6 interface uses it without the core knowing anything about Qt. The 3D view is PyVista on top of VTK, inside the Qt window.",
  goldenstay:
    "An Angular frontend on Vercel, a Spring Boot API in a Docker container on Render, a managed PostgreSQL database. Environment variables keep development apart from production: database addresses and CORS origins aren't written in the code.",
}

/** I capitoli, per slug e per titolo italiano. */
export const capitoliEn: Record<string, Record<string, CapitoloEn>> = {
  tripify: {
    "Niente overbooking": {
      titolo: "No overbooking",
      testo: [
        "When a user starts checkout, the catalogue holds seats or rooms for 15 minutes. While availability is being worked out, the fare class row is locked for writing: two requests for the last seat are served one after the other, and the second finds the seat already taken.",
        "Availability isn't a counter: it's the total minus the holds still active, and for a hotel the minimum night by night. In the end the payment confirms the hold; if checkout fails, booking calls the compensation and the hold is released, as in a saga.",
      ],
      commenti: [
        [
          "// FareClassRepository: la riga resta bloccata fino alla fine della transazione",
          "// FareClassRepository: the row stays locked until the end of the transaction",
        ],
        ["// … controlli su posti richiesti e volo già partito", "// … checks on the seats requested and on flights already departed"],
        ["// 15 minuti", "// 15 minutes"],
      ],
    },
    "Una ricerca, undici filtri": {
      titolo: "One search, eleven filters",
      testo: [
        "Flights, hotels and activities are subclasses of the same JPA entity, so a single search covers them all. The filters (category, keyword, price, rating, destination, departure, guide, amenities, direct flights, date, seats) combine freely: the query is built at runtime with the Specification pattern, adding a predicate for each filter that is present.",
        "Destination means something different depending on the type: the arrival city for a flight, the city for a hotel or an activity. With treat() the same condition looks at the right field for each subclass.",
      ],
      commenti: [
        [
          "// Destinazione: arrivalCity per i voli, city per hotel e attività",
          "// Destination: arrivalCity for flights, city for hotels and activities",
        ],
        ["// … prezzo, voto, servizi, voli diretti, data, posti", "// … price, rating, amenities, direct flights, date, seats"],
      ],
    },
    "L'itinerario che si scrive da solo": {
      titolo: "The itinerary that writes itself",
      testo: [
        "From city, length, number of travellers and budget, the service puts together a complete itinerary: the cheapest flight that has seats for the whole group (not the cheapest overall), a hotel in the exact city of arrival, one activity a day for as long as the budget allows, and the return flight if there is one.",
        "For the hotel what counts is the total cost, not the list price: an €80 room for two, for a group of four, costs more than a €100 room for four.",
      ],
      commenti: [
        [
          "// Il più economico tra i voli con posti per tutta la comitiva: uno con una sola",
          "// The cheapest of the flights with seats for the whole group: one with a single",
        ],
        [
          "// tariffa da 6 posti non basta per 10 viaggiatori, anche se costa meno.",
          "// 6-seat fare isn't enough for 10 travellers, even if it costs less.",
        ],
        [
          "// Una camera da 80 € che ospita 2 persone richiede 2 camere (160 €) per una",
          "// An €80 room that sleeps 2 means 2 rooms (€160) for a",
        ],
        [
          "// comitiva di 4, mentre una da 100 € che ne ospita 4 basta da sola.",
          "// group of 4, while a €100 room that sleeps 4 is enough on its own.",
        ],
      ],
    },
    "Due bug che ora riconosco": {
      titolo: "Two bugs I now recognise",
      testo: [
        "The first: optimistic locking on shared lists. Adding @Version to a table that already had rows, the column started out empty; in SQL, NULL = NULL is never true, so every change to an existing list failed with a false conflict. The fix is a default value on the column and a one-off repair of the old rows.",
        "The second: “Book everything” really did add everything to the cart, but answered with a 500 error. One method of the class called another annotated with @Transactional, and an internal call bypasses Spring's proxy: the transaction never opened. The tests didn't show it because each test already runs inside a transaction. Now the transaction is opened explicitly.",
      ],
      commenti: [
        [
          "// Prima: this.registerBookingAttempt(...) ignorava @Transactional",
          "// Before: this.registerBookingAttempt(...) ignored @Transactional",
        ],
        [
          "// (chiamata interna, il proxy di Spring non entra in gioco).",
          "// (an internal call, Spring's proxy never comes into play).",
        ],
        [
          "// Lock ottimistico: senza default le righe già esistenti restavano a NULL",
          "// Optimistic lock: without a default the existing rows stayed NULL",
        ],
      ],
    },
  },
  tesi: {
    "Eseguire la soluzione come fa CodeRunner": {
      titolo: "Running the solution the way CodeRunner does",
      testo: [
        "Expected outputs aren't written by hand: you get them by running the lecturer's solution on every input. To get the same result as Moodle the app reproduces the CodeRunner type python3_w_input, which prints back every line read with input(): that's why in the XML files the expected output begins with the input.",
        "Every run has a 3-second time limit and a maximum output of 1 MB, checked while the program is running: a solution with an infinite loop gets stopped instead of freezing the app.",
      ],
      commenti: [
        [
          '# Riproduce il tipo CodeRunner "python3_w_input": ogni riga letta con input()',
          '# Reproduces the CodeRunner type "python3_w_input": every line read with input()',
        ],
        ["# viene ristampata sull'output.", "# is printed back to the output."],
        [
          '"""Attende la fine del programma; lo interrompe se supera il tempo o l\'output massimo."""',
          '"""Waits for the program to end; stops it if it goes over the time limit or the maximum output."""',
        ],
      ],
    },
    "Un backend che solo l'app può usare": {
      titolo: "A backend only the app can use",
      testo: [
        "The backend runs Python code, so it mustn't answer just anyone. It listens only on 127.0.0.1, on a port chosen at startup, and every API request must carry the secret token Electron generates and hands to both the backend and the page. A web page open in the browser doesn't know it and gets a 401.",
        "In the installed app the page also has a Content Security Policy: a script hidden in the text of an imported exercise doesn't run.",
      ],
      commenti: [
        [
          "# Le richieste preliminari CORS (OPTIONS) non portano intestazioni personalizzate",
          "# CORS preflight requests (OPTIONS) carry no custom headers",
        ],
        [
          "// Electron: una porta libera a ogni avvio, poi il backend e l'attesa di /health",
          "// Electron: a free port at every launch, then the backend and the wait for /health",
        ],
      ],
    },
    "Dominio al centro, dettagli ai bordi": {
      titolo: "Domain at the centre, details at the edges",
      testo: [
        "The backend follows the hexagonal architecture. The domain (exercises and tracks) imports nothing from FastAPI, SQLite or subprocess; the application uses only the ports, that is the interfaces for running code and for the archive; the adapters are the concrete implementations.",
        "So the domain's tests need neither a database nor a Python process, and changing how code is run touches a single file. The same goes for the AI: the use cases know only the LanguageModel port, and in the tests a fake model stands in for OpenRouter. In all, more than 500 automated tests, between pytest on the backend and Vitest on the interface, also run on GitHub Actions before every installer.",
      ],
      commenti: [
        ["# esercizi e tracce: nessuna dipendenza esterna", "# exercises and tracks: no external dependencies"],
        ["# interfacce di cui l'applicazione ha bisogno", "# interfaces the application needs"],
        ["# casi d'uso", "# use cases"],
        ["# implementazioni concrete", "# concrete implementations"],
        ["# FastAPI: rotte, codice segreto, CORS", "# FastAPI: routes, secret token, CORS"],
      ],
    },
    "L'AI propone, i test decidono": {
      titolo: "The AI proposes, the tests decide",
      testo: [
        "The second part of the thesis brings a language model into the editor, with the lecturer's own OpenRouter key. It can generate the solution from the text, review it for bugs, edge cases, ambiguous wording and missing tests, fix a reported problem showing the differences, and propose similar exercises in the lecturer's style.",
        "No proposal is taken as it comes. The generated solution is checked like the lecturer's own: valid Python, the expected function, the same main, no errors on the tests. If a check fails, the exact error goes back to the model, for up to three attempts. Before every request the lecturer sees what will be sent and can add instructions; in the end it's the lecturer who decides whether to apply it.",
      ],
    },
  },
  apkit4d: {
    "Prima, il prototipo": {
      titolo: "First, the prototype",
      testo: [
        "The group started from a prototype by the researcher. Running it on the sample files showed the first problem: at every frame change it redid preprocessing and detection from scratch.",
        "We also compared two libraries for reading .czi files: czifile reads the same data, is 3 to 6 times faster and works with Python 3.14, and the group switched to it.",
      ],
    },
    "Due demo, stessi dati": {
      titolo: "Two demos, same data",
      testo: [
        "To choose the library for the 3D view I wrote two demos with the same features (3D volume, time slider, contrast, clickable blobs, tracks, region of interest) and the same data, one with napari and one with PyVista, and measured them.",
        "On the real volume they are almost level: a frame change between 87 and 100 milliseconds, rotation between 20 and 24 frames per second; PyVista starts sooner and uses less memory. A first round of measurements was wrong, with the laptop on battery and dragging in napari selecting instead of rotating: we redid it, and the mistake is written in the report. The group chose PyVista.",
      ],
    },
    "La vista 3D veloce": {
      titolo: "The fast 3D view",
      testo: [
        "When zooming, the view got slow, especially on a teammate's integrated graphics card. The causes: every wheel step drew the view six times, when still it redrew itself ten times a second, and every frame was at full quality even while moving.",
        "The fix: a single draw for each change, no redraws when still, half resolution only while the view is moving. A wheel step went from about 300 to 34–45 milliseconds, dragging from 165–182 to 57–76, a frame change from 206 to 106.",
        "The discovery: VTK's reduced quality turned the algae into diamonds while the view was moving. Half resolution is just as fast, and when still the image is identical to before, pixel for pixel.",
      ],
    },
    "Lavorare in otto": {
      titolo: "Working as eight",
      testo: [
        "The group works in Scrum, with the researcher as Product Owner: a backlog on Jira, pull requests with review, and CI on GitHub with tests, linting and type checking. The review of the 3D view got thirteen comments, resolved one by one, with new tests.",
      ],
    },
  },
  goldenstay: {
    "Il prezzo come strategia": {
      titolo: "Price as a strategy",
      testo: [
        "Rates change with the period: August and weekends cost 20% more, beyond seven nights there's a 15% discount. Each rate is a class implementing the same interface, and a single place decides which one applies, in order of priority.",
        "Adding a rate means writing a new class, without touching the others or the code that uses them. The same quote also gives the list price, to show the saving or the surcharge.",
      ],
      commenti: [
        [
          "/** Oltre le sette notti si applica uno sconto del 15% sull'intero soggiorno. */",
          "/** Beyond seven nights a 15% discount applies to the whole stay. */",
        ],
        [
          "/** Priorità: agosto, poi lo sconto lungo soggiorno, poi il weekend, infine il listino. */",
          "/** Priority: August, then the long-stay discount, then the weekend, finally the list price. */",
        ],
      ],
    },
    "Camere da una factory": {
      titolo: "Rooms from a factory",
      testo: [
        "Standard, Deluxe and Suite are created with the Factory pattern. Each factory is a Spring component named after its type, and Spring collects them into a map by itself: the controller picks the right one from the requested type, with no chain of ifs.",
      ],
      commenti: [
        [
          "// Spring inietta tutte le factory, indicizzate per nome del componente",
          "// Spring injects every factory, indexed by component name",
        ],
      ],
    },
    "Libera o occupata": {
      titolo: "Free or taken",
      testo: [
        "A room is taken if it has an active booking that overlaps the requested dates. Two ranges overlap when each begins before the other ends; the departure day doesn't count, so a guest leaving and one arriving on the same day don't exclude each other.",
      ],
      commenti: [
        [
          " * Vero se la camera ha già una prenotazione attiva che si sovrappone",
          " * True if the room already has an active booking that overlaps",
        ],
        [
          " * all'intervallo richiesto. Il giorno di partenza non conta come occupato.",
          " * the requested range. The departure day doesn't count as taken.",
        ],
      ],
    },
  },
}

/** Etichette corte, per testo italiano: livelli e blocchi degli schemi, voci dei numeri. */
export const etichetteEn: Record<string, string> = {
  // Livelli degli schemi
  Ingresso: "Entry",
  Servizi: "Services",
  Dati: "Data",
  Finestra: "Window",
  Adattatori: "Adapters",
  Interfaccia: "Interface",
  "Vista 3D": "3D view",
  Nucleo: "Core",

  // Blocchi
  "App Android": "Android app",
  "Interfaccia React": "React interface",
  "Processo principale": "Main process",
  "Chiave OpenRouter": "OpenRouter key",
  "API FastAPI": "FastAPI API",
  Applicazione: "Application",
  Dominio: "Domain",
  "Esecuzione Python": "Python execution",
  "Archivio SQLite": "SQLite archive",
  "Finestra PySide6": "PySide6 window",
  "Pannello di sinistra": "Left panel",
  "Viewport PyVista": "PyVista viewport",
  Rilevamento: "Detection",
  Tracce: "Tracks",
  "Lettura .czi": ".czi reading",

  // Note dei blocchi
  "OAuth2 · accesso Google": "OAuth2 · Google sign-in",
  "annunci · ricerca · disponibilità": "listings · search · availability",
  "liste · generazione · .ics": "lists · generation · .ics",
  "carrello · checkout": "cart · checkout",
  profili: "profiles",
  notifiche: "notifications",
  "uno per servizio": "one per service",
  eventi: "events",
  "unico ponte · contextIsolation": "the only bridge · contextIsolation",
  "porta libera · codice segreto · finestra": "free port · secret token · window",
  "portachiavi · master password": "keychain · master password",
  "X-App-Token · solo 127.0.0.1": "X-App-Token · 127.0.0.1 only",
  "verifica · AI · archivio": "verification · AI · archive",
  "esercizi · tracce": "exercises · tracks",
  "backup · cestino": "backup · bin",
  "porta LanguageModel": "LanguageModel port",
  "aspetto · livelli": "appearance · layers",
  "cinque passi · barra del tempo": "five steps · time bar",
  "un disegno per cambio · mezza risoluzione in movimento": "one draw per change · half resolution while moving",
  "rumore · sfondo": "noise · background",
  blob: "blobs",
  "collegamento nel tempo": "linking over time",
  "riga di comando": "command line",
  "czifile · da 3 a 6 volte più veloce": "czifile · 3 to 6 times faster",
  "standalone · signals · guard · Vercel": "standalone · signals · guards · Vercel",
  "REST · JPA · Docker su Render": "REST · JPA · Docker on Render",

  // Numeri
  microservizi: "microservices",
  "miei, dal database all'app": "mine, from the database to the app",
  "filtri combinabili": "combinable filters",
  "di blocco al checkout": "hold at checkout",
  "test automatici": "automated tests",
  "sistemi operativi": "operating systems",
  "tentativi al massimo per la soluzione dell'AI": "attempts at most for the AI's solution",
  "versione attuale": "current version",
  "scatto della rotella con lo zoom, al massimo": "a wheel step when zooming, at most",
  "cambio frame": "frame change",
  "ridisegni da ferma": "redraws when still",
  "persone nel gruppo": "people in the group",
  tariffe: "rates",
  "tipi di camera": "room types",
  "ricevuta generata": "receipt generated",
  "Vercel e Render": "Vercel and Render",
}
