"use client"

import { useCallback, useRef, useState } from "react"
import { flushSync } from "react-dom"
import Image from "next/image"
import type { Project } from "@/lib/portfolio-data"
import { TechIcon } from "@/components/tech-icon"
import { DeviceMockup } from "@/components/device-mockup"

/**
 * Mosaico dei progetti + scheda di dettaglio.
 *
 * Da lg la griglia è su 12 colonne: i primi due progetti dividono la prima
 * riga (7 + 5), gli altri stanno a tre per riga. Su md due colonne, e se i
 * progetti sono dispari l'ultimo prende tutta la riga invece di lasciare un
 * buco. Tutti i progetti restano visibili insieme, ognuno nella sua card.
 *
 * La scheda è un <dialog> nativo: focus intrappolato, Esc e ritorno del focus
 * sulla card li gestisce il browser.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const origine = useRef<HTMLElement | null>(null)
  const [mostrato, setMostrato] = useState<Project | null>(null)

  const apri = useCallback((project: Project, card: HTMLElement) => {
    origine.current = card
    // Il contenuto deve esistere prima di showModal, altrimenti il focus
    // iniziale finisce sul dialog vuoto.
    flushSync(() => setMostrato(project))
    dialog.current?.showModal()
    document.documentElement.classList.add("dialog-aperto")
  }, [])

  const chiudi = useCallback(() => dialog.current?.close(), [])

  return (
    <>
      <div className="mt-14 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            className={colonne(i, projects.length)}
            onOpen={apri}
          />
        ))}
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="dettaglio-titolo"
        onClose={() => {
          document.documentElement.classList.remove("dialog-aperto")
          // Safari non dà il focus ai pulsanti cliccati col mouse, quindi il
          // browser non sa dove riportarlo: senza questo finiva sul body.
          origine.current?.focus({ preventScroll: true })
        }}
        // Clic sullo sfondo: il bersaglio è il dialog stesso, non il contenuto.
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
        className="project-dialog"
      >
        {mostrato ? <Dettaglio key={mostrato.slug} project={mostrato} onClose={chiudi} /> : null}
      </dialog>
    </>
  )
}

function colonne(i: number, totale: number) {
  const lg = i === 0 ? "lg:col-span-7" : i === 1 ? "lg:col-span-5" : "lg:col-span-4"
  const md = totale % 2 === 1 && i === totale - 1 ? "md:col-span-2" : ""
  return `${lg} ${md}`
}

function ProjectCard({
  project,
  className,
  onOpen,
}: {
  project: Project
  className: string
  onOpen: (p: Project, card: HTMLElement) => void
}) {
  return (
    <article
      className={`glass-flat glass-edge surface-hover story-in group relative flex flex-col overflow-hidden rounded-2xl transition-[translate,border-color] duration-300 hover:-translate-y-1 ${className}`}
    >
      <Copertina project={project} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-medium tracking-tight sm:text-xl">{project.title}</h3>
          <span className="eyebrow shrink-0">{project.year}</span>
        </div>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {project.tagline}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex items-center gap-3 border-t border-[var(--hairline)] pt-4 text-muted-foreground/70 transition-colors duration-300 group-hover:text-muted-foreground">
            {project.stack.slice(0, 5).map((tech) => (
              <TechIcon key={tech} name={tech} className="size-4" />
            ))}
            <span className="ml-auto flex items-center gap-1.5 text-sm text-foreground/80">
              Dettagli
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Tutta la card è cliccabile: il pulsante la copre, il testo resta testo. */}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`Apri i dettagli di ${project.title}`}
        onClick={(e) => onOpen(project, e.currentTarget)}
        className="absolute inset-0 z-10 rounded-2xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-foreground"
      />
    </article>
  )
}

