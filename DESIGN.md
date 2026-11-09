---
name: Matteo Iazzolino — Portfolio
description: Un foglio bianco con un solo carattere, una voce grigia, le schermate vere dei progetti e una chiusura in nero.
colors:
  carta: "#ffffff"
  inchiostro: "#0a0a0a"
  grigio: "#737373"
  riga: "#e8e8e8"
  riga-forte: "#cfcfcf"
  palco: "#f4f4f4"
  latte: "#f5f5f5"
  grigio-notte: "#8c8c8c"
  riga-notte: "rgb(255 255 255 / 0.13)"
  riga-forte-notte: "rgb(255 255 255 / 0.3)"
  pillola-hover: "#3b3b3b"
typography:
  display-nome:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "adattata alla larghezza del contenitore (circa 9vw)"
    fontWeight: 600
    lineHeight: 0.8
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 100 a riposo, da 82 a 125 sotto il puntatore"
  display-progetto:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1rem + 6vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.2rem + 4.2vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 1.3rem + 2.8vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.032em"
  subtitle:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 1rem + 0.9vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.022em"
  voce-indice:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 0.9rem + 0.9vw, 1.65rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.022em"
    fontVariation: "'wdth' 100, 112 sotto il puntatore"
  email:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 0.9rem + 1.7vw, 2.25rem)"
    fontWeight: 500
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 0.95rem + 0.55vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.012em"
  voce:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 500
    letterSpacing: "-0.01em"
  numero:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.015em"
    fontFeature: "'tnum'"
  body-largo:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  scheda:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
  controllo:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1
  navigazione:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
  controllo-piccolo:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
  meta:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  codice:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.7
  etichetta:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  pillola: "9999px"
  menu: "16px"
  palco: "14px"
  blocco: "12px"
  finestra: "10px"
  miniatura: "6px"
  telefono: "1.35rem"
spacing:
  lati: "clamp(1.125rem, 3.4vw, 3.5rem)"
  passo: "1.25rem"
  passo-largo: "1.5rem"
  capitolo: "7rem"
  capitolo-largo: "10rem"
  contenitore: "104rem"
components:
  button-primary:
    backgroundColor: "{colors.inchiostro}"
    textColor: "{colors.carta}"
    typography: "{typography.controllo}"
    rounded: "{rounded.pillola}"
    padding: "0.65rem 1.25rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.pillola-hover}"
    textColor: "{colors.carta}"
  button-filo:
    textColor: "{colors.inchiostro}"
    typography: "{typography.controllo}"
    rounded: "{rounded.pillola}"
    padding: "0.65rem 1.25rem"
    height: "2.75rem"
  chip-tecnologia:
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.pillola}"
    padding: "0.375rem 0.75rem 0.375rem 0.625rem"
  chip-tecnologia-accesa:
    backgroundColor: "{colors.inchiostro}"
    textColor: "{colors.carta}"
    rounded: "{rounded.pillola}"
  palco:
    backgroundColor: "{colors.palco}"
    rounded: "{rounded.palco}"
  barra:
    backgroundColor: "{colors.carta}"
    textColor: "{colors.inchiostro}"
    height: "4rem"
  riga-indice:
    textColor: "{colors.inchiostro}"
    typography: "{typography.voce-indice}"
    padding: "1.75rem 0"
  tessera-logo:
    backgroundColor: "{colors.palco}"
    rounded: "{rounded.blocco}"
    size: "64px"
  etichetta-cursore:
    backgroundColor: "{colors.inchiostro}"
    textColor: "{colors.carta}"
    typography: "{typography.etichetta}"
    rounded: "{rounded.pillola}"
    padding: "0.375rem 0.75rem"
---

# Design System: Matteo Iazzolino — Portfolio

## Overview

**Creative North Star: "Il foglio bianco"**

Una pagina bianca tenuta come un buon curriculum stampato: un solo carattere, l'inchiostro e una sola voce grigia, filetti sottili, molto spazio tra un capitolo e l'altro. La pulizia viene dalla rinuncia: niente vetro, niente cromo sul testo, niente colori. Ogni titolo parla a due voci, l'inchiostro dice cosa, il grigio aggiunge il resto, ed è questa la firma tipografica del sito.

