"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Cursore come una piccola lente di vetro: schiarisce e mette a fuoco
 * quello che ci passa sotto (backdrop-filter). Sopra un link si allarga;
 * sopra un elemento con `data-cursore` diventa una pillola chiara con
 * l'azione ("Apri", "Copia").
 *
 * Solo con mouse o trackpad, e mai con il movimento ridotto.
 */
export function Cursore() {
  const lente = useRef<HTMLDivElement>(null)
  const pillola = useRef<HTMLDivElement>(null)
  const [attivo, setAttivo] = useState(false)

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setAttivo(true)

    let x = -100
    let y = -100
    let cx = x
    let cy = y
    let frame = 0
    const segui = () => {
      // La lente insegue il puntatore con un poco di ritardo: si sente il peso.
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      const t = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`
      if (lente.current) lente.current.style.transform = t
      if (pillola.current) pillola.current.style.transform = t
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(segui) : 0
    }
    const muovi = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!frame) frame = requestAnimationFrame(segui)
      const el = e.target instanceof Element ? e.target : null
      const azione = el?.closest("[data-cursore]")?.getAttribute("data-cursore") ?? ""
      const sopraLink = Boolean(el?.closest("a, button, [role=button], input, label"))
      const l = lente.current
      const p = pillola.current
      if (!l || !p) return
      if (azione) {
        p.textContent = azione
        p.style.opacity = "1"
        l.style.opacity = "0"
      } else {
        p.style.opacity = "0"
        l.style.opacity = "1"
        l.style.scale = sopraLink ? "1.7" : "1"
      }
    }
    const via = () => {
      if (lente.current) lente.current.style.opacity = "0"
      if (pillola.current) pillola.current.style.opacity = "0"
    }
    window.addEventListener("pointermove", muovi, { passive: true })
    document.documentElement.addEventListener("pointerleave", via)
    return () => {
      window.removeEventListener("pointermove", muovi)
      document.documentElement.removeEventListener("pointerleave", via)
      cancelAnimationFrame(frame)
    }
  }, [])

  if (!attivo) return null
  return (
    <>
      <div
        ref={lente}
        aria-hidden
        className="lente pointer-events-none fixed left-0 top-0 z-[90] size-7 rounded-full opacity-0"
        data-no-stampa
      />
      <div
        ref={pillola}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] whitespace-nowrap rounded-full bg-carta px-4 py-2 text-sm font-medium text-inchiostro opacity-0 shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] transition-opacity duration-200"
        data-no-stampa
      />
    </>
  )
}
