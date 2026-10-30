"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import type { Codice } from "@/lib/casi-studio"

// Dove comincia il commento in una riga: "//" e "#" dopo uno spazio, oppure
// tutta la riga se è un commento a blocchi. Basta per gli estratti dei casi di
// studio, che non hanno "//" o "#" dentro le stringhe.
function dividi(riga: string): [string, string] {
  const t = riga.trimStart()
  if (/^(\/\/|#|\/\*\*|\*\/|\*( |$))/.test(t)) return ["", riga]
  const m = riga.match(/\s(\/\/|#)\s/)
  if (m?.index !== undefined) return [riga.slice(0, m.index), riga.slice(m.index)]
  return [riga, ""]
}

/**
 * Estratto di codice su lastra nera: barra con il file, numeri di riga,
 * commenti attenuati (sono la parte da leggere) e il pulsante per copiarlo.
 */
export function BloccoCodice({ codice }: { codice: Codice }) {
  const righe = codice.righe.split("\n")
  const [copiato, setCopiato] = useState(false)
  const copia = async () => {
    try {
      await navigator.clipboard.writeText(codice.righe)
      setCopiato(true)
      setTimeout(() => setCopiato(false), 1800)
    } catch {}
  }
  return (
    <figure className="scuro overflow-hidden border border-inchiostro">
      <figcaption className="flex items-center justify-between gap-4 border-b border-riga-forte px-4 py-2.5">
        <span className="dato truncate text-tenue">{codice.file}</span>
        <button
          type="button"
          onClick={copia}
          className="dato flex shrink-0 items-center gap-1.5 text-tenue transition-colors hover:text-testo"
        >
          {copiato ? <Check aria-hidden className="size-3.5" /> : <Copy aria-hidden className="size-3.5" />}
          {copiato ? "Copiato" : "Copia"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto py-4 font-mono text-[0.78rem] leading-[1.7] sm:text-[0.8rem]">
        <code>
          {righe.map((riga, i) => {
            const [codiceRiga, commento] = dividi(riga)
            return (
              <span key={i} className="flex min-h-[1.7em]">
                <span aria-hidden className="w-10 shrink-0 select-none pr-4 text-right text-tenue/50">
                  {i + 1}
                </span>
                <span className="pr-5">
                  <span>{codiceRiga}</span>
                  {commento ? <span className="text-tenue">{commento}</span> : null}
                </span>
              </span>
            )
          })}
        </code>
      </pre>
    </figure>
  )
}
