"use client"

import { useEffect, useState } from "react"
import { GlassIsland } from "@/components/glass-island"

const links = [
  { href: "#projects", label: "Progetti" },
  { href: "#about", label: "Profilo" },
  { href: "#experience", label: "Percorso" },
]

/**
 * Nav come isoletta sospesa: capsula di vetro centrata che si contrae quando
 * scorri, invece della classica barra a tutta larghezza.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <GlassIsland
        className={`flex items-center rounded-full ${
          scrolled ? "gap-5 py-1.5 pl-3 pr-1.5" : "gap-8 py-2 pl-5 pr-2"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 text-sm font-medium tracking-tight">
          <span
            className={`island flex items-center justify-center rounded-full bg-foreground font-semibold text-background ${
              scrolled ? "size-6 text-[0.68rem]" : "size-7 text-[0.72rem]"
            }`}
          >
            MI
          </span>
          {/* Il nome si ritira quando la capsula si contrae */}
          <span
            className={`island overflow-hidden whitespace-nowrap ${
              scrolled ? "max-w-0 opacity-0" : "max-w-[12rem] opacity-100"
            }`}
          >
            Matteo Iazzolino
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Contattami
        </a>
      </GlassIsland>
    </header>
  )
}
