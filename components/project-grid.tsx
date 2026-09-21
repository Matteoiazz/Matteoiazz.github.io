"use client"

import { useCallback, useRef, useState } from "react"
import { flushSync } from "react-dom"
import Image from "next/image"
import type { Project } from "@/lib/portfolio-data"
import { TechIcon, conLogoDistinto } from "@/components/tech-icon"
import { DeviceMockup } from "@/components/device-mockup"

/**
 * Mosaico dei progetti + scheda di dettaglio.
 *
 * Da lg la griglia è su 12 colonne, a coppie: 7 + 5, poi 5 + 7 a zigzag, e
 * l'ultima coppia 6 + 6. Con sei progetti a tre per riga l'ultima riga
 * restava con una card sola e un buco di due terzi. Su md due colonne, e se i
 * progetti sono dispari l'ultimo prende tutta la riga. Tutti i progetti
 * restano visibili insieme, ognuno nella sua card.
 *
 * La scheda è un <dialog> nativo: focus intrappolato, Esc e ritorno del focus
 * sulla card li gestisce il browser. Da lg galleria e testo stanno affiancati
 * in una scheda alta quanto lo schermo: prima la schermata occupava tutta la
 * larghezza, era più alta dello schermo e titolo e pulsanti restavano sotto.
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
  const ultimaCoppia = totale % 2 === 0 && i >= totale - 2
  const zigzag = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"]
  const soloUltimo = totale % 2 === 1 && i === totale - 1
  const lg = soloUltimo ? "lg:col-span-12" : ultimaCoppia && totale > 4 ? "lg:col-span-6" : zigzag[i % 4]
  const md = soloUltimo ? "md:col-span-2" : ""
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

      {/* Visit sulla copertina, sopra il pulsante che apre la scheda. Sta in
          un livello a parte grande quanto la copertina: dentro .shot-stage
          (container-type crea un contesto di impilamento) il pulsante che
          copre la card gli passerebbe sopra e il link non si potrebbe cliccare. */}
      {project.demo ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 aspect-[16/10]">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit: apri il sito di ${project.title} in una nuova scheda`}
            className="pointer-events-auto absolute bottom-3 right-3 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background shadow-lg shadow-black/40 transition-opacity hover:opacity-90"
          >
            Visit ↗
          </a>
        </div>
      ) : null}

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
            {conLogoDistinto(project.stack)
              .slice(0, 5)
              .map((tech) => (
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
        // App mobile: tre schermate affiancate, la copertina al centro e più
        // grande. Un telefono solo, in una card larga, lasciava due fasce vuote.
        <div className="flex h-full items-center justify-center gap-[3%] px-5 py-4 transition-transform duration-700 group-hover:scale-[1.03]">
          {telefoni(project).map((shot, i, tutti) => {
            const centrale = tutti.length === 1 || i === 1
            return (
              <div
                key={shot.src}
                className={centrale ? "h-full" : "h-[84%] opacity-80"}
                // Ogni telefono è il proprio contenitore: la cornice (100cqh) prende
                // l'altezza di questo riquadro e non quella di tutta la copertina.
                style={{ containerType: "size", aspectRatio: "9 / 19.5" }}
              >
                <DeviceMockup shot={shot} />
              </div>
            )
          })}
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

/** Schermate da telefono per la copertina: la copertina al centro, due laterali. */
function telefoni(project: Project) {
  const altre = project.gallery.filter((s) => s.frame === "phone").slice(0, 2)
  if (altre.length < 2) return [project.cover]
  return [altre[0], project.cover, altre[1]]
}

function Dettaglio({ project, onClose }: { project: Project; onClose: () => void }) {
  const shots = [project.cover, ...project.gallery]
  const [indice, setIndice] = useState(0)
  const shot = shots[indice]
  const vai = (passo: number) => setIndice((v) => (v + passo + shots.length) % shots.length)

  return (
    <div
      className="relative flex max-h-[inherit] flex-col lg:h-full"
      onKeyDown={(e) => {
        if (shots.length < 2) return
        if (e.key === "ArrowRight") vai(1)
        if (e.key === "ArrowLeft") vai(-1)
      }}
    >
      {/* Sotto lg è una barra in testa, così la × resta sempre a portata.
          Da lg la barra sparisce: tipo e anno vanno sopra il titolo e la ×
          galleggia nell'angolo, lasciando quei 57px alla schermata. */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--hairline)] px-5 py-3 sm:px-7 lg:absolute lg:right-5 lg:top-5 lg:z-10 lg:border-0 lg:p-0">
        <p className="eyebrow uppercase lg:hidden">
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

      {/* Sotto lg scorre tutta la scheda; da lg le due colonne stanno ferme
          e scorre solo il testo, se non ci sta. */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:overflow-hidden xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="px-4 pt-4 sm:px-7 sm:pt-6 lg:flex lg:min-h-0 lg:flex-col lg:py-5 lg:pl-6 lg:pr-5">
          {/* Da lg il palco prende tutta l'altezza libera: la cornice si
              adatta (container query) e la schermata resta grande, ma intera. */}
          <div className="shot-stage relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[radial-gradient(70%_60%_at_50%_40%,color-mix(in_oklch,var(--foreground)_7%,transparent),transparent_70%)] p-3 sm:aspect-[16/10] sm:p-6 lg:aspect-auto lg:min-h-0 lg:flex-1 lg:px-6 lg:py-3">
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
          <div className="mt-3 flex min-h-5 shrink-0 items-baseline justify-between gap-4">
            <p className="text-sm text-muted-foreground">{shot.caption}</p>
            {shots.length > 1 ? (
              <span className="eyebrow shrink-0" aria-live="polite">
                {indice + 1} / {shots.length}
              </span>
            ) : null}
          </div>

          {shots.length > 1 ? (
            <div className="mt-3 flex shrink-0 gap-2 overflow-x-auto pb-1">
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

        {/* Testo: titolo e pulsanti in cima, così si vedono appena si apre. */}
        <div className="px-5 pb-8 pt-7 sm:px-7 lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:border-l lg:border-[var(--hairline)] lg:pb-7 lg:pt-7">
          <p className="eyebrow hidden uppercase lg:block">
            {project.kind} · {project.year}
          </p>
          <h2
            id="dettaglio-titolo"
            className="text-[clamp(1.8rem,4vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] lg:mt-3"
          >
            {project.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{project.team}</p>

          <div className="mt-5 flex flex-wrap gap-3">
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

          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground lg:text-[0.95rem]">
            {project.description}
          </p>

          <h3 className="eyebrow mt-8 uppercase">Stack</h3>
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

          <h3 className="eyebrow mt-8 uppercase">Dentro il progetto</h3>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((voce) => (
              <li key={voce} className="flex gap-3 text-pretty leading-relaxed lg:text-[0.95rem]">
                <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-foreground/50" />
                {voce}
              </li>
            ))}
          </ul>
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
