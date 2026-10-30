"use client"

import { useEffect, useState } from "react"

const CHIAVE = "mi-entrato"

// Decisa una volta per caricamento: in sviluppo React esegue gli effetti due
// volte, e la seconda lettura troverebbe già segnata la visita.
let primaVisita: boolean | null = null

/**
 * Ingresso alla prima visita: la pagina è dietro una lastra di vetro
 * smerigliato con un contatore da 000 a 100; arrivato a 100 il vetro si
 * schiarisce (la sfocatura scende a zero) e il fiore e il nome vengono a
 * fuoco. Alle visite successive (stessa sessione) e con il movimento
 * ridotto non compare.
 *
 * Segnala la fine aggiungendo "pronto" a <html>: da lì emergono le
 * lettere del nome.
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
    if (!primaVisita || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
        setTimeout(() => setStato("fatto"), 1200)
      }
    }
    frame = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(frame)
  }, [])

  if (stato === "fatto") return null
  const esce = stato === "esce"
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" data-no-stampa data-ingresso>
      <div
        className="absolute inset-0 transition-[backdrop-filter,background-color] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          backdropFilter: esce ? "blur(0px)" : "blur(34px) saturate(140%)",
          WebkitBackdropFilter: esce ? "blur(0px)" : "blur(34px) saturate(140%)",
          backgroundColor: esce ? "rgb(11 11 12 / 0)" : "rgb(11 11 12 / 0.92)",
        }}
      />
      <div
        className={`contenitore absolute inset-x-0 bottom-0 flex items-end justify-between pb-8 transition-[opacity,filter] duration-500 ${
          esce ? "opacity-0 blur-md" : ""
        }`}
      >
        <p className="text-sm text-tenue">Matteo Iazzolino · Portfolio</p>
        <p className="font-mono text-[clamp(4rem,14vw,11rem)] leading-[0.8] tabular-nums text-testo">
          {String(n).padStart(3, "0")}
        </p>
      </div>
    </div>
  )
}
