"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Anello che insegue il puntatore con un ritardo morbido, accanto al cursore
 * di sistema. `mix-blend-mode: difference` lo rende leggibile sia sul fondo
 * scuro sia sui pulsanti chiari, senza doverne cambiare il colore.
 *
 * Si disattiva su dispositivi touch e con prefers-reduced-motion, dove un
 * cursore finto non aggiunge nulla.
 */
export function Cursor() {

  const ring = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || calm) return
    setEnabled(true)

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf = 0

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      const interactive = (e.target as Element)?.closest?.("a, button")
      ring.current?.classList.toggle("scale-[2.2]", Boolean(interactive))
      ring.current?.classList.toggle("opacity-60", Boolean(interactive))
    }

    const loop = () => {
      rx += (x - rx) * 0.15
      ry += (y - ry) * 0.15
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    // Solo l'anello che insegue: il cursore di sistema resta visibile, così
    // l'accento non compromette la leggibilità del puntatore.
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] mix-blend-difference">
      <div
        ref={ring}
        className="absolute left-0 top-0 size-8 rounded-full border border-white/70 opacity-30 transition-[transform,opacity] duration-300 ease-out"
      />
    </div>
  )
}
