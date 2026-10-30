"use client"

import { useEffect, useRef } from "react"
import { stack } from "@/lib/portfolio-data"

const voci = [...new Set(stack.flatMap((g) => g.items))]

/**
 * Nastro delle tecnologie in corpo gigante. Scorre da solo e accelera con
 * la velocità dello scroll; cambia verso quando si torna su.
 */
export function Nastro() {
  const nastro = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = nastro.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let x = 0
    let verso = -1
    let spinta = 0
    let ultimoY = window.scrollY
    let frame = 0
    let visibile = false
    const passo = () => {
      const y = window.scrollY
      const delta = y - ultimoY
      ultimoY = y
      if (delta !== 0) verso = delta > 0 ? -1 : 1
      spinta += (Math.min(40, Math.abs(delta)) - spinta) * 0.1
      x += verso * (0.6 + spinta * 0.35)
      const meta = el.scrollWidth / 2
      if (x < -meta) x += meta
      if (x > 0) x -= meta
      el.style.transform = `translate3d(${x}px,0,0)`
      if (visibile) frame = requestAnimationFrame(passo)
    }
    const o = new IntersectionObserver(([v]) => {
      visibile = v.isIntersecting
      if (visibile && !frame) frame = requestAnimationFrame(passo)
      if (!visibile) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    })
    o.observe(el)
    return () => {
      o.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden className="scuro overflow-hidden border-y border-riga-forte py-6 md:py-10">
      <div ref={nastro} className="nastro">
        {[0, 1].map((copia) => (
          <span key={copia} className="flex shrink-0 items-center">
            {voci.map((v) => (
              <span
                key={`${copia}-${v}`}
                className="flex items-center whitespace-nowrap text-[clamp(2.5rem,7vw,6.5rem)] font-extrabold leading-none tracking-[-0.03em] [font-variation-settings:'wdth'_72]"
              >
                {v}
                <span className="mx-[0.4em] inline-block size-[0.18em] rounded-full bg-current opacity-60" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
