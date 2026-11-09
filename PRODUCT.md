# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiter e responsabili tecnici di aziende italiane che valutano un candidato per uno stage o un primo lavoro da sviluppatore. Aprono il sito dal curriculum o da LinkedIn, spesso tra un colloquio e l'altro, e decidono in pochi secondi se approfondire. Una parte legge in inglese: il sito è in italiano con versione inglese.

## Product Purpose

Portfolio personale di Matteo Iazzolino, studente di Informatica all'Università della Calabria (triennale entro dicembre 2026, magistrale in Artificial Intelligence and Computer Science da ottobre 2026). Deve far capire subito chi è, cosa sa costruire e perché vale un colloquio, e portare al contatto o al curriculum. Successo: il recruiter apre almeno un progetto e scrive o scarica il CV.

## Positioning

Junior full-stack developer orientato all'AI: Java/Spring Boot e Angular/React oggi, con progetti completi dal database all'interfaccia (microservizi, Android, desktop) e la magistrale in AI con un progetto di ricerca per il Dipartimento di Fisica come direzione. I progetti mostrano codice vero e scelte motivate, non solo schermate.

## Operating Context

Il sito si apre da link nel CV, su LinkedIn e nelle candidature, su desktop e su telefono. Esistono già una pagina curriculum (/cv/) con PDF scaricabile e pagine di caso di studio per i progetti principali (/progetti/<slug>/).

## Capabilities and Constraints

- Next.js 16 con export statico (output: "export", trailingSlash), pubblicato su Vercel; React 19, Tailwind 4, motion.
- Contenuti centralizzati in lib/portfolio-data.ts (profilo, progetti, competenze, percorso) e lib/casi-studio.ts (casi di studio con codice reale dai repository).
- Lingue: italiano principale, inglese come seconda lingua.
- Nessuna foto personale disponibile per ora: non usare volti di altre persone al suo posto.

## Brand Commitments

- Bianco e nero, senza colori particolari; sezioni chiare e scure che possono alternarsi (richiesta esplicita).
- Riferimento scelto dall'utente (novembre 2026): la pulizia e il concept di lorenzoiaccino.it (pagina bianca, un solo carattere, titoli a due toni, molto spazio, progetti mostrati in modo semplice, pagine progetto editoriali), rivisitati e resi suoi, mai copiati: Lorenzo e Dario sono compagni di corso e i siti vengono visti dalle stesse persone.
- Direzioni già scartate, da non riproporre: vetro liquido e vetro scuro con cromo, specimen in bianco e nero a griglia con tabellone a palette (troppo vicino a darioelia.it).
- Il nome apre la frase della prima schermata e chiude la pagina a tutta larghezza.
- Ruolo pubblico: "Junior Full-Stack Developer", come sul curriculum.
- Niente palestra o sport tra le cose personali raccontate sul sito (richiesta dell'utente, novembre 2026). Il progetto Muscle & Fitness resta: è lavoro.

## Evidence on Hand

- Progetti reali con schermate in public/projects/: Tripify (app Android a microservizi, in gruppo di quattro), Editor tracce CodeRunner (tesi, individuale, repo pubblico), GoldenStay (web app, in coppia, online), MoneyMind (web app, gruppo di quattro), Muscle & Fitness (sito con area soci, personale, online), WAVE.LY (app desktop JavaFX), ApKit4D (progetto R&D della magistrale in otto, per il Dipartimento di Fisica: mie la ricerca sulla GUI e la vista 3D veloce; schermate dell'app vera).
- Casi di studio con codice reale per Tripify, tesi, ApKit4D e GoldenStay (lib/casi-studio.ts). I tre progetti principali sono Tripify (racchiude la triennale), la tesi (con le funzioni AI via OpenRouter, versione 1.4.0) e ApKit4D (apre la magistrale).
- Percorso: magistrale (da ottobre 2026), triennale (prevista dicembre 2026), Servizio Civile Universale (set 2025 - set 2026), diploma scientifico 97/100.
- Lingue: italiano madrelingua, inglese B2.
- Assenti, da non inventare: foto personale, testimonianze, clienti, esperienze di lavoro retribuite, numeri di utenti.

## Product Principles

1. Il lavoro prima di tutto: un recruiter deve arrivare a un progetto vero in pochi secondi.
2. Mostrare, non dichiarare: codice reale, schermate reali, ruoli dichiarati con precisione.
3. Onestà sullo stato delle cose: ciò che è in corso è detto in corso.
4. Professionale ma memorabile: ogni dettaglio curato, nessun effetto che ostacoli la lettura.

## Accessibility & Inclusion

Contenuto leggibile senza animazioni (prefers-reduced-motion), navigabile da tastiera, contrasti adeguati su fondo chiaro e scuro.
