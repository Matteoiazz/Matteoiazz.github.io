"use client"

import { useRef, type ReactNode } from "react"

type GlassIslandProps = {
  children: ReactNode
  className?: string
  href?: string
} & React.HTMLAttributes<HTMLElement>

/**
 * Superficie di vetro che reagisce al puntatore.
 *
 * La posizione del mouse finisce in due variabili CSS sull'elemento
 * (--gx/--gy): riflesso speculare e rifrazione del bordo la seguono senza
 * che React ridisegni nulla a ogni movimento.
 */
export function GlassIsland({ children, className = "", href, ...rest }: GlassIslandProps) {
  const ref = useRef<HTMLElement | null>(null)

  // Ref via callback: accetta sia <a> sia <div> senza forzature di tipo.
  const setRef = (el: HTMLElement | null) => {
    ref.current = el
  }

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--gx", `${e.clientX - r.left}px`)
    el.style.setProperty("--gy", `${e.clientY - r.top}px`)
  }

  const shared = {
    ref: setRef,
    onPointerMove,
    className: `glass glass-dyn island ${className}`,
    ...rest,
  }

  return href ? (
    <a href={href} {...shared}>
      {children}
    </a>
  ) : (
    <div {...shared}>{children}</div>
  )
}
