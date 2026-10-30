"use client"

import { useEffect, useRef, useState } from "react"

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ·/0123456789"

/**
 * Riga a palette, come i tabelloni Solari delle stazioni: ogni casella gira
 * su caratteri a caso prima di fermarsi su quello giusto, una dopo l'altra.
 * Le frasi si alternano da sole; con `fissa` mostra un testo solo, che gira
 * quando cambia (per esempio passando sopra una riga del tabellone).
 *
 * Lo screen reader legge la frase vera; le caselle sono decorazione.
 */
export function Palette({
  frasi,
  intervallo = 4400,
  className = "",
  caselle,
  classeCasella = "bg-testo text-fondo after:bg-fondo/40",
}: {
  frasi: string[]
  intervallo?: number
  className?: string
  /** Numero di caselle; di default quanto la frase più lunga. */
  caselle?: number
  /** Colori della casella: di default il contrario del capitolo. */
  classeCasella?: string
}) {
  const lunghezza = caselle ?? Math.max(...frasi.map((f) => f.length))
  const pad = (f: string) => f.toUpperCase().padEnd(lunghezza, " ").slice(0, lunghezza)
  const [indice, setIndice] = useState(0)
  const [mostrate, setMostrate] = useState(() => [...pad(frasi[0])])
  const caselleRef = useRef<(HTMLSpanElement | null)[]>([])
  const chiaveFrasi = frasi.join("|")

  // Alterna le frasi.
  useEffect(() => {
    setIndice(0)
    if (frasi.length < 2) return
    const id = setInterval(() => setIndice((i) => (i + 1) % frasi.length), intervallo)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chiaveFrasi, intervallo])

  // Fa girare le caselle verso la frase attiva.
  useEffect(() => {
    const meta = [...pad(frasi[indice] ?? frasi[0])]
    // Cambiando lingua cambia anche il numero di caselle.
    setMostrate((prima) => (prima.length === meta.length ? prima : meta.map(() => " ")))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMostrate(meta)
      return
    }
    const timer: ReturnType<typeof setTimeout>[] = []
    meta.forEach((carattere, i) => {
      const giri = 2 + ((i * 7) % 4)
      for (let g = 0; g <= giri; g++) {
        timer.push(
          setTimeout(() => {
            const finale = g === giri
            setMostrate((prima) => {
              const nuova = [...prima]
              nuova[i] = finale ? carattere : carattere === " " && g > 1 ? " " : ALFABETO[(i * 11 + g * 5) % ALFABETO.length]
              return nuova
            })
            const el = caselleRef.current[i]
            if (el) {
              el.classList.remove("gira")
              void el.offsetWidth
              el.classList.add("gira")
            }
          }, i * 16 + g * 55),
        )
      }
    })
    return () => timer.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice, chiaveFrasi])

  return (
    <span className={`inline-flex flex-wrap gap-[2px] ${className}`}>
      <span className="sr-only">{frasi[indice]}</span>
      {mostrate.map((c, i) => (
        <span
          key={i}
          ref={(el) => {
            caselleRef.current[i] = el
          }}
          aria-hidden
          className={`paletta relative px-[0.12em] py-[0.08em] font-sans font-semibold [font-variation-settings:'wdth'_78] after:absolute after:inset-x-0 after:top-1/2 after:h-px ${classeCasella}`}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  )
}