Il lavoro sta davanti: già nella prima schermata le schermate vere dei progetti si affacciano sotto la frase che apre con il nome. Le immagini sono quelle schermate, i loghi delle istituzioni nel percorso e, da 90rem in su, il disegno tecnico degli strati accanto al titolo (database, server, interfaccia, rete neurale): tratto nero sottile su fondo trasparente. La casa si legge come una storia: lo scorrimento è lento e le scene si fermano finché non sono state lette. Il prologo si accende una parola alla volta, quattro capitoli costruiscono il disegno degli strati dal database all'AI, i progetti scorrono di lato; aprendone uno, la copertina diventa la testata della sua pagina. In fondo la pagina si rovescia in nero e chiude con il nome a tutta larghezza.

Rifiuti confermati: vetro liquido e vetro scuro con cromo, il fiore cromato, tabellone a palette e griglia a vista dello specimen in bianco e nero, etichette numerate sopra le sezioni, prezzi da freelance.

**Key Characteristics:**
- Fondo bianco unico, con un solo capitolo nero in chiusura.
- Titoli a due voci: inchiostro e un grigio, mai un terzo tono.
- Mona Sans per tutto; l'asse della larghezza solo sotto il puntatore.
- Le schermate vere come immagini, in bianco e nero in casa e a colori al passaggio.
- Un solo disegno, quello degli strati accanto al titolo; oltre a lui, schermate e loghi del percorso.

## Colors

Inchiostro su carta, una voce grigia e i grigi chiarissimi dei filetti e dei palchi: niente tinte.

### Primary
- **Inchiostro** (inchiostro): tutto il testo principale, il pulsante pieno, la tecnologia accesa nello stack, i blocchi della propria parte negli schemi, la riga di lettura dei casi di studio, il fondo del capitolo nero.

### Neutral
- **Carta** (carta): il fondo della pagina, il testo sui pulsanti pieni e sulle etichette nere.
- **Grigio** (grigio): la seconda voce di ogni titolo, i dati secondari (tipo, squadra, anno), le didascalie; contrasto 4.7:1 sul bianco.
- **Riga e riga forte** (riga, riga-forte): i filetti tra le righe di indice, tabelle e percorso; il filo dei pulsanti e delle chip.
- **Palco** (palco): il grigio chiarissimo dietro ogni schermata e dietro i blocchi di codice.
- **Latte, grigio notte, righe notte** (latte, grigio-notte, riga-notte, riga-forte-notte): gli stessi ruoli dentro il capitolo nero, dove testo e filetti si rovesciano; grigio notte a 5.9:1 sul nero.

### Named Rules
**The Una Voce Grigia Rule.** Esiste un solo grigio per il testo. Dove serve distinguere, si cambia peso, corpo o posizione, non si aggiunge un altro tono.

**The Un Solo Capitolo Nero Rule.** Il nero pieno è riservato alla chiusura (contatti e nome). Il resto della pagina è carta; un secondo capitolo nero toglierebbe peso al finale.

**The Lavoro In Bianco E Nero Rule.** In casa le schermate dei progetti e i loghi del percorso sono in scala di grigi e prendono colore al passaggio del mouse (sui telefoni quando arrivano al centro dello schermo). Nelle pagine dei progetti le schermate sono sempre a colori: lì il colore è il progetto.

## Typography

**Display Font:** Mona Sans variabile, assi larghezza e peso (con fallback ui-sans-serif, system-ui)
**Body Font:** Mona Sans
**Label/Mono Font:** Geist Mono, solo dentro i blocchi di codice

**Character:** Un grottesco unico, quello di GitHub, dove vive il codice dei progetti: pulito e professionale a riposo, espressivo solo quando l'asse della larghezza entra in gioco sotto il puntatore.

### Hierarchy
- **Display nome** (600, adattato alla larghezza del contenitore, interlinea 0.8): il nome in maiuscolo a tutta larghezza nel capitolo nero.
- **Display progetto** (500, clamp(2.75rem, 1rem + 6vw, 6rem), 0.98): il titolo in testa alla pagina di un progetto.
- **Headline** (500, clamp(2.5rem, 1.2rem + 4.2vw, 4.75rem), 1.02): la frase d'apertura a due voci, l'invito della chiusura, il titolo del progetto successivo.
- **Title** (500, clamp(2.1rem, 1.3rem + 2.8vw, 3.5rem), 1.04): i titoli di capitolo a due voci (Progetti, Chi sono, Stack, Percorso) e quelli dei capitoli dei casi di studio.
- **Subtitle** (500, clamp(1.3rem, 1rem + 0.9vw, 1.75rem), 1.12): le voci del percorso.
- **Voce indice** (500, clamp(1.3rem, 0.9rem + 0.9vw, 1.65rem)): i titoli dell'indice dei progetti, che si allargano sotto il puntatore.
- **Lead** (400, clamp(1.125rem, 0.95rem + 0.55vw, 1.4rem), 1.5): presentazioni e riassunti, massimo 46 caratteri per riga in apertura.
- **Body** (400, 1rem e 1.05rem, 1.6): descrizioni e capitoli, massimo 65 caratteri per riga.
- **Meta, navigazione e controlli** (0.875rem, 0.9rem, 0.9375rem): dati secondari, voci della barra, testo dei pulsanti.
- **Codice** (Geist Mono 400, 0.8rem, 1.7): solo gli estratti dai repository.

