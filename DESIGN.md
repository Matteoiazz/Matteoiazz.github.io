---
name: Matteo Iazzolino — Portfolio
description: Specimen tipografico in bianco e nero su una griglia di costruzione visibile, con tabellone a palette.
colors:
  carta: "#ffffff"
  inchiostro: "#0b0b0b"
  grafite: "#5f5f5f"
  nebbia: "#a3a3a3"
  lastra: "#1d1d1d"
  schermo: "#151515"
  riga: "rgb(11 11 11 / 0.08)"
  riga-forte: "rgb(11 11 11 / 0.2)"
  riga-notte: "rgb(255 255 255 / 0.09)"
  riga-notte-forte: "rgb(255 255 255 / 0.24)"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "adattata alla larghezza, fino a 30vw"
    fontWeight: 760
    lineHeight: 0.82
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 92"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 80"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 2.3vw, 1.9rem)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.02em"
    fontFeature: "'tnum'"
  flap:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 600
    fontVariation: "'wdth' 78"
rounded:
  square: "0px"
  hair: "2px"
  dot: "9999px"
spacing:
  lati: "max(1.25rem, 4vw)"
  passo: "1.25rem"
  passo-largo: "1.5rem"
  capitolo: "6rem"
  capitolo-largo: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.inchiostro}"
    textColor: "{colors.carta}"
    rounded: "{rounded.square}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.carta}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.square}"
    padding: "12px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.inchiostro}"
    textColor: "{colors.carta}"
  flap-tile:
    backgroundColor: "{colors.inchiostro}"
    textColor: "{colors.carta}"
    typography: "{typography.flap}"
    rounded: "{rounded.square}"
    padding: "0.08em 0.12em"
  flap-tile-board:
    backgroundColor: "{colors.lastra}"
    textColor: "{colors.carta}"
    typography: "{typography.flap}"
    rounded: "{rounded.square}"
  chip-stack:
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.square}"
    padding: "4px 10px"
---

# Design System: Matteo Iazzolino — Portfolio

## Overview

**Creative North Star: "Lo specimen a griglia"**

Il sito è un foglio di prova tipografico, nella tradizione dei manifesti di Wim Crouwel: carta bianca, inchiostro nero e una griglia di costruzione a dodici colonne che resta visibile come parte del disegno. Il nome si compone cella per cella sulla griglia e risponde al puntatore allargandosi sugli assi della variabile; i capitoli si alternano bianchi e neri, e il passaggio avviene colonna per colonna. La firma secondaria è il tabellone a palette delle stazioni italiane (Solari): righe che girano carattere per carattere per il ruolo, i progetti, i numeri e il saluto finale.

Densità editoriale: pochi elementi per schermata, molto spazio, scala tipografica estrema (dal corpo dati in mono a parole che riempiono la larghezza). Tutto il colore è assente per scelta: il contrasto lo fanno peso, larghezza e il ribaltamento dei capitoli. Le schermate dei progetti entrano in bianco e nero e tornano a colori solo al passaggio del mouse.

Rifiuti confermati: niente colori d'accento, niente portfolio scuro con card e luci al neon, niente estetica da terminale, niente copia dei siti di riferimento (darioelia.it, lorenzoiaccino.it) da cui il progetto prende solo ambizione e pulizia.

**Key Characteristics:**
- Griglia di costruzione a 12 colonne (4 sul telefono) disegnata in ogni capitolo.
- Capitoli alternati carta/inchiostro, con bande di passaggio a colonne.
- Archivio variabile su larghezza e peso per tutta la tipografia; Geist Mono solo per i dati.
- Tabellone a palette come linguaggio dei dati che cambiano.
- Angoli vivi, nessuna ombra, nessun colore.

## Colors

Due soli valori pieni, carta e inchiostro, più i grigi che servono a leggere su ciascuno dei due fondi.

### Primary
- **Inchiostro** (inchiostro): il testo sul foglio chiaro, il fondo dei capitoli scuri, i pulsanti principali, le caselle del tabellone su fondo chiaro, la data della voce attiva nel percorso.

