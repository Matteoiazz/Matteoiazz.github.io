"use client"

import { useRef, type ReactNode } from "react"

/**
 * Card con riflettore che segue il puntatore.
 *
 * La posizione del mouse viene scritta in due variabili CSS sull'elemento
 * (--mx / --my) invece che nello stato React: nessun re-render a ogni
 * movimento, il lavoro lo fa il compositor.
 */
export function SpotlightCard({
  children,
  className = "",
  radius = 320,
}: {
  children: ReactNode
  className?: string
  radius?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`group/spot relative isolate ${className}`}
      style={{ ["--spot-r" as string]: `${radius}px` }}
    >
      {/* Alone che insegue il puntatore */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(var(--spot-r) circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--foreground) 10%, transparent), transparent 70%)",
        }}
      />
      {/* Bordo che si illumina dal punto in cui passa il mouse */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          padding: "1px",
          background:
            "radial-gradient(var(--spot-r) circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--foreground) 45%, transparent), transparent 70%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  )
}
