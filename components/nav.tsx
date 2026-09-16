"use client"

import { useEffect, useRef, useState } from "react"
import { GlassIsland } from "@/components/glass-island"

const links = [
  { href: "#projects", label: "Progetti" },
  { href: "#about", label: "Profilo" },
  { href: "#experience", label: "Percorso" },
]

/**
 * Nav come isoletta sospesa: capsula di vetro centrata che si contrae quando
 * scorri, invece della classica barra a tutta larghezza.
 *
 * Sotto md i link non ci stanno nella capsula e finivano nascosti: da telefono
 * si poteva solo scorrere. Lì compare un menu che apre le stesse voci.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menu) return
    const fuori = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) setMenu(false)
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false)
    }
    document.addEventListener("pointerdown", fuori)
    document.addEventListener("keydown", esc)
    return () => {
      document.removeEventListener("pointerdown", fuori)
      document.removeEventListener("keydown", esc)
    }
  }, [menu])

  return (
    <header ref={header} className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <GlassIsland
        className={`flex items-center rounded-full ${
          scrolled ? "gap-4 py-1.5 pl-3 pr-1.5 sm:gap-5" : "gap-5 py-2 pl-5 pr-2 sm:gap-8"
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

        <button
          type="button"
          onClick={() => setMenu((v) => !v)}
          aria-expanded={menu}
          aria-controls="menu-sezioni"
          aria-label={menu ? "Chiudi il menu" : "Apri il menu delle sezioni"}
          className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:hidden"
        >
          <span aria-hidden className="relative block h-[9px] w-4">
            <span
              className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ${
                menu ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 top-1 h-px bg-current transition-opacity duration-200 ${
                menu ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 ${
                menu ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <a
          href="#contact"
          className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Contattami
        </a>
      </GlassIsland>

      {menu ? (
        <div
          id="menu-sezioni"
          className="island-swap absolute top-[calc(100%+0.6rem)] w-[min(18rem,calc(100vw-2rem))] md:hidden"
        >
          {/* Fondo quasi pieno, non il vetro della capsula: il menu si apre
              sopra il fiore cromato e con il vetro le voci non si leggevano. */}
          <div className="glass-edge rounded-2xl border border-[var(--hairline-strong)] bg-[color-mix(in_oklch,var(--background)_92%,transparent)] p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                className="block rounded-xl px-4 py-3 text-sm text-foreground/85 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