function Copertina({ project }: { project: Project }) {
  const { cover, coverTall } = project

  return (
    <div className="shot-stage relative aspect-[16/10] overflow-hidden border-b border-[var(--hairline)] bg-background/60">
      {cover.frame === "phone" ? (
        <div className="flex h-full items-center justify-center p-5 transition-transform duration-700 group-hover:scale-[1.03]">
          <div className="h-full">
            <DeviceMockup shot={cover} />
          </div>
        </div>
      ) : (
        <>
          <div className="absolute inset-x-0 top-0 z-[1] flex h-6 items-center gap-1.5 border-b border-white/5 bg-neutral-900/90 px-3">
            <span className="size-1.5 rounded-full bg-neutral-600" />
            <span className="size-1.5 rounded-full bg-neutral-600" />
            <span className="size-1.5 rounded-full bg-neutral-600" />
            {cover.frame === "window" ? (
              <span className="flex-1 pr-6 text-center text-[0.72rem] font-medium text-neutral-500">
                {project.title}
              </span>
            ) : null}
          </div>
          <div className="absolute inset-x-0 bottom-0 top-6">
            {/* Con la cattura a tutta pagina, al passaggio del mouse la schermata
                scorre come se si sfogliasse il sito. */}
            <Image
              src={coverTall ?? cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
              className={
                coverTall
                  ? "copertina-scorre object-cover"
                  : "object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              }
            />
          </div>
        </>
      )}

      <span className="eyebrow absolute bottom-3 left-3 z-[2] rounded-full border border-[var(--hairline)] bg-background/85 px-2.5 py-1">
        {project.kind}
      </span>
    </div>
  )
}

function Dettaglio({ project, onClose }: { project: Project; onClose: () => void }) {
  const shots = [project.cover, ...project.gallery]
  const [indice, setIndice] = useState(0)
  const shot = shots[indice]
  const vai = (passo: number) => setIndice((v) => (v + passo + shots.length) % shots.length)

  return (
    <div
      className="flex max-h-[inherit] flex-col"
      onKeyDown={(e) => {
        if (shots.length < 2) return
        if (e.key === "ArrowRight") vai(1)
        if (e.key === "ArrowLeft") vai(-1)
      }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-[var(--hairline)] px-5 py-3 sm:px-7">
        <p className="eyebrow uppercase">
          {project.kind} · {project.year}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi"
          className="grid size-9 place-items-center rounded-full border border-[var(--hairline)] text-lg leading-none text-muted-foreground transition-colors hover:border-[var(--hairline-strong)] hover:text-foreground"
        >
          ×
        </button>
      </div>

      <div className="min-h-0 overflow-y-auto overscroll-contain">
        <div className="px-4 pt-4 sm:px-7 sm:pt-6">
          <div className="shot-stage relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[radial-gradient(70%_60%_at_50%_40%,color-mix(in_oklch,var(--foreground)_7%,transparent),transparent_70%)] p-3 sm:aspect-[16/10] sm:p-6">
            <div key={indice} className="shot-fade flex h-full w-full items-center justify-center">
              <DeviceMockup shot={shot} titolo={project.title} />
            </div>

            {shots.length > 1 ? (
              <>
                <FrecciaGalleria direzione="indietro" onClick={() => vai(-1)} />
                <FrecciaGalleria direzione="avanti" onClick={() => vai(1)} />
              </>
            ) : null}
          </div>

          {/* Contatore fuori dal palco: dentro finiva sopra l'angolo della cornice. */}
          <div className="mt-3 flex min-h-5 items-baseline justify-between gap-4">
            <p className="text-sm text-muted-foreground">{shot.caption}</p>
            {shots.length > 1 ? (
              <span className="eyebrow shrink-0" aria-live="polite">
                {indice + 1} / {shots.length}
              </span>
            ) : null}
          </div>

          {shots.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {shots.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setIndice(i)}
                  aria-label={`Schermata ${i + 1}: ${s.caption ?? s.alt}`}
                  aria-current={i === indice}
                  className={`relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-md border bg-neutral-900 transition-[opacity,border-color] sm:w-28 ${
                    i === indice
                      ? "border-foreground/70 opacity-100"
                      : "border-[var(--hairline)] opacity-55 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={s.src}
                    alt=""
                    fill
                    sizes="112px"
                    className={s.frame === "phone" ? "object-contain" : "object-cover object-top"}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid gap-10 px-5 pb-8 pt-7 sm:px-7 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
          <div>
            <h2
              id="dettaglio-titolo"
              className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
            >
              {project.title}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{project.description}</p>

            <h3 className="eyebrow mt-9 uppercase">Dentro il progetto</h3>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((voce) => (
                <li key={voce} className="flex gap-3 text-pretty leading-relaxed">
                  <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-foreground/50" />
                  {voce}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-7 lg:border-l lg:border-[var(--hairline)] lg:pl-8">
            <div>
              <p className="eyebrow uppercase">Team</p>
              <p className="mt-1.5 text-sm">{project.team}</p>
            </div>

            <div>
              <p className="eyebrow uppercase">Stack</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    <TechIcon name={tech} className="size-3.5" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Visit ↗
                </a>
              ) : null}
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-dyn island rounded-lg px-4 py-2 text-sm font-medium"
                >
                  Code ↗
                </a>
              ) : (
                <span className="rounded-lg border border-dashed border-[var(--hairline-strong)] px-4 py-2 text-sm text-muted-foreground">
                  Codice privato
                </span>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function FrecciaGalleria({
  direzione,
  onClick,
}: {
  direzione: "avanti" | "indietro"
  onClick: () => void
}) {
  const avanti = direzione === "avanti"
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={avanti ? "Schermata successiva" : "Schermata precedente"}
      className={`absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-[var(--hairline-strong)] bg-background/80 text-foreground/80 backdrop-blur transition-colors hover:bg-background hover:text-foreground ${
        avanti ? "right-3" : "left-3"
      }`}
    >
      <span aria-hidden>{avanti ? "→" : "←"}</span>
    </button>
  )
}
