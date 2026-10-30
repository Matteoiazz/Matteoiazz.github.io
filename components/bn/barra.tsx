"use client"

import { useLingua } from "@/components/bn/lingua"
import { apriComandi, useDecifra, useOraCosenza } from "@/components/bn/comuni"

function Voce({ href, testo }: { href: string; testo: string }) {
  const { mostrato, avvia } = useDecifra(testo)
  return (
    <a href={href} onPointerEnter={avvia} onFocus={avvia} className="relative py-1 hover:underline">
      {/* Larghezza fissata dal testo vero: le lettere che girano non spostano nulla. */}
      <span aria-hidden className="invisible">{testo}</span>
      <span aria-hidden className="absolute inset-0 py-1">{mostrato}</span>
      <span className="sr-only">{testo}</span>
    </a>
  )
}

/**
 * Barra in alto in inversione di colore (mix-blend-mode: difference): si
 * legge sul bianco e sul nero senza sapere su quale capitolo si trova.
 * Ora di Cosenza dal vivo, lingua, menu dei comandi.
 */
export function Barra({ home = true }: { home?: boolean }) {
  const { t, lingua, cambia } = useLingua()
  // Fuori dalla home i link portano alle sezioni della home.
  const base = home ? "" : "/"
  const ora = useOraCosenza()
  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference"
      data-no-stampa
    >
      <div className="contenitore flex items-center justify-between gap-6 py-4 text-sm">
        <a href={`${base}#top`} className="pointer-events-auto font-semibold [font-variation-settings:'wdth'_85]">
          Matteo Iazzolino
        </a>

        <nav className="pointer-events-auto hidden items-center gap-7 md:flex" aria-label={t("Sezioni", "Sections")}>
          <Voce href={`${base}#progetti`} testo={t("Progetti", "Work")} />
          <Voce href={`${base}#profilo`} testo={t("Profilo", "Profile")} />
          <Voce href={`${base}#percorso`} testo={t("Percorso", "Path")} />
          <Voce href={`${base}#contatti`} testo={t("Contatti", "Contact")} />
        </nav>

        <div className="pointer-events-auto flex items-center gap-4 sm:gap-6">
          <span className="dato hidden tabular-nums lg:inline" suppressHydrationWarning>
            Cosenza {ora || "--:--:--"}
          </span>
          <button
            type="button"
            onClick={() => cambia()}
            aria-label={t("Switch to English", "Passa all'italiano")}
            className="dato uppercase"
          >
            <span className={lingua === "it" ? "underline" : "opacity-50"}>It</span>
            {" / "}
            <span className={lingua === "en" ? "underline" : "opacity-50"}>En</span>
          </button>
          <button type="button" onClick={apriComandi} className="flex items-center gap-2">
            <span>{t("Menu", "Menu")}</span>
            <kbd className="dato hidden rounded-[2px] border border-white/40 px-1.5 py-0.5 sm:inline">Ctrl K</kbd>
          </button>
        </div>
      </div>
    </header>
  )
}
