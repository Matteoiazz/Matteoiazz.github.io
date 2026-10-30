---
name: Matteo Iazzolino — Portfolio
description: Vetro scuro e cromo, con il fiore davanti al nome e le chicche del tabellone a palette.
colors:
  notte: "#0b0b0c"
  latte: "#f4f4f5"
  fumo: "#a1a1a1"
  lastra-alta: "#1a1a1c"
  lastra-bassa: "#111113"
  palco: "#121214"
  riga: "rgb(255 255 255 / 0.08)"
  riga-forte: "rgb(255 255 255 / 0.18)"
  vetro-luce: "rgb(255 255 255 / 0.12)"
  vetro-ombra: "rgb(255 255 255 / 0.04)"
typography:
  display:
    fontFamily: "Archivo, Geist, ui-sans-serif, sans-serif"
    fontSize: "adattata alla larghezza, fino a 30vw"
    fontWeight: 760
    lineHeight: 0.84
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 92"
  headline:
    fontFamily: "Archivo, Geist, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 80"
  title:
    fontFamily: "Archivo, Geist, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 2.3vw, 1.9rem)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
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
    fontFamily: "Archivo, ui-sans-serif, sans-serif"
    fontWeight: 600
    fontVariation: "'wdth' 78"
rounded:
  tessera: "3px"
  cornice: "12px"
  codice: "18px"
  lastra: "22px"
  palco: "26px"
  pillola: "9999px"
spacing:
  lati: "max(1.25rem, 4vw)"
  passo: "1.25rem"
  passo-largo: "1.5rem"
  capitolo: "6rem"
  capitolo-largo: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.latte}"
    textColor: "{colors.notte}"
    rounded: "{rounded.pillola}"
    padding: "12px 20px"
  button-glass:
    backgroundColor: "{colors.vetro-luce}"
    textColor: "{colors.latte}"
    rounded: "{rounded.pillola}"
    padding: "12px 20px"
  flap-tile:
    backgroundColor: "{colors.vetro-luce}"
    textColor: "{colors.latte}"
    typography: "{typography.flap}"
    rounded: "{rounded.tessera}"
    padding: "0.08em 0.12em"
  glass-card:
    backgroundColor: "{colors.lastra-alta}"
    textColor: "{colors.latte}"
    rounded: "{rounded.lastra}"
  chip-stack:
    textColor: "{colors.latte}"
    rounded: "{rounded.pillola}"
    padding: "4px 10px"
---

# Design System: Matteo Iazzolino — Portfolio

## Overview

**Creative North Star: "Il fiore sotto vetro"**

Una notte quasi nera, un solo oggetto, il fiore cromato, e tutto il resto come vetro che lo circonda. È il mondo del primo sito portato al massimo: il fiore, ritagliato con la sua stessa alfa, sta davanti al nome gigante come il soggetto davanti alla testata di una rivista; le superfici che galleggiano (la capsula in alto, il menu, la scheda, il cursore) sono vetro liquido che sfoca e illumina ciò che sta sotto; le parole dei capitoli sono nello stesso cromo del fiore. Ai bordi dello schermo il vetro si appanna: il contenuto che sale sotto la barra si sfoca per gradi.

Densità editoriale e impatto: pochi elementi per schermata, scala estrema tra le parole giganti e i dati in mono. Nessun colore: il cromo e il vetro bastano. Le chicche (tabellone a palette, binario orizzontale, Ctrl+K, contatore, matrice, contachilometri) vivono dentro questo materiale: le caselle del tabellone sono tessere di vetro, il menu è uno Spotlight di vetro.

Rifiuti confermati: niente fondo bianco con capitoli neri e griglia visibile (il linguaggio del sito di riferimento), niente colori d'accento, niente estetica da terminale.

**Key Characteristics:**
- Fondo notte unico; il ritmo lo danno il fiore, il vetro e la nebbia ai bordi.
- Il fiore ritagliato davanti al nome, che emerge da una sfocatura e si allarga sotto il puntatore.
- Vetro vero solo su ciò che galleggia; vetro piatto con la luce del cursore su card e tabelloni.
- Cromo solo sulle parole giganti dei capitoli e sulla firma finale.
- Pillole per le azioni, lastre arrotondate per i contenitori.

## Colors

Una notte, un latte e i grigi del vetro: niente tinte.

### Primary
- **Latte** (latte): testo principale, pulsante principale a pillola, la riga del tabellone sotto il puntatore, il blocco della propria parte negli schemi.

