"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Anello attorno al puntatore.
 *
 * Due elementi separati, uno per la posizione e uno per l'ingrandimento.
 * Prima erano lo stesso elemento: la proprietà CSS `scale` si applica dopo il
 * `transform`, quindi moltiplicava anche la traslazione e sopra i link l'anello
 * finiva a 1.7 volte le coordinate del mouse (misurato: mouse 904,481 → anello
 * 1527,808).
 *
 * Resta invisibile finché il mouse non si muove: altrimenti rimaneva
 * parcheggiato nell'angolo in alto a sinistra.
 */
export function Cursor() {
  const posizione = useRef<HTMLDivElement>(null)
  const anello = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || calm) return
    setEnabled(true)

    const onMove = (e: PointerEvent) => {
      const pos = posizione.current
      const ring = anello.current
      if (!pos || !ring) return
      pos.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      ring.classList.remove("opacity-0")
      const interattivo = (e.target as Element)?.closest?.("a, button")
      ring.classList.toggle("scale-[1.7]", Boolean(interattivo))
    }

    const nascondi = () => anello.current?.classList.add("opacity-0")

    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", nascondi)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", nascondi)
    }
  }, [])

  if (!enabled) return null

  return (
    <div ref={posizione} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70]">
      <div
        ref={anello}
        className="size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40 opacity-0 transition-[scale,opacity] duration-200 ease-out"
      />
    </div>
  )
}
