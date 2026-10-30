"use client"

import { useEffect, useRef, useState } from "react"

/** Mostra un avviso in basso (per esempio "Email copiata"). */
export function avvisa(testo: string) {
  window.dispatchEvent(new CustomEvent("mi-avviso", { detail: testo }))
}

/** Apre il menu dei comandi da qualunque punto della pagina. */
export function apriComandi() {
  window.dispatchEvent(new Event("mi-comandi"))
}

export async function copia(testo: string) {
  try {
    await navigator.clipboard.writeText(testo)
    return true
  } catch {
    return false
  }
}

/** Ora di Cosenza, aggiornata ogni secondo; vuota durante il rendering sul server. */
export function useOraCosenza() {
  const [ora, setOra] = useState("")
  useEffect(() => {
    const formato = new Intl.DateTimeFormat("it-IT", {
      timeZone: "Europe/Rome",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    const aggiorna = () => setOra(formato.format(new Date()))
    aggiorna()
    const id = setInterval(aggiorna, 1000)
    return () => clearInterval(id)
  }, [])
  return ora
}

const CARATTERI = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

/**
 * Testo che si "decifra" al passaggio: le lettere girano a caso e si
 * fermano da sinistra a destra. Restituisce il testo da mostrare e i
 * gestori da mettere sull'elemento.
 */
export function useDecifra(testo: string) {
  const [mostrato, setMostrato] = useState(testo)
  const frame = useRef(0)
  useEffect(() => setMostrato(testo), [testo])
  const avvia = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    cancelAnimationFrame(frame.current)
    const inizio = performance.now()
    const passo = (ora: number) => {
      const fatti = Math.floor((ora - inizio) / 28)
      setMostrato(
        [...testo]
          .map((c, i) => (i < fatti || c === " " ? c : CARATTERI[(i * 7 + fatti * 3) % CARATTERI.length]))
          .join(""),
      )
      if (fatti < testo.length) frame.current = requestAnimationFrame(passo)
    }
    frame.current = requestAnimationFrame(passo)
  }
  useEffect(() => () => cancelAnimationFrame(frame.current), [])
  return { mostrato, avvia }
}
