"use client"

import { useEffect } from "react"
import { avvisa } from "@/components/foglio/comuni"

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]

/**
 * Le chicche nascoste:
 * - il codice Konami accende la modalità progettista (la griglia di costruzione
 *   e i bordi di ogni elemento);
 * - un messaggio nella console per chi la apre;
 * - il titolo della scheda che saluta quando si va altrove.
 */
export function Segreti() {
  useEffect(() => {
    let posizione = 0
    const tasto = (e: KeyboardEvent) => {
      const atteso = KONAMI[posizione]
      posizione = e.key.toLowerCase() === atteso.toLowerCase() ? posizione + 1 : e.key === KONAMI[0] ? 1 : 0
      if (posizione === KONAMI.length) {
        posizione = 0
        const acceso = document.documentElement.classList.toggle("progettista")
        const it = document.documentElement.lang !== "en"
        avvisa(
          acceso
            ? it ? "Modalità progettista: la griglia si vede" : "Designer mode: the grid is visible"
            : it ? "Modalità progettista spenta" : "Designer mode off",
        )
      }
    }
    window.addEventListener("keydown", tasto)

    console.log(
      "%cMatteo Iazzolino%c\nSe stai leggendo qui, il codice ti interessa davvero.\nIl sorgente è su https://github.com/Matteoiazz · scrivimi: matteo.iazzolino@gmail.com\nPremi Ctrl+K per il menu. E prova il codice Konami.",
      "font: 800 28px sans-serif; letter-spacing: -0.02em",
      "font: 13px/1.6 monospace",
    )

    const titolo = document.title
    const visibilita = () => {
      document.title = document.hidden ? "Torna presto — Matteo Iazzolino" : titolo
    }
    document.addEventListener("visibilitychange", visibilita)
    return () => {
      window.removeEventListener("keydown", tasto)
      document.removeEventListener("visibilitychange", visibilita)
    }
  }, [])
  return null
}