### Neutral
- **Notte** (notte): il fondo di tutta la pagina e il testo sui pulsanti chiari.
- **Fumo** (fumo): testo secondario sulla notte (contrasto circa 7.5:1).
- **Lastra alta e lastra bassa** (lastra-alta, lastra-bassa): le due estremità del gradiente del vetro piatto.
- **Palco** (palco): il fondo dietro le schermate e nelle anteprime.
- **Riga e riga forte** (riga, riga-forte): filetti e separatori.
- **Vetro luce e vetro ombra** (vetro-luce, vetro-ombra): il gradiente del vetro vero e delle pillole di vetro.

### Named Rules
**The Una Notte Rule.** Esiste un solo fondo. Le sezioni non si alternano di colore: si separano con lo spazio, il vetro e la nebbia.

**The Niente Tinta Rule.** Nessun colore d'accento. La luce è bianca: nel cromo, nei riflessi del vetro, nella luce del cursore.

## Typography

**Display Font:** Archivo variabile, assi larghezza e peso (con fallback Geist)
**Body Font:** Geist (con fallback ui-sans-serif, system-ui)
**Label/Mono Font:** Geist Mono

**Character:** Archivo dà l'impatto e l'effetto vivo (le lettere si allargano e si appesantiscono sotto il puntatore); Geist, il carattere del primo sito, tiene il testo pulito e leggibile. Il mono resta ai dati.

### Hierarchy
- **Display** (760→900, adattato alla larghezza con un tetto tra 20 e 30vw, interlinea 0.84): il nome in apertura (latte), le parole dei capitoli (cromo), i titoli dei casi di studio (cromo).
- **Headline** (800, clamp(2.6rem, 7vw, 7rem), 0.88, larghezza 80): titoli di sezione e dei progetti.
- **Title** (700, clamp(1.5rem, 2.6vw, 2.25rem), 1.05): voci del percorso, titoli delle schede.
- **Lead** (Geist 500, clamp(1.3rem, 2.3vw, 1.9rem), 1.3): manifesto e riassunti.
- **Body** (Geist 400, 1.05rem, 1.625, massimo 65ch): descrizioni e capitoli.
- **Label** (Geist Mono 400, 0.75rem, 0.02em, cifre tabellari): ore, anni, conteggi, file.

### Named Rules
**The Cromo Dei Capitoli Rule.** Il cromo è il materiale del fiore e compare sulle lettere solo nelle parole giganti dei capitoli, nei titoli dei casi di studio e nella firma finale. Mai su testo corrente, numeri o pulsanti. È l'unico testo a gradiente del sito, ed è voluto.

**The Mono Solo Dati Rule.** Il monospazio compare solo su dati misurabili o codice. Una frase in mono è un costume.

## Layout

Contenitore a tutta larghezza con margini laterali max(1.25rem, 4vw); 12 colonne con spazio di 1.5rem (4 colonne e 1.25rem sotto i 48rem). La griglia non si vede: compare solo in modalità progettista (codice Konami). Capitoli con 6rem di respiro verticale (8rem da 48rem). In apertura il fiore è ancorato al blocco del nome, non allo schermo: su desktop al centro destra sopra le due righe, sul telefono sopra il nome con i petali bassi sulla cima di MATTEO. I progetti in evidenza scorrono su un binario orizzontale bloccato; sotto i 48rem o con il movimento ridotto diventano una colonna. La nebbia occupa il 28% alto e il 14% basso dello schermo.

## Elevation & Depth

Profondità a strati, come vetro sopra la notte. Il vetro vero (sfocatura di ciò che sta sotto, riflesso in alto, ombra morbida) è riservato a ciò che galleggia: capsula, menu dei comandi, scheda, cursore a lente, avvisi. Le superfici grandi e numerose sono vetro piatto: gradiente tra due lastre, filo di luce in alto, ombra profonda, e la luce del cursore che le attraversa. Il fiore ha la sua ombra portata, che lo stacca dalle lettere.

