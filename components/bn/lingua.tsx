"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

export type Codice = "it" | "en"

type Contesto = {
  lingua: Codice
  cambia: (l?: Codice) => void
  /** Sceglie il testo nella lingua attiva. */
  t: <T>(it: T, en: T) => T
}

const LinguaContesto = createContext<Contesto>({ lingua: "it", cambia: () => {}, t: (it) => it })

const CHIAVE = "mi-lingua"

/**
 * Italiano e inglese senza rotte separate: il sito è statico e la pagina è
 * una sola. La scelta resta nel browser di chi visita (comodità, non dato
 * da conservare); in caso di errore si resta in italiano.
 */
export function Lingua({ children }: { children: ReactNode }) {
  const [lingua, setLingua] = useState<Codice>("it")

  useEffect(() => {
    try {
      const salvata = localStorage.getItem(CHIAVE)
      if (salvata === "en" || salvata === "it") setLingua(salvata)
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.lang = lingua
  }, [lingua])

  const cambia = useCallback((l?: Codice) => {
    setLingua((prima) => {
      const nuova = l ?? (prima === "it" ? "en" : "it")
      try {
        localStorage.setItem(CHIAVE, nuova)
      } catch {}
      return nuova
    })
  }, [])

  const t = useCallback(<T,>(it: T, en: T) => (lingua === "it" ? it : en), [lingua])

  return <LinguaContesto.Provider value={{ lingua, cambia, t }}>{children}</LinguaContesto.Provider>
}

export const useLingua = () => useContext(LinguaContesto)
