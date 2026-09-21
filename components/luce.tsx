"use client"

import { useEffect } from "react"

/**
 * Luce che segue il cursore sulle superfici di vetro.
 *
 * Un solo ascoltatore per tutta la pagina: trova la card o il pulsante sotto
 * il puntatore e ci scrive la posizione come variabili CSS (--mx/--my per le
 * card .glass-flat, --gx/--gy per i pulsanti .glass-dyn). Il resto lo fa il
 * CSS: un alone morbido sul fondo e un filo di luce sul bordo, come su Linear.
 * Uscendo, le variabili tornano fuori dall'elemento e la luce si spegne.
 *
 * Solo con mouse o trackpad: sul touch non c'è un cursore da seguire.
 */
export function Luce() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    let attivo: HTMLElement | null = null
    const spegni = (el: HTMLElement) => {
      el.style.setProperty("--mx", "-1000px")
      el.style.setProperty("--my", "-1000px")
    }

    const muovi = (e: PointerEvent) => {
      const bersaglio = e.target instanceof Element ? e.target : null
      const el = bersaglio?.closest<HTMLElement>(".glass-flat, .glass-dyn") ?? null
      if (attivo && attivo !== el) spegni(attivo)
      attivo = el
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = `${e.clientX - r.left}px`
      const y = `${e.clientY - r.top}px`
      el.style.setProperty("--mx", x)
      el.style.setProperty("--my", y)
      el.style.setProperty("--gx", x)
      el.style.setProperty("--gy", y)
    }

    window.addEventListener("pointermove", muovi, { passive: true })
    return () => window.removeEventListener("pointermove", muovi)
  }, [])

  return null
}
