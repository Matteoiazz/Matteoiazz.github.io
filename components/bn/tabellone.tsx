"use client"

import { useCallback, useRef, useState } from "react"
import { flushSync } from "react-dom"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react"
import { projects, type Project } from "@/lib/portfolio-data"
import { progettiEn } from "@/lib/inglese"
import { TechIcon } from "@/components/tech-icon"
import { DeviceMockup } from "@/components/device-mockup"
import { Griglia } from "@/components/bn/griglia"
import { Palette } from "@/components/bn/palette"
import { useLingua } from "@/components/bn/lingua"

// Righe del tabellone: quante persone e a che punto è, in breve.
const squadra: Record<string, number> = {
  tripify: 4,
  tesi: 1,
  goldenstay: 2,
  moneymind: 4,
  "muscle-fitness": 1,
  wavely: 3,
  "alghe-4d": 8,
}
const stato = (p: Project, t: <T>(a: T, b: T) => T) =>
  p.slug === "alghe-4d"
    ? t("In partenza", "Boarding")
    : p.slug === "tesi"
      ? t("In corso", "In progress")
      : p.demo
        ? t("Online", "Live")
        : t("Arrivato", "Arrived")

const LARGHEZZA_ANTEPRIMA = 300

/**
 * Tutti i progetti come un tabellone delle partenze: anno, destinazione
 * (il progetto, a palette), tipo, squadra, stato. Passando su una riga il
 * nome rigira e un'anteprima in bianco e nero segue il puntatore; cliccando
 * si apre la scheda del progetto.
 */
export function Tabellone() {
  const { t } = useLingua()
  const anteprima = useRef<HTMLDivElement>(null)
  const dialogo = useRef<HTMLDialogElement>(null)
  const origine = useRef<HTMLElement | null>(null)
  const [sopra, setSopra] = useState<string | null>(null)
  const [giri, setGiri] = useState<Record<string, number>>({})
  const [aperto, setAperto] = useState<Project | null>(null)

  const muovi = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !anteprima.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    const destra = x > r.width * 0.5
    anteprima.current.style.setProperty("--px", `${destra ? x - LARGHEZZA_ANTEPRIMA - 32 : x + 32}px`)
    anteprima.current.style.setProperty("--py", `${e.clientY - r.top - LARGHEZZA_ANTEPRIMA * 0.33}px`)
  }

  const apri = useCallback((p: Project, el: HTMLElement) => {
    origine.current = el
    flushSync(() => setAperto(p))
    dialogo.current?.showModal()
    document.documentElement.classList.add("scheda-aperta")
  }, [])

  return (
    <section className="chiaro relative py-24 md:py-32">
      <Griglia />
      <div className="contenitore relative z-10">
        <div className="grid grid-cols-4 items-end gap-x-[var(--passo)] gap-y-6 md:grid-cols-12">
          <h2 className="col-span-4 text-[clamp(2.6rem,7vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.035em] [font-variation-settings:'wdth'_80] md:col-span-7">
            {t("Tutti i progetti", "All the work")}
          </h2>
          <p className="col-span-4 max-w-[40ch] text-pretty text-tenue md:col-span-4 md:col-start-9">
            {t(
              "Sette progetti in partenza e in arrivo: università, tesi, magistrale e lavori personali. Passa su una riga per vederla, cliccala per la scheda.",
              "Seven projects departing and arriving: university, thesis, master's and personal work. Hover a row to see it, click it for details.",
            )}
          </p>
        </div>

        {/* Il tabellone vero: una lastra nera come quelli delle stazioni. */}
        <div className="scuro relative mt-12 border border-inchiostro" onPointerMove={muovi} onPointerLeave={() => setSopra(null)}>
          <div
            aria-hidden
            className="dato hidden grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,11rem)_5rem_7rem] gap-4 border-b border-riga-forte px-5 py-3 uppercase text-tenue md:grid"
          >
            <span>{t("Anno", "Year")}</span>
            <span>{t("Destinazione", "Destination")}</span>
            <span>{t("Tipo", "Type")}</span>
            <span>{t("Squadra", "Team")}</span>
            <span className="text-right">{t("Stato", "Status")}</span>
          </div>
          <ol>
            {projects.map((p) => {
              const en = progettiEn[p.slug]
              return (
                <li key={p.slug} className="group relative border-b border-riga last:border-b-0">
                  <div className="grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 transition-colors duration-200 group-hover:bg-carta group-hover:text-inchiostro md:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,11rem)_5rem_7rem] md:py-5">
                    <span className="dato">{p.year}</span>
                    <span className="min-w-0">
                      <span className="hidden md:inline-flex">
                        <Palette
                          key={giri[p.slug] ?? 0}
                          frasi={[p.title]}
                          caselle={24}
                          className="text-[1.15rem]"
                          classeCasella="bg-[#1d1d1d] text-carta after:bg-black/60 group-hover:bg-inchiostro"
                        />
                      </span>
                      <span className="block truncate text-lg font-semibold md:hidden">{p.title}</span>
                    </span>
                    <span className="hidden truncate text-sm md:block">{t(p.kind, en.kind)}</span>
                    <span className="dato hidden md:block">
                      {squadra[p.slug] === 1 ? t("da solo", "solo") : `${squadra[p.slug]} ${t("pers.", "ppl")}`}
                    </span>
                    <span className="dato flex items-center justify-end gap-2 text-right">
                      <span
                        aria-hidden
                        className={`size-1.5 rounded-full bg-current ${p.slug === "alghe-4d" ? "animate-pulse" : ""}`}
                      />
                      {stato(p, t)}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-label={t(`Apri la scheda di ${p.title}`, `Open ${p.title} details`)}
                    data-cursore={t("Apri", "Open")}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") {
                        setSopra(p.slug)
                        setGiri((g) => ({ ...g, [p.slug]: (g[p.slug] ?? 0) + 1 }))
                      }
                    }}
                    onClick={(e) => apri(p, e.currentTarget)}
                    className="absolute inset-0 z-10 focus-visible:outline-offset-[-3px]"
                  />
                </li>
              )
            })}
          </ol>

          <div
            ref={anteprima}
            aria-hidden
            className={`pointer-events-none absolute left-0 top-0 z-20 hidden aspect-[16/10] overflow-hidden border border-inchiostro bg-[#151515] shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)] md:block ${
              sopra ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: LARGHEZZA_ANTEPRIMA,
              translate: "var(--px, 0px) var(--py, 0px)",
              transition: "translate 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.25s ease",
            }}
          >
            {projects.map((p) => (
              <Image
                key={p.slug}
                src={p.cover.src}
                alt=""
                fill
                sizes={`${LARGHEZZA_ANTEPRIMA}px`}
                className={`grayscale transition-opacity duration-200 ${sopra === p.slug ? "opacity-100" : "opacity-0"} ${
                  p.cover.frame === "phone" ? "object-contain" : "object-cover object-top"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <dialog
        ref={dialogo}
        aria-labelledby="scheda-titolo"
        className="scheda chiaro"
        onClose={() => {
          document.documentElement.classList.remove("scheda-aperta")
          origine.current?.focus({ preventScroll: true })
        }}
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      >
        {aperto ? <Scheda key={aperto.slug} p={aperto} chiudi={() => dialogo.current?.close()} /> : null}
      </dialog>
    </section>
  )
}

