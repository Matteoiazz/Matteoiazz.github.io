"use client"

import { useEffect, useState } from "react"

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

/** La scorciatoia del menu come la scrive il sistema di chi visita: ⌘K sui Mac, Ctrl K altrove. */
export function useScorciatoia() {
  const [tasti, setTasti] = useState("Ctrl K")
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) setTasti("⌘K")
  }, [])
  return tasti
}
