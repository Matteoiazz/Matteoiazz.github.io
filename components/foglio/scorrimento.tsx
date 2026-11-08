"use client"

import { useEffect } from "react"
import Lenis from "lenis"

let lenis: Lenis | null = null

/** L'istanza attiva, per fermare lo scorrimento mentre un menu è aperto. */
export const scorrimento = () => lenis

/**
 * Scorrimento lento con rotella e trackpad, come sul sito di riferimento:
 * ogni scatto della rotella si allunga in 1,2 secondi su una curva che si
 * posa piano, così la pagina si legge invece di scappare. Sui touch resta lo
 * scorrimento nativo; con il movimento ridotto non parte. Lavora sullo
 * scroll vero della pagina, quindi elementi fermi, ancore e animazioni legate
 * allo scorrimento continuano a funzionare.
 */
export function ScorrimentoLento() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      autoRaf: true,
      // Le sezioni hanno già il loro spazio sopra il titolo: l'ancora porta la sezione in cima.
      anchors: true,
    })
    return () => {
      lenis?.destroy()
      lenis = null
    }
  }, [])
  return null
}