function Scheda({ p, chiudi }: { p: Project; chiudi: () => void }) {
  const { t } = useLingua()
  const en = progettiEn[p.slug]
  const schermate = [p.cover, ...p.gallery]
  const [i, setI] = useState(0)
  const s = schermate[i]
  const vai = (d: number) => setI((v) => (v + d + schermate.length) % schermate.length)

  return (
    <div
      className="grid max-h-[calc(100svh-1rem)] overflow-y-auto lg:h-[min(46rem,calc(100svh-3rem))] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:overflow-hidden"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") vai(1)
        if (e.key === "ArrowLeft") vai(-1)
      }}
    >
      <div className="scuro relative flex flex-col p-4 sm:p-6">
        <div className="shot-stage relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:flex-1">
          <div key={i} className="flex h-full w-full items-center justify-center [animation:accesa_0.4s_ease_both]">
            <DeviceMockup shot={s} titolo={p.title} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-sm text-tenue">{s.caption}</p>
          {schermate.length > 1 ? (
            <div className="flex items-center gap-2">
              <span className="dato mr-2 text-tenue">
                {i + 1} / {schermate.length}
              </span>
              <button type="button" onClick={() => vai(-1)} aria-label={t("Schermata precedente", "Previous screen")} className="grid size-9 place-items-center border border-riga-forte hover:bg-carta hover:text-inchiostro">
                <ArrowLeft className="size-4" />
              </button>
              <button type="button" onClick={() => vai(1)} aria-label={t("Schermata successiva", "Next screen")} className="grid size-9 place-items-center border border-riga-forte hover:bg-carta hover:text-inchiostro">
                <ArrowRight className="size-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative flex flex-col p-6 sm:p-8 lg:overflow-y-auto">
        <button type="button" onClick={chiudi} aria-label={t("Chiudi", "Close")} className="absolute right-4 top-4 grid size-10 place-items-center border border-inchiostro hover:bg-inchiostro hover:text-carta">
          <X className="size-4" />
        </button>
        <p className="dato text-tenue">
          {t(p.kind, en.kind)} · {p.year}
        </p>
        <h2 id="scheda-titolo" className="mt-3 pr-12 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[0.95] tracking-[-0.03em] [font-variation-settings:'wdth'_82]">
          {p.title}
        </h2>
        <p className="mt-3 text-sm text-tenue">{t(p.team, en.team)}</p>
        <p className="mt-6 text-pretty leading-relaxed">{t(p.description, en.tagline)}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((tech) => (
            <li key={tech} className="flex items-center gap-1.5 border border-riga-forte px-2.5 py-1 text-xs">
              <TechIcon name={tech} className="size-3.5" />
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          {p.casoStudio ? (
            <a href={`/progetti/${p.slug}/`} className="flex items-center gap-2 bg-inchiostro px-4 py-2.5 text-sm font-medium text-carta">
              {t("Caso di studio", "Case study")}
              <ArrowRight className="size-4" />
            </a>
          ) : null}
          {p.demo ? (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-inchiostro px-4 py-2.5 text-sm font-medium hover:bg-inchiostro hover:text-carta">
              {t("Sito online", "Live site")}
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}
          {p.repo ? (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-inchiostro px-4 py-2.5 text-sm font-medium hover:bg-inchiostro hover:text-carta">
              {t("Codice", "Code")}
              <ArrowUpRight className="size-4" />
            </a>
          ) : (
            <span className="border border-dashed border-riga-forte px-4 py-2.5 text-sm text-tenue">{t("Codice privato", "Private code")}</span>
          )}
        </div>
      </div>
    </div>
  )
}