### Named Rules
**The Due Voci Rule.** Ogni titolo di capitolo è una frase in due parti: la parola in inchiostro, il resto in grigio. Niente occhielli o numeri sopra il titolo: il titolo basta.

**The Larghezza Che Si Guadagna Rule.** L'asse della larghezza si muove solo come risposta al puntatore (titoli dell'indice, nome finale). A riposo tutto sta a larghezza 100.

**The Mono Solo Codice Rule.** Il monospazio compare solo dentro i blocchi di codice. Anni, ore e numeri usano le cifre tabellari di Mona Sans.

## Layout

Contenitore largo fino a 104rem, centrato, con margini laterali clamp(1.125rem, 3.4vw, 3.5rem). Griglia di 12 colonne da 48rem in su (4 sotto), con spazio di 1.5rem (1.25rem sotto i 48rem). I capitoli respirano 7rem sopra (10rem da 48rem), sempre più spazio sopra un titolo che sotto. I titoli di capitolo occupano le prime otto colonne; la frase di servizio sta a destra, allineata alla base del titolo.

In apertura la frase occupa circa otto colonne; da 64rem in su le due azioni stanno a sinistra e la presentazione a destra (colonne 8-12), da 90rem il testo prende nove colonne e il disegno degli strati le ultime tre. Le tre copertine principali si affacciano prima della piega, con larghezze diverse (3, 5 e 4 colonne): stretto per i telefoni, largo per le finestre.

Dopo l'apertura la pagina è una sequenza di scene. Il prologo è alto 240svh con la frase ferma al centro (sticky) per 140svh di scorrimento. I cinque capitoli sono alti almeno uno schermo ciascuno, con il racconto nelle colonne 1-7 e, da 64rem, il disegno degli strati fermo nelle colonne 8-12; sotto quella misura ogni capitolo porta il suo disegno piccolo (8rem). Il binario dei progetti è alto uno schermo più la sua corsa orizzontale: la sezione si ferma e le carte (fino a 30rem) scorrono di lato, partendo allineate al contenuto. Con il movimento ridotto le scene non si fermano: la frase è subito a fuoco e il binario si scorre a mano.

## Elevation & Depth

Il sito è piatto: la profondità la danno lo spazio, i filetti e il grigio dei palchi. Le ombre esistono solo su ciò che è un oggetto sollevato dalla pagina: le cornici delle schermate, l'anteprima che segue il puntatore, il menu dei comandi, l'avviso in basso. Mai un filo e un'ombra sullo stesso elemento.

### Shadow Vocabulary
- **Finestra** (`box-shadow: 0 1px 3px rgb(0 0 0 / 0.08), 0 28px 50px -28px rgb(0 0 0 / 0.4)`): la cornice delle app web e desktop sul palco.
- **Telefono** (`box-shadow: 0 2px 4px rgb(0 0 0 / 0.08), 0 24px 40px -22px rgb(0 0 0 / 0.45)`): la cornice delle app mobile.
- **Anteprima** (`box-shadow: 0 2px 6px rgb(0 0 0 / 0.06), 0 30px 60px -24px rgb(0 0 0 / 0.35)`): il palco che segue il puntatore nell'indice.
- **Menu** (`box-shadow: 0 2px 6px rgb(0 0 0 / 0.06), 0 40px 90px -30px rgb(0 0 0 / 0.4)`): il menu dei comandi, sopra un velo nero al 30%.

### Named Rules
**The Ombra Solo Sugli Oggetti Rule.** Card, righe e tabelle non hanno ombra né riquadro: si separano con un filetto di 1px. L'ombra è il segno che qualcosa si è staccato dalla carta.

## Shapes

Forme morbide ma asciutte: palchi delle schermate e blocchi di codice a 14px, menu a 16px, blocchi degli schemi e tessere dei loghi a 12px, cornici delle finestre a 10px, miniature a 6px. Pillole per ogni azione e per le chip dello stack. Filetti di 1px. Nessuna forma organica o decorativa: le forme sono quelle delle schermate e dei loghi.

## Components

