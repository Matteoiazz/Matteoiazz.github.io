"use client"

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react"

// Corpo del testo nel viewBox: la larghezza si ricava dalla parola.
const H = 100
// Stima prima della misura vera: Geist semibold maiuscolo è largo circa 0.68 em
// per lettera. Serve solo al primo disegno, la parola sta sotto la piega.
const STIMA = 0.68

/**
 * Parola gigante a filo sottile dietro il titolo di una sezione, con la stessa
 * luce della firma in fondo alla pagina: dove arriva, la parola diventa
 * cromata come il fiore.
 *
 * La luce la attraversa mentre la sezione scorre nello schermo (da sinistra
 * quando entra, a destra quando esce) e segue il puntatore quando ci passa
 * sopra. A differenza della firma niente textLength: la parola tiene le sue
 * proporzioni e il viewBox prende la sua larghezza misurata, così riempie la
 * riga senza lettere stirate.
 *
 * Decorativa: il titolo vero è l'h2 che le sta sopra.
 */
export function ParolaCromata({ testo, className = "" }: { testo: string; className?: string }) {
  const parola = testo.toUpperCase()
  // Gli id di useId contengono caratteri che dentro url(#…) andrebbero
  // scappati: per gradiente e maschera bastano lettere e cifre.
  const base = `parola${useId().replace(/[^a-zA-Z0-9]/g, "")}`
  const svg = useRef<SVGSVGElement>(null)
  const misura = useRef<SVGTextElement>(null)
  const luce = useRef<SVGRadialGradientElement>(null)
  const [larghezza, setLarghezza] = useState(Math.round(parola.length * H * STIMA))

  useLayoutEffect(() => {
    const leggi = () => {
      const w = misura.current?.getComputedTextLength()
      if (w) setLarghezza(Math.ceil(w))
    }
    leggi()
    // Prima che Geist sia caricato la misura è quella del font di riserva.
    document.fonts?.ready.then(leggi)
  }, [parola])

  useEffect(() => {
    const el = svg.current
    const g = luce.current
    if (!el || !g) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      g.setAttribute("cx", String(larghezza / 2))
      g.setAttribute("r", String(larghezza * 0.4))
      return
    }

    let x = -H * 3
    let y = H / 2
    let tx = x
    let ty = y
    let puntatore = false
    let visibile = false
    let frame = 0

    const passo = () => {
      frame = 0
      if (!puntatore) {
        // Avanzamento della parola nello schermo: 0 quando entra dal basso,
        // 1 quando esce dall'alto.
        const r = el.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)))
        tx = -H * 2 + p * (larghezza + H * 4)
        ty = H * 0.55
      }
      x += (tx - x) * 0.1
      y += (ty - y) * 0.1
      g.setAttribute("cx", x.toFixed(1))
      g.setAttribute("cy", y.toFixed(1))
      if (visibile) frame = requestAnimationFrame(passo)
    }
    const avvia = () => {
      if (!frame && visibile) frame = requestAnimationFrame(passo)
    }

    const muovi = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      // Il puntatore guida la luce solo all'altezza della parola, non in tutta
      // la sezione: sotto ci sono le card, con la loro luce.
      if (e.clientY < r.top - 40 || e.clientY > r.bottom + 40) {
        puntatore = false
        return
      }
      tx = ((e.clientX - r.left) / r.width) * larghezza
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
    window.addEventListener("pointermove", muovi, { passive: true })
    document.documentElement.addEventListener("pointerleave", esci)
    return () => {
      osservatore.disconnect()
      window.removeEventListener("pointermove", muovi)
      document.documentElement.removeEventListener("pointerleave", esci)
      cancelAnimationFrame(frame)
    }
  }, [larghezza])

  const testoProps = {
    x: 0,
    y: H * 0.86,
    fontSize: H * 1.04,
    fontWeight: 600,
    letterSpacing: "-0.02em",
  }

  return (
    <svg
      ref={svg}
      aria-hidden
      viewBox={`0 -4 ${larghezza} ${H + 8}`}
      className={`block w-full overflow-visible select-none ${className}`}
    >
      <defs>
        <linearGradient id={`${base}-cromo`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.38" stopColor="#d4d4d4" />
          <stop offset="0.55" stopColor="#4a4a4a" />
          <stop offset="0.7" stopColor="#1c1c1c" />
          <stop offset="0.86" stopColor="#8f8f8f" />
          <stop offset="1" stopColor="#e6e6e6" />
        </linearGradient>
        <radialGradient ref={luce} id={`${base}-luce`} gradientUnits="userSpaceOnUse" cx={-H * 3} cy={H / 2} r={H * 2.6}>
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${base}-maschera`} maskUnits="userSpaceOnUse" x={-H} y={-H} width={larghezza + 2 * H} height={3 * H}>
          <rect x={-H} y={-H} width={larghezza + 2 * H} height={3 * H} fill={`url(#${base}-luce)`} />
        </mask>
      </defs>

      {/* La parola a filo, sempre visibile. Questa è anche quella misurata. */}
      <text
        ref={misura}
        {...testoProps}
        fill="none"
        stroke="rgb(255 255 255 / 0.16)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      >
        {parola}
      </text>

      {/* La stessa parola cromata, solo dove arriva la luce. */}
      <g mask={`url(#${base}-maschera)`}>
        <text {...testoProps} fill={`url(#${base}-cromo)`} fillOpacity={0.55}>
          {parola}
        </text>
        <text
          {...testoProps}
          fill="none"
          stroke="rgb(255 255 255 / 0.6)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        >
          {parola}
        </text>
      </g>
    </svg>
  )
}
