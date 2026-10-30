"use client"

import { useEffect, useState } from "react"

const CHIAVE = "mi-entrato"

// Decisa una volta per caricamento: in sviluppo React esegue gli effetti due
// volte, e la seconda lettura troverebbe già segnata la visita.
let primaVisita: boolean | null = null

/**
 * Ingresso alla prima visita: un contatore da 000 a 100 su fondo nero,
 * poi il nero si ritira colonna per colonna lungo la griglia e il nome
 * comincia a costruirsi. Alle visite successive (stessa sessione) e con il
 * movimento ridotto non compare: la pagina parte subito.
 *
 * Segnala la fine aggiungendo "pronto" a <html>: da lì partono le celle
 * del nome.
 */
export function Ingresso() {
  const [stato, setStato] = useState<"conta" | "esce" | "fatto">("conta")
  const [n, setN] = useState(0)

  useEffect(() => {
    const segna = () => document.documentElement.classList.add("pronto")
    if (primaVisita === null) {
      try {
        primaVisita = sessionStorage.getItem(CHIAVE) !== "1"
        sessionStorage.setItem(CHIAVE, "1")
      } catch {
        primaVisita = true
      }
    }
    const visto = !primaVisita
    if (visto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStato("fatto")
      segna()
      return
    }
    const inizio = performance.now()
    const durata = 1300
    let frame = 0
    const passo = (ora: number) => {
      const p = Math.min(1, (ora - inizio) / durata)
      // Accelera all'inizio e rallenta verso il 100.
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frame = requestAnimationFrame(passo)
      else {
        setStato("esce")
        segna()
        setTimeout(() => setStato("fatto"), 1100)
      }
    }
    frame = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(frame)
  }, [])

  if (stato === "fatto") return null
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" data-no-stampa data-ingresso>
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-12">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={`bg-inchiostro transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${i >= 4 ? "hidden md:block" : ""}`}
            style={{
              transform: stato === "esce" ? "translateY(-101%)" : "none",
              transitionDelay: `${(i % 12) * 35}ms`,
            }}
          />
        ))}
      </div>
      <div
        className={`contenitore absolute inset-x-0 bottom-0 flex items-end justify-between pb-6 text-carta transition-opacity duration-300 ${
          stato === "esce" ? "opacity-0" : ""
        }`}
      >
        <p className="text-sm [font-variation-settings:'wdth'_85]">Matteo Iazzolino · Portfolio</p>
        <p className="font-mono text-[clamp(4rem,14vw,11rem)] leading-[0.8] tabular-nums">
          {String(n).padStart(3, "0")}
        </p>
      </div>
    </div>
  )
}
