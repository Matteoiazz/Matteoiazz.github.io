"use client"

import { useEffect, useRef } from "react"

/**
 * Una piccola etichetta nera che accompagna il puntatore sopra gli elementi
 * con `data-cursore` e dice cosa fa il clic ("Apri", "Copia"). Il puntatore
 * resta quello del sistema; sui touch l'etichetta non esiste.
 */
export function Etichetta() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const fermo = matchMedia("(prefers-reduced-motion: reduce)").matches
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let frame = 0
    let visibile = false

    const passo = () => {
      x += (tx - x) * (fermo ? 1 : 0.25)
      y += (ty - y) * (fermo ? 1 : 0.25)
      el.style.translate = `${x}px ${y}px`
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(passo) : 0
    }
    const muovi = (e: PointerEvent) => {
      const bersaglio = (e.target as Element | null)?.closest?.<HTMLElement>("[data-cursore]")
      tx = e.clientX + 14
      ty = e.clientY + 18
      if (bersaglio) {
        el.textContent = bersaglio.dataset.cursore ?? ""
        // Sul capitolo nero l'etichetta si rovescia, bianca.
        el.dataset.tono = bersaglio.closest(".notte") ? "chiaro" : "scuro"
        if (!visibile) {
          x = tx
          y = ty
        }
        el.dataset.visibile = "si"
        visibile = true
      } else if (visibile) {
        el.dataset.visibile = "no"
        visibile = false
      }
      if (!frame) frame = requestAnimationFrame(passo)
    }
    const via = () => {
      el.dataset.visibile = "no"
      visibile = false
    }
    window.addEventListener("pointermove", muovi, { passive: true })
    document.addEventListener("pointerleave", via)
    return () => {
      window.removeEventListener("pointermove", muovi)
      document.removeEventListener("pointerleave", via)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      data-no-stampa
      data-visibile="no"
      className="pointer-events-none fixed left-0 top-0 z-[70] origin-top-left scale-75 rounded-full bg-[#0a0a0a] px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] data-[tono=chiaro]:bg-white data-[tono=chiaro]:text-[#0a0a0a] data-[visibile=si]:scale-100 data-[visibile=si]:opacity-100"
    />
  )
}
