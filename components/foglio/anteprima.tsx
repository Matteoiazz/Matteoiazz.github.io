"use client"

/**
 * La copertina di un progetto passa dalla casa alla sua pagina con una view
 * transition. Può partire da tre posti: la vetrina in alto, l'anteprima che
 * segue il puntatore nell'indice, la miniatura dell'indice sul telefono.
 * Ognuno ha il suo nome di transizione, fisso, così due elementi con lo
 * stesso nome non esistono mai; la testata della pagina del progetto prende
 * il nome del posto da cui si è partiti, segnato al momento del clic.
 */
export type Origine = "copertina" | "binario" | "nessuna"

let origine: Origine = "copertina"

export const segnaOrigine = (o: Origine) => {
  origine = o
}

/** Nome di transizione di un punto di partenza. */
export const nomePassaggio = (slug: string, da: Origine = "copertina") => `${da}-${slug}`

/** Nome della testata nella pagina del progetto: quello del posto da cui si arriva. */
export const nomeTestata = (slug: string) => nomePassaggio(slug, origine)