### Shadow Vocabulary
- **Vetro sospeso** (`box-shadow: inset 0 1px 0 0 rgb(255 255 255 / 0.3), inset 0 -1px 0 0 rgb(255 255 255 / 0.05), 0 12px 40px -12px rgb(0 0 0 / 0.65)`): capsula e pillole di vetro.
- **Lastra** (`box-shadow: inset 0 1px 0 0 rgb(255 255 255 / 0.16), 0 18px 50px -24px rgb(0 0 0 / 0.8)`): card, tabellone, matrice, blocchi di codice.
- **Scheda** (`box-shadow: inset 0 1px 0 0 rgb(255 255 255 / 0.22), 0 40px 120px -20px rgb(0 0 0 / 0.85)`): scheda di dettaglio e menu.
- **Ombra del fiore** (`filter: drop-shadow(0 40px 60px rgb(0 0 0 / 0.75)) drop-shadow(0 6px 14px rgb(0 0 0 / 0.6))`): solo il fiore.

### Named Rules
**The Vetro Che Galleggia Rule.** Il vetro vero (backdrop-filter) solo su elementi piccoli e sospesi, più la nebbia ai bordi. Tutto ciò che è grande o ripetuto usa il vetro piatto: costa niente e sul nero non si distingue.

## Shapes

Forme morbide e pulite: lastre arrotondate a 22px (palchi delle schermate 26px, codice 18px, cornici delle finestre 12px), pillole per ogni azione e per le voci dello stack, tessere del tabellone a 3px. Filetti di 1px. Il fiore è l'unica forma organica, ed è un ritaglio vero, non una maschera geometrica.

## Components

### Buttons
Pillole: piene per l'azione principale, di vetro per le altre.
- **Shape:** pillola (9999px).
- **Primary:** latte pieno, testo notte, 12px × 20px, freccia disegnata (Lucide) che si sposta di 2px al passaggio.
- **Glass:** gradiente vetro-luce → vetro-ombra, filo 1px bianco al 16%, riflesso in alto; al passaggio si schiarisce.
- **Email da copiare:** grande pillola latte con un alone chiaro, attirata dal puntatore; un clic copia e mostra l'avviso.

### Chips
- **Style:** pillola con filo riga-forte, testo latte 0.75rem con l'icona della tecnologia.

### Cards / Containers
- **Corner Style:** 22px.
- **Background:** vetro piatto (lastra-alta → lastra-bassa) con la luce del cursore e un filo di luce che corre sul bordo.
- **Shadow Strategy:** lastra (vedi Elevation & Depth).
- **Internal Padding:** 24px per le card, righe da 16–20px nel tabellone.

### Inputs / Fields
- **Style:** la ricerca del menu dei comandi: testo grande su vetro, separato da un filetto.
- **Focus:** contorno 2px latte a 3px di distanza.

### Navigation
- **Style:** capsula di vetro sospesa al centro in alto, che si stringe scorrendo: monogramma MI in un cerchio latte, nome, sezioni che si decifrano al passaggio, ora di Cosenza, IT/EN e la pillola latte "Menu" con Ctrl K.

### Tabellone a palette
Tessere di vetro (bianco al 9% con riflesso in alto e taglio scuro a metà), Archivo condensato maiuscolo; cambiando testo ogni tessera gira su caratteri a caso prima di fermarsi. Nel tabellone dei progetti la riga sotto il puntatore diventa latte e le sue tessere notte.

### Nome che emerge
Parola display le cui lettere salgono da una sfocatura in sequenza (all'arrivo in apertura, all'entrata in vista altrove) e si allargano sotto il puntatore. In latte per il nome, in cromo per i capitoli.

### Nebbia
Due lastre fisse ai bordi dello schermo con sfocatura progressiva a tre livelli: il contenuto si appanna salendo sotto la barra.

### Cursore a lente
Un piccolo cerchio di vetro che schiarisce e mette a fuoco ciò che ha sotto; sui link si allarga, sugli elementi con un'azione diventa una pillola latte con la parola ("Apri", "Copia", "Leggi").

## Do's and Don'ts

### Do:
- **Do** tenere un solo fondo notte e separare le sezioni con spazio, vetro e nebbia.
- **Do** usare il vetro vero solo su ciò che galleggia ed è piccolo.
- **Do** dare a ogni azione la forma di una pillola: latte per la principale, vetro per le altre.
- **Do** mostrare le schermate in bianco e nero e ridare il colore al passaggio.
- **Do** rispettare il movimento ridotto: niente ingresso, nebbia o sfocature, lettere subito a fuoco.

### Don't:
- **Don't** tornare al fondo bianco con capitoli neri e griglia visibile.
- **Don't** introdurre colori d'accento.
- **Don't** usare il cromo su testo corrente, numeri o pulsanti.
- **Don't** mettere etichette o occhielli sopra i titoli.
- **Don't** scrivere frasi in monospazio.
