import type { CSSProperties } from "react"
import { profile } from "@/lib/portfolio-data"

// Nome e cognome attaccati: a separarli è il cambio di luce, non lo spazio.
const [nome, ...cognome] = profile.name.toUpperCase().split(" ")
const lettere = [
  ...[...nome].map((c) => ({ c, tono: "firma-chiaro" })),
  ...[...cognome.join("")].map((c) => ({ c, tono: "firma-scuro" })),
]

/**
 * Firma di chiusura: il nome a tutta larghezza come ultima cosa del sito.
 *
 * La dimensione è in unità del contenitore (cqi) e non in vw, che include la
 * barra di scorrimento e farebbe sporgere l'ultima lettera. Le lettere sono
 * distribuite con justify-between: le piccole differenze di resa del font tra
 * browser finiscono nella spaziatura invece di mandare il nome fuori bordo.
 *
 * Decorativa per gli screen reader: il nome è già nel footer subito sopra.
 */
export function Wordmark() {
  return (
    <div id="firma" aria-hidden className="firma relative px-4 sm:px-6">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[140%]"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 100%, color-mix(in oklch, var(--foreground) 9%, transparent), transparent 70%)",
        }}
      />
      <p className="firma-riga relative flex justify-between overflow-clip whitespace-nowrap font-semibold">
        {lettere.map(({ c, tono }, i) => (
          <span
            key={i}
            className={`firma-lettera ${tono}`}
            style={{ "--i": i } as CSSProperties}
          >
            {c}
          </span>
        ))}
      </p>
    </div>
  )
}
