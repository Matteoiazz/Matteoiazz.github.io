"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { profile } from "@/lib/portfolio-data"
import { useLingua } from "@/components/foglio/lingua"
import { apriComandi, useScorciatoia } from "@/components/foglio/comuni"

export const sezioni = [
  { id: "progetti", it: "Progetti", en: "Work" },
  { id: "chi-sono", it: "Chi sono", en: "About" },
  { id: "stack", it: "Stack", en: "Stack" },
  { id: "percorso", it: "Percorso", en: "Path" },
  { id: "contatti", it: "Contatti", en: "Contact" },
]

/**
 * Barra in alto: il nome con il fiore a sinistra, le sezioni, la lingua e il
 * menu a destra. Scendendo si toglie di mezzo, risalendo torna; appena la
 * pagina si muove le compare sotto un filetto.
 */
export function Barra({ home = true }: { home?: boolean }) {
  const { t, lingua, cambia } = useLingua()
  const [nascosta, setNascosta] = useState(false)
  const [staccata, setStaccata] = useState(false)
  const [attiva, setAttiva] = useState<string | null>(null)
  const scorciatoia = useScorciatoia()

  useEffect(() => {
    let ultimo = window.scrollY
    const scorri = () => {
      const y = window.scrollY
      setStaccata(y > 8)
      if (Math.abs(y - ultimo) > 6) {
        setNascosta(y > ultimo && y > 320)
        ultimo = y
      }
      // Attiva è l'ultima sezione cominciata sopra la metà dello schermo;
      // in cima alla pagina, nessuna.
      if (home) {
        let corrente: string | null = null
        for (const s of sezioni) {
          const el = document.getElementById(s.id)
          if (el && el.getBoundingClientRect().top < innerHeight * 0.5) corrente = s.id
        }
        setAttiva(corrente)
      }
    }
    scorri()
    window.addEventListener("scroll", scorri, { passive: true })
    return () => window.removeEventListener("scroll", scorri)
  }, [home])

  return (
    <header
      data-no-stampa
      className={`fixed inset-x-0 top-0 z-50 bg-carta transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        nascosta ? "-translate-y-full" : ""
      } ${staccata ? "shadow-[0_1px_0_var(--riga)]" : ""}`}
    >
      <nav aria-label={t("Principale", "Main")} className="contenitore flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5 text-[0.95rem] font-medium tracking-[-0.01em]">
          <Image
            src="/fiore-bianco.webp"
            alt=""
            width={24}
            height={24}
            className="size-6 object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[60deg]"
          />
          {profile.name}
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-2 hidden items-center lg:flex">
            {sezioni.map((s) => (
              <li key={s.id}>
                <a
                  href={home ? `#${s.id}` : `/#${s.id}`}
                  aria-current={attiva === s.id ? "true" : undefined}
                  className={`block px-3 py-2 text-[0.9rem] transition-colors ${
                    attiva === s.id ? "text-inchiostro" : "text-grigio hover:text-inchiostro"
                  }`}
                >
                  {t(s.it, s.en)}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => cambia()}
            aria-label={t("Switch to English", "Passa all'italiano")}
            className="flex h-9 items-center gap-1 rounded-full px-2.5 text-[0.85rem] font-medium"
          >
            <span className={lingua === "it" ? "text-inchiostro" : "text-grigio"}>IT</span>
            <span aria-hidden className="text-riga-forte">/</span>
            <span className={lingua === "en" ? "text-inchiostro" : "text-grigio"}>EN</span>
          </button>

          <button
            type="button"
            onClick={apriComandi}
            aria-keyshortcuts="Control+K Meta+K"
            className="pillola pillola-filo min-h-9 gap-2.5 px-3.5 py-0 text-[0.85rem]"
          >
            Menu
            <kbd className="hidden font-sans text-[0.75rem] text-grigio pointer-fine:sm:inline">{scorciatoia}</kbd>
          </button>
        </div>
      </nav>
    </header>
  )
}