### Neutral
- **Carta** (carta): il fondo dei capitoli chiari e il testo dei capitoli scuri.
- **Grafite** (grafite): testo secondario su carta (contrasto 6.4:1).
- **Nebbia** (nebbia): testo secondario su inchiostro (contrasto circa 8:1).
- **Lastra** (lastra): le caselle del tabellone su fondo nero, un gradino sopra l'inchiostro.
- **Schermo** (schermo): il palco dietro le schermate dei progetti sui fondi neri.
- **Riga e Riga forte** (riga, riga-forte; riga-notte, riga-notte-forte sul nero): colonne della griglia, filetti e separatori.

### Named Rules
**The Due Inchiostri Rule.** Esistono solo carta e inchiostro. Nessun accento, nessuna sfumatura colorata: un grigio esiste solo per far leggere un testo secondario.

**The Capitolo Rovesciato Rule.** Un capitolo è chiaro o scuro per intero (classi .chiaro / .scuro): i ruoli dei colori si scambiano a livello di capitolo, mai per singolo elemento.

## Typography

**Display Font:** Archivo variabile, assi larghezza (62–125) e peso (con fallback ui-sans-serif, system-ui)
**Body Font:** Archivo variabile
**Label/Mono Font:** Geist Mono (con fallback ui-monospace)

**Character:** un grottesco con l'asse della larghezza fa da strumento espressivo: le parole giganti stanno a riposo strette (larghezza 92, peso 760) e si allargano fino a 125 sotto il puntatore; i titoli usano versioni condensate (78–82) per stare alti e compatti. Il mono è riservato a ore, anni, conteggi, coordinate e percorsi di file.

### Hierarchy
- **Display** (760→900, adattato perché la riga più lunga riempia la larghezza, tetto 20–30vw, interlinea 0.82): il nome in apertura, le parole dei capitoli (CHI SONO, PERCORSO, SCRIVIMI), i titoli dei casi di studio.
- **Headline** (800, clamp(2.6rem, 7vw, 7rem), 0.88, larghezza 80): titoli di sezione e dei progetti in evidenza.
- **Title** (700, clamp(1.5rem, 2.6vw, 2.25rem), 1.05): voci del percorso, titoli delle schede.
- **Lead** (500, clamp(1.3rem, 2.3vw, 1.9rem), 1.3): manifesto e riassunti dei casi di studio.
- **Body** (400, 1.05rem, 1.625, massimo 65ch): descrizioni e capitoli.
- **Label** (Geist Mono 400, 0.75rem, 0.02em, cifre tabellari): dati, intestazioni del tabellone, legende.

### Named Rules
**The Mono Solo Dati Rule.** Il monospazio compare solo su dati misurabili o codice. Una frase in mono è un costume: va in Archivio.

**The Parola Che Riempie Rule.** Una parola display si misura e si adatta alla larghezza del contenitore, con un tetto in vw perché le parole corte non diventino alte mezza pagina.

## Layout

Contenitore a tutta larghezza con margini laterali max(1.25rem, 4vw). Griglia di 12 colonne con spazio tra colonne di 1.5rem (4 colonne e 1.25rem sotto i 48rem): la stessa griglia è disegnata sul fondo di ogni capitolo e regge il contenuto (testi a 7 colonne, colonne laterali a 4 partendo dalla 9). I capitoli hanno 6rem di respiro verticale (8rem da 48rem in su). I progetti in evidenza scorrono su un binario orizzontale bloccato: la sezione è alta quanto il binario è lungo, così la velocità è quella dello scroll; sotto i 48rem o con il movimento ridotto il binario diventa una colonna. Le colonne laterali fisse (indice dei casi di studio, anno del percorso) restano agganciate a 6–7rem dall'alto.

## Elevation & Depth

Sistema piatto: la profondità viene dal ribaltamento carta/inchiostro, non dalle ombre. L'unica ombra è quella dell'anteprima che segue il puntatore nel tabellone dei progetti, perché galleggia sopra le righe; gli avvisi in basso si staccano con un filo chiaro, non con un'ombra.

### Shadow Vocabulary
- **Anteprima sospesa** (`box-shadow: 0 24px 60px -20px rgb(0 0 0 / 0.6)`): solo l'anteprima della copertina nel tabellone.

### Named Rules
**The Foglio Piatto Rule.** Nessuna superficie è sollevata a riposo. Se un elemento deve staccarsi, si inverte di colore.

