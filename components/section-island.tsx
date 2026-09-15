"use client"

import { useEffect, useState } from "react"
import { GlassIsland } from "@/components/glass-island"
import { projects } from "@/lib/portfolio-data"

const sezioni = [
  { id: "top", label: "Inizio", nota: "Software engineer" },
  { id: "projects", label: "Progetti", nota: `${projects.length} lavori selezionati` },
  { id: "about", label: "Profilo", nota: "Competenze e lingue" },
  { id: "experience", label: "Percorso", nota: "UniCal · dic. 2026" },
  { id: "contact", label: "Contatti", nota: "Scrivimi pure" },
]

/**
 * Isoletta di stato: capsula sospesa che cambia contenuto mentre scorri.
 *
 * La sezione attiva è quella che contiene il centro dello schermo, calcolata
 * a mano invece che con IntersectionObserver: su sezioni alte migliaia di
 * pixel il rapporto di intersezione non raggiunge mai una soglia utile.
 *
 * Comparsa e cambio testo sono in CSS, non in JavaScript: restano fluidi
 * anche quando il thread principale è occupato.
 */
export function SectionIsland() {
  const [attiva, setAttiva] = useState(sezioni[0])
  const [visibile, setVisibile] = useState(false)

  useEffect(() => {
    // Le posizioni si misurano una volta sola: lo scroll poi confronta numeri,
    // senza leggere il layout e senza requestAnimationFrame (che viene
    // strozzato nelle schede in secondo piano).
    let posizioni: { id: string; top: number }[] = []

    const misura = () => {
      posizioni = sezioni
        .map((s) => {
          const el = document.getElementById(s.id)
          return el ? { id: s.id, top: el.offsetTop } : null
        })
        .filter((v): v is { id: string; top: number } => v !== null)
      aggiorna()
    }

    const aggiorna = () => {
      const centro = window.scrollY + window.innerHeight / 2

      let correnteId = posizioni[0]?.id ?? sezioni[0].id
      for (const p of posizioni) {
        if (centro >= p.top) correnteId = p.id
      }
      const corrente = sezioni.find((s) => s.id === correnteId) ?? sezioni[0]

      setAttiva((prec) => (prec.id === corrente.id ? prec : corrente))
      setVisibile(window.scrollY > window.innerHeight * 0.6)
    }

    misura()
    window.addEventListener("scroll", aggiorna, { passive: true })
    window.addEventListener("resize", misura, { passive: true })
    return () => {
      window.removeEventListener("scroll", aggiorna)
      window.removeEventListener("resize", misura)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-6">
      <div
        className={`island transition-[opacity,transform] duration-500 ${
          visibile ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <GlassIsland
          href={`#${attiva.id}`}
          className="pointer-events-auto flex items-center gap-3 rounded-full py-2 pl-3.5 pr-4 text-sm"
        >
          <span className="size-2 shrink-0 rounded-full bg-foreground/70" />

          <span key={attiva.id} className="island-swap flex items-baseline gap-2 whitespace-nowrap">
            <span className="font-medium">{attiva.label}</span>
            <span className="text-xs text-muted-foreground">{attiva.nota}</span>
          </span>
        </GlassIsland>
      </div>
    </div>
  )
}