### Buttons
Pillole basse e precise.
- **Shape:** pillola (9999px), alta 2.75rem.
- **Primary:** inchiostro pieno, testo carta, 0.65rem × 1.25rem, freccia Lucide che si sposta di 2px nella sua direzione al passaggio.
- **Hover / Focus:** il pieno si schiarisce al grigio scuro; il focus è un contorno di 2px in inchiostro a 3px di distanza.
- **Filo:** testo inchiostro con un filo interno di 1px riga forte, che diventa inchiostro al passaggio.

### Chips
- **Style:** le tecnologie dello stack: pillola con filo riga forte, icona del marchio, nome e numero di progetti in grigio (o "corso" se viene dai corsi).
- **State:** accesa in inchiostro pieno quando è scelta o quando appartiene al progetto scelto; spenta in grigio con il filo leggero.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** palco (#f4f4f4) con la schermata nella sua cornice.
- **Shadow Strategy:** nessuna sul palco; l'ombra sta sulla cornice (vedi Elevation & Depth).
- **Border:** nessuno.
- **Internal Padding:** la schermata sta a circa il 9% dai bordi del palco.

### Inputs / Fields
- **Style:** la ricerca del menu dei comandi: testo grande senza riquadro, separato da un filetto.
- **Focus:** il cursore di testo in inchiostro; il contorno del focus come per i pulsanti.

### Navigation
- **Style:** barra bianca alta 4rem con il nome a sinistra, le sezioni in grigio a destra (quella in corso in inchiostro), IT/EN e la pillola Menu con la scorciatoia. Scendendo si nasconde, risalendo torna; appena la pagina si muove compare un filetto sotto. Sui telefoni restano nome, lingua e Menu, che apre il menu dei comandi.

### Prologo
La frase che apre la storia, in Mona Sans 500 a clamp(1.75rem, 1rem + 2.6vw, 3.25rem), ferma al centro dello schermo: ogni parola parte al 16% di opacità e arriva all'inchiostro nel suo tratto di scorrimento, in ordine. Per andare avanti bisogna leggerla.

### Strati della storia
Il disegno degli strati con un velo color carta per fascia (AI, interfaccia, server, database): lo strato del capitolo in lettura è acceso, quelli già raccontati restano al 45%, quelli da raccontare al 10%. Lo stack si costruisce dal basso; nell'ultimo capitolo è tutto acceso. Accanto, i nomi degli strati con il filetto che si allunga su quello attivo.

### Tappe
Le date dei capitoli (diploma, triennale, magistrale, servizio civile) in righe con filetto: il logo ufficiale dell'istituzione in una tessera palco a 12px (48px), in scala di grigi e a colori al passaggio sulla riga, la data in grigio con le cifre tabellari e il titolo in inchiostro.

### Binario dei progetti
Le carte dei sette progetti: palco con la schermata, titolo con la sottolineatura che si disegna, tipo, squadra, anno, "caso di studio" dove c'è e una riga di presentazione in grigio. Sotto il binario un filetto si riempie d'inchiostro man mano che si va avanti. Al clic la copertina diventa la testata della pagina del progetto.

### Etichetta del cursore
Una piccola pillola inchiostro con la parola dell'azione ("Apri", "Copia") che accompagna il puntatore sopra copertine ed email; sul capitolo nero si rovescia bianca. Il puntatore resta quello del sistema.

## Do's and Don'ts

### Do:
- **Do** tenere ogni titolo di capitolo a due voci, inchiostro e grigio (#737373).
- **Do** mostrare i progetti con le loro schermate vere dentro la cornice giusta (telefono, finestra, browser) su un palco a 14px.
- **Do** separare righe, tabelle e capitoli con filetti di 1px e spazio, non con riquadri.
- **Do** usare l'asse della larghezza di Mona Sans solo come risposta al puntatore.
- **Do** rispettare il movimento ridotto: niente ingresso, scorrimento lento, scene ferme o transizioni, tutto subito visibile.
- **Do** calcolare in JavaScript (forma a funzione di useTransform) ogni valore legato allo scorrimento dentro una scena ferma: la timeline nativa del browser lì sbaglia gli intervalli.

### Don't:
- **Don't** mettere occhielli, etichette o numeri sopra i titoli.
- **Don't** introdurre colori d'accento o un secondo grigio per il testo.
- **Don't** usare vetro, sfocature decorative o testo a gradiente.
- **Don't** usare il monospazio fuori dai blocchi di codice.
- **Don't** aggiungere un secondo capitolo nero oltre alla chiusura.
- **Don't** mettere filo e ombra sullo stesso elemento.
