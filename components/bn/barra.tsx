"use client"

import { useEffect, useState } from "react"
import { useLingua } from "@/components/bn/lingua"
import { apriComandi, useDecifra, useOraCosenza } from "@/components/bn/comuni"

function Voce({ href, testo }: { href: string; testo: string }) {
  const { mostrato, avvia } = useDecifra(testo)
  return (
    <a href={href} onPointerEnter={avvia} onFocus={avvia} className="relative py-1 text-tenue transition-colors hover:text-testo">
      {/* Larghezza fissata dal testo vero: le lettere che girano non spostano nulla. */}
      <span aria-hidden className="invisible">{testo}</span>
      <span aria-hidden className="absolute inset-0 py-1">{mostrato}</span>
      <span className="sr-only">{testo}</span>
    </a>
  )
}

/**
 * Capsula di vetro sospesa in alto, come nel primo sito: si stringe quando
 * si scorre. Dentro: monogramma e nome, le sezioni (che si decifrano al
 * passaggio), l'ora di Cosenza, la lingua e il menu dei comandi.
 */
export function Barra({ home = true }: { home?: boolean }) {
  const { t, lingua, cambia } = useLingua()
  // Fuori dalla home i link portano alle sezioni della home.
  const base = home ? "" : "/"
  const ora = useOraCosenza()
  const [stretta, setStretta] = useState(false)

  useEffect(() => {
    const scorri = () => setStretta(window.scrollY > 40)
    scorri()
    window.addEventListener("scroll", scorri, { passive: true })
    return () => window.removeEventListener("scroll", scorri)
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4" data-no-stampa>
      <div
        className={`vetro pointer-events-auto flex items-center rounded-full text-sm transition-[padding,gap] duration-500 ease-[cubic-bezier(0.34,1.4,0.5,1)] ${
          stretta ? "gap-4 py-1.5 pl-2 pr-1.5 sm:gap-5" : "gap-5 py-2 pl-2.5 pr-2 sm:gap-7"
        }`}
      >
        <a href={`${base}#top`} className="flex items-center gap-2.5 font-medium">
          <span className="grid size-7 place-items-center rounded-full bg-carta text-[0.7rem] font-semibold text-inchiostro">
            MI
          </span>
          <span
            className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-500 ${
              stretta ? "max-w-0 opacity-0" : "max-w-[10rem] opacity-100"
            }`}
          >
            Matteo Iazzolino
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label={t("Sezioni", "Sections")}>
          <Voce href={`${base}#progetti`} testo={t("Progetti", "Work")} />
          <Voce href={`${base}#profilo`} testo={t("Profilo", "Profile")} />
          <Voce href={`${base}#percorso`} testo={t("Percorso", "Path")} />
          <Voce href={`${base}#contatti`} testo={t("Contatti", "Contact")} />
        </nav>

        <span className="dato hidden text-tenue lg:inline" suppressHydrationWarning>
          {ora || "--:--:--"}
        </span>
        <button
          type="button"
          onClick={() => cambia()}
          aria-label={t("Switch to English", "Passa all'italiano")}
          className="dato uppercase"
        >
          <span className={lingua === "it" ? "text-testo" : "text-tenue"}>It</span>
          <span className="text-tenue"> / </span>
          <span className={lingua === "en" ? "text-testo" : "text-tenue"}>En</span>
        </button>
        <button
          type="button"
          onClick={apriComandi}
          className="flex items-center gap-2 rounded-full bg-carta px-4 py-1.5 font-medium text-inchiostro transition-opacity hover:opacity-90"
        >
          {t("Menu", "Menu")}
          <kbd className="dato hidden text-inchiostro/60 sm:inline">Ctrl K</kbd>
        </button>
      </div>
    </header>
  )
}
