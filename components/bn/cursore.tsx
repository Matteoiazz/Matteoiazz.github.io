"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Cursore a disco che inverte i colori sotto di sé (mix-blend-mode:
 * difference): bianco sul nero, nero sul bianco, senza sapere dove si trova.
 * Sopra un elemento con `data-cursore` diventa una pillola con l'azione
 * ("Apri", "Copia"): lì niente inversione, una pillola piena nel colore
 * opposto al capitolo, perché il testo resti leggibile.
 *
 * Solo con mouse o trackpad, e mai con il movimento ridotto.
 */
export function Cursore() {
  const punto = useRef<HTMLDivElement>(null)
  const pillola = useRef<HTMLDivElement>(null)
  const [attivo, setAttivo] = useState(false)

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setAttivo(true)
    document.documentElement.classList.add("cursore-mio")

    let x = -100
    let y = -100
    let cx = x
    let cy = y
    let frame = 0
    const segui = () => {
      // Il disco insegue il puntatore con un poco di ritardo: si sente il peso.
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      const t = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`
      if (punto.current) punto.current.style.transform = t
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
      const scuro = Boolean(el?.closest(".scuro"))
      const p = pillola.current
      const d = punto.current
      if (!p || !d) return
      if (azione) {
        p.textContent = azione
        p.style.opacity = "1"
        p.style.background = scuro ? "#fff" : "#0b0b0b"
        p.style.color = scuro ? "#0b0b0b" : "#fff"
        d.style.opacity = "0"
      } else {
        p.style.opacity = "0"
        d.style.opacity = "1"
        d.style.scale = sopraLink ? "3.6" : "1"
      }
    }
    const via = () => {
      if (punto.current) punto.current.style.opacity = "0"
      if (pillola.current) pillola.current.style.opacity = "0"
    }
    window.addEventListener("pointermove", muovi, { passive: true })
    document.documentElement.addEventListener("pointerleave", via)
    return () => {
      window.removeEventListener("pointermove", muovi)
      document.documentElement.removeEventListener("pointerleave", via)
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove("cursore-mio")
    }
  }, [])

  if (!attivo) return null
  return (
    <>
      <div
        ref={punto}
        aria-hidden
        className="cursore pointer-events-none fixed left-0 top-0 z-[90] size-3 rounded-full bg-white opacity-0"
        data-no-stampa
      />
      <div
        ref={pillola}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium opacity-0 transition-opacity duration-200 [font-variation-settings:'wdth'_90]"
        data-no-stampa
      />
    </>
  )
}
