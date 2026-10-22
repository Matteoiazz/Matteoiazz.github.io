"use client"

import { useEffect, useRef } from "react"
import { profile } from "@/lib/portfolio-data"

const nome = profile.name.toUpperCase()

// Unità del viewBox: il testo è largo esattamente L, qualunque sia lo schermo.
const L = 1000
const H = 96

/**
 * Firma di chiusura: il nome a tutta larghezza, disegnato a filo sottile.
 * Una luce lo rivela cromato, come il fiore: segue il puntatore quando c'è,
 * altrimenti lo attraversa da sola, lenta, avanti e indietro.
 *
 * SVG e non testo HTML: textLength fa combaciare il nome con la larghezza
 * al millimetro, e contorno, cromatura e maschera stanno sullo stesso
 * disegno. La luce si muove cambiando due attributi, senza re-render.
 *
 * Decorativa per gli screen reader: il nome è già nel footer subito sopra.
 */
export function Wordmark() {
  const svg = useRef<SVGSVGElement>(null)
  const luce = useRef<SVGRadialGradientElement>(null)

  useEffect(() => {
    const el = svg.current
    const g = luce.current
    if (!el || !g) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      g.setAttribute("r", String(L))
      return
    }

    // Posizione attuale e bersaglio della luce, in unità del viewBox.
    let x = -200
    let y = H / 2
    let tx = x
    let ty = y
    let puntatore = false
    let visibile = false
    let frame = 0
    const inizio = performance.now()

    const passo = (ora: number) => {
      frame = 0
      if (!puntatore) {
        // Andata e ritorno in 9 secondi, con una curva che rallenta ai lati.
        const t = ((ora - inizio) / 9000) % 1
        const onda = 0.5 - 0.5 * Math.cos(t * Math.PI * 2)
        tx = -120 + onda * (L + 240)
        ty = H * 0.55
      }
      x += (tx - x) * 0.09
      y += (ty - y) * 0.09
      g.setAttribute("cx", x.toFixed(1))
      g.setAttribute("cy", y.toFixed(1))
      if (visibile) frame = requestAnimationFrame(passo)
    }
    const avvia = () => {
      if (!frame && visibile) frame = requestAnimationFrame(passo)
    }

    const muovi = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width) * L
      ty = ((e.clientY - r.top) / r.height) * H
      puntatore = true
      avvia()
    }
    const esci = () => {
      puntatore = false
    }

    const osservatore = new IntersectionObserver(([voce]) => {
      visibile = voce.isIntersecting
      if (visibile) avvia()
      else {
        cancelAnimationFrame(frame)
        frame = 0
      }
    })
    osservatore.observe(el)
    const area: HTMLElement = el.parentElement ?? document.body
    area.addEventListener("pointermove", muovi)
    area.addEventListener("pointerleave", esci)
    return () => {
      osservatore.disconnect()
      area.removeEventListener("pointermove", muovi)
      area.removeEventListener("pointerleave", esci)
      cancelAnimationFrame(frame)
    }
  }, [])

  const testo = {
    x: 0,
    y: H * 0.86,
    textLength: L,
    lengthAdjust: "spacingAndGlyphs" as const,
    fontSize: H * 1.04,
    fontWeight: 600,
    letterSpacing: "-0.01em",
  }

  return (
    <div id="firma" aria-hidden className="relative px-4 pb-[clamp(1rem,3vw,2.5rem)] pt-6 sm:px-6">
      <svg ref={svg} viewBox={`0 -4 ${L} ${H + 8}`} className="block w-full overflow-visible">
        <defs>
          {/* Cromatura del fiore: bianco in alto, nero a metà, riflesso in basso. */}
          <linearGradient id="firma-cromo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.38" stopColor="#d4d4d4" />
            <stop offset="0.55" stopColor="#4a4a4a" />
            <stop offset="0.7" stopColor="#1c1c1c" />
            <stop offset="0.86" stopColor="#8f8f8f" />
            <stop offset="1" stopColor="#e6e6e6" />
          </linearGradient>
          <radialGradient ref={luce} id="firma-luce" gradientUnits="userSpaceOnUse" cx={-200} cy={H / 2} r={230}>
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="firma-maschera" maskUnits="userSpaceOnUse" x={-50} y={-50} width={L + 100} height={H + 100}>
            <rect x={-50} y={-50} width={L + 100} height={H + 100} fill="url(#firma-luce)" />
          </mask>
        </defs>

        {/* Il nome a filo, sempre visibile. */}
        <text
          {...testo}
          fill="none"
          stroke="rgb(255 255 255 / 0.2)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        >
          {nome}
        </text>

        {/* Lo stesso nome pieno e cromato, solo dove arriva la luce. */}
        <g mask="url(#firma-maschera)">
          <text {...testo} fill="url(#firma-cromo)">
            {nome}
          </text>
          <text
            {...testo}
            fill="none"
            stroke="rgb(255 255 255 / 0.7)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          >
            {nome}
          </text>
        </g>
      </svg>
    </div>
  )
}