## Shapes

Angoli vivi ovunque (0px); 2px al massimo per la cornice della finestra nelle schermate e per le pastiglie del curriculum. Le uniche forme tonde sono i punti di stato (disponibilità, stato dei progetti, matrice delle competenze) e le cornici dei telefoni, che rappresentano un oggetto fisico. Filetti di 1px per separare; nessun bordo laterale più spesso di 1px.

## Components

### Buttons
Netti e tipografici: un rettangolo pieno o un rettangolo a filo, niente arrotondamenti.
- **Shape:** angoli vivi (0px).
- **Primary:** inchiostro pieno, testo carta, 12px × 20px, testo 0.875rem 500, freccia disegnata (Lucide) che si sposta di 2px al passaggio.
- **Secondary:** filo di 1px inchiostro su carta; al passaggio si riempie di inchiostro e il testo diventa carta. Sui capitoli scuri i ruoli si scambiano.
- **Email da copiare:** pulsante inchiostro grande che si sposta verso il puntatore (calamita), copia l'indirizzo e mostra l'avviso "Email copiata".

### Chips
- **Style:** filo di 1px riga-forte, testo inchiostro 0.75rem con l'icona della tecnologia, angoli vivi.
- **State:** solo informativi, non selezionabili.

### Cards / Containers
- **Corner Style:** vivi (0px).
- **Background:** nessuna card a riposo: i contenitori sono capitoli interi, righe separate da filetti o la lastra nera del tabellone.
- **Shadow Strategy:** nessuna (vedi Elevation & Depth).
- **Border:** filetti di 1px.
- **Internal Padding:** righe da 1–1.25rem in verticale; scheda di dettaglio 24–32px.

### Inputs / Fields
- **Style:** il solo campo è la ricerca del menu comandi: testo grande senza bordo su carta, separato da un filetto inchiostro.
- **Focus:** il cursore di testo è inchiostro; il contorno di focus globale è 2px inchiostro con 3px di distanza.

### Navigation
- **Style:** barra fissa in alto in inversione di colore (mix-blend-mode: difference): si legge sul bianco e sul nero. Nome a sinistra, quattro sezioni al centro, ora di Cosenza, IT/EN e Menu (Ctrl K) a destra. Al passaggio le voci "si decifrano" lettera per lettera; sul telefono restano nome, lingua e Menu, che apre il menu dei comandi.

### Tabellone a palette
Il componente firma. Caselle di Archivio condensato maiuscolo, una per carattere, con una riga di taglio a metà; cambiando testo ogni casella gira su caratteri a caso prima di fermarsi, in sequenza. Su carta le caselle sono inchiostro; sul nero sono lastra. Usato per il ruolo in apertura, i nomi dei progetti nel tabellone, i numeri dei casi di studio e il saluto finale. Lo screen reader legge la frase vera.

### Nome a celle
Parola display coperta da una griglia di celle del colore del fondo che si ritirano in ordine casuale: si costruisce all'arrivo (in apertura alla fine dell'ingresso, altrove quando entra in vista). Sotto il puntatore le lettere vicine si allargano e si appesantiscono.

## Do's and Don'ts

### Do:
- **Do** alternare i capitoli carta e inchiostro e passare dall'uno all'altro con la banda a colonne.
- **Do** allineare ogni contenuto alle 12 colonne della griglia disegnata (4 sul telefono).
- **Do** usare il tabellone a palette per i dati che cambiano o che vanno letti come informazione di stato.
- **Do** mostrare le schermate dei progetti in bianco e nero e ridare il colore solo al passaggio.
- **Do** rispettare il movimento ridotto: niente ingresso, niente celle, binario in colonna, palette ferme.

### Don't:
- **Don't** introdurre un colore d'accento o sfumature colorate.
- **Don't** arrotondare gli angoli oltre 2px né aggiungere ombre alle superfici.
- **Don't** mettere etichette o occhielli sopra i titoli: la posizione e il tipo vanno sotto il titolo o dentro la riga del titolo.
- **Don't** scrivere frasi in monospazio.
- **Don't** sbiadire testo leggibile per segnare uno stato: la voce attiva si segna in negativo.
