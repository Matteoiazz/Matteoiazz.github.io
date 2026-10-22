import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { projects } from "@/lib/portfolio-data"
import { casiStudio, casoStudio } from "@/lib/casi-studio"
import { ParolaCromata } from "@/components/parola-cromata"
import { DeviceMockup } from "@/components/device-mockup"
import { TechIcon } from "@/components/tech-icon"
import { BloccoCodice } from "@/components/blocco-codice"
import { GlassIsland } from "@/components/glass-island"

// Export statico: esistono solo le pagine generate qui sotto.
export const dynamicParams = false

export function generateStaticParams() {
  return projects.filter((p) => p.casoStudio && casoStudio(p.slug)).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const progetto = projects.find((p) => p.slug === slug)
  if (!progetto) return {}
  return {
    title: `${progetto.title} · Matteo Iazzolino`,
    description: progetto.tagline,
  }
}

/**
 * Caso di studio di un progetto: il problema, lo schema dell'architettura, i
 * passaggi più interessanti con il codice vero, i numeri e le schermate.
 * Stessa lingua visiva della home: parola cromata in apertura, vetro, mono.
 */
export default async function CasoDiStudio({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const caso = casoStudio(slug)
  const progetto = projects.find((p) => p.slug === slug)
  if (!caso || !progetto) notFound()

  const indice = casiStudio.findIndex((c) => c.slug === slug)
  const successivo = casiStudio[(indice + 1) % casiStudio.length]
  const progettoSuccessivo = projects.find((p) => p.slug === successivo.slug)!
  const schermate = [progetto.cover, ...progetto.gallery]

  return (
    <main className="relative overflow-x-clip">
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <GlassIsland className="flex items-center gap-4 rounded-full py-1.5 pl-4 pr-1.5 text-sm sm:gap-6">
          <Link href="/#projects" className="text-muted-foreground transition-colors hover:text-foreground">
            ← Progetti
          </Link>
          <span className="hidden max-w-[14rem] truncate font-medium sm:block">{progetto.title}</span>
          <Link
            href="/#contact"
            className="rounded-full bg-foreground px-4 py-1.5 font-medium text-background transition-opacity hover:opacity-90"
          >
            Contattami
          </Link>
        </GlassIsland>
      </header>

      {/* Apertura */}
      <section className="contenitore relative z-10 pt-32 sm:pt-40">
        <p className="eyebrow fade-up uppercase">
          {progetto.kind} · {progetto.year}
        </p>
        <ParolaCromata testo={progetto.title} className="mt-8" />
        <h1 className="sr-only">{progetto.title}</h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-16">
          <p className="fade-up text-pretty text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-[1.35] tracking-[-0.015em] text-foreground/90">
            {caso.sommario}
          </p>
          <dl className="fade-up space-y-5 border-t border-[var(--hairline)] pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-1">
            <div>
              <dt className="eyebrow uppercase">Il mio ruolo</dt>
              <dd className="mt-1.5 text-sm leading-relaxed">{caso.ruolo}</dd>
            </div>
            <div>
              <dt className="eyebrow uppercase">Contesto</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{progetto.team}</dd>
            </div>
            <div>
              <dt className="eyebrow uppercase">Stack</dt>
              <dd className="mt-2.5 flex flex-wrap gap-2">
                {progetto.stack.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    <TechIcon name={t} className="size-3.5" />
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              {progetto.demo ? (
                <a
                  href={progetto.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Visit ↗
                </a>
              ) : null}
              {progetto.repo ? (
                <a
                  href={progetto.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-dyn island rounded-lg px-4 py-2 text-sm font-medium"
                >
                  Code ↗
                </a>
              ) : null}
            </div>
          </dl>
        </div>

        <div className="shot-stage story-in relative mt-16 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[radial-gradient(70%_60%_at_50%_40%,color-mix(in_oklch,var(--foreground)_8%,transparent),transparent_70%)] p-4 sm:mt-20 sm:aspect-[16/9] sm:p-10">
          <div className="flex h-full w-full items-center justify-center gap-[3%]">
            {progetto.cover.frame === "phone"
              ? schermate
                  .filter((s) => s.frame === "phone")
                  .slice(0, 3)
                  .map((s) => (
                    <div key={s.src} className="h-full" style={{ containerType: "size", aspectRatio: "9 / 19.5" }}>
                      <DeviceMockup shot={s} />
                    </div>
                  ))
              : <DeviceMockup shot={progetto.cover} titolo={progetto.title} sizes="90vw" />}
          </div>
        </div>
      </section>

      {/* Numeri */}
      <section className="contenitore relative z-10 mt-20 sm:mt-28">
        <dl className="grid grid-cols-2 border-y border-[var(--hairline)] md:grid-cols-4">
          {caso.numeri.map((n, i) => (
            <div
              key={n.k}
              className={`story-in flex flex-col border-[var(--hairline)] py-7 pr-4 ${
                ["border-r border-b md:border-b-0", "pl-5 border-b md:border-b-0 md:border-r md:pl-6", "border-r md:pl-6", "pl-5 md:pl-6"][i]
              }`}
            >
              <dt className="eyebrow order-2 mt-3 uppercase">{n.k}</dt>
              <dd className="title-fade order-1 text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.04em]">
                {n.v}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Architettura */}
      <section className="contenitore relative z-10 mt-24 sm:mt-32">
        <div className="grid gap-10 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16">
          <div className="story-in md:sticky md:top-24 md:self-start">
            <p className="eyebrow">00</p>
            <h2 className="title-fade mt-3 text-[clamp(1.7rem,2.8vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              Come è fatto
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              {caso.architettura.didascalia}
            </p>
            <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2.5 rounded-sm border border-foreground/70 bg-foreground/15" /> la mia parte
            </p>
          </div>
          <div className="story-in space-y-3">
            {caso.architettura.livelli.map((livello, li) => (
              <div key={livello.nome}>
                {li > 0 ? (
                  <div aria-hidden className="mx-auto mb-3 h-5 w-px bg-gradient-to-b from-foreground/10 to-foreground/40" />
                ) : null}
                <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <p className="eyebrow uppercase">{livello.nome}</p>
                  <div className="flex flex-wrap gap-2.5">
                    {livello.blocchi.map((b) => (
                      <div
                        key={b.nome}
                        className="glass-flat min-w-[9rem] flex-1 rounded-xl px-4 py-3"
                        // In linea: .glass-flat sta fuori dai layer di Tailwind e
                        // vincerebbe sulle classi del bordo.
                        style={b.mio ? { borderColor: "color-mix(in oklch, var(--foreground) 45%, transparent)" } : undefined}
                      >
                        <p className="text-sm font-medium">{b.nome}</p>
                        {b.nota ? <p className="mt-0.5 text-xs text-muted-foreground">{b.nota}</p> : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capitoli */}
      {caso.capitoli.map((cap, i) => (
        <section key={cap.titolo} className="contenitore relative z-10 mt-24 sm:mt-32">
          <div className="grid gap-10 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16">
            <div className="story-in md:sticky md:top-24 md:self-start">
              <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="title-fade mt-3 text-balance text-[clamp(1.7rem,2.8vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                {cap.titolo}
              </h2>
            </div>
            <div className="min-w-0 space-y-8">
              <div className="story-in space-y-4">
                {cap.testo.map((t) => (
                  <p key={t.slice(0, 24)} className="text-pretty text-[1.05rem] leading-relaxed text-muted-foreground">
                    {t}
                  </p>
                ))}
              </div>
              {cap.codice ? (
                <div className="story-in">
                  <BloccoCodice codice={cap.codice} />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {/* Schermate */}
      {schermate.length > 1 ? (
        <section className="contenitore relative z-10 mt-24 sm:mt-32">
          <h2 className="title-fade text-[clamp(1.7rem,2.8vw,2.5rem)] font-semibold tracking-[-0.03em]">Schermate</h2>
          <div
            className={`mt-8 grid gap-5 ${
              progetto.cover.frame === "phone" ? "grid-cols-2 md:grid-cols-4" : "md:grid-cols-2"
            }`}
          >
            {schermate.map((s) => (
              <figure key={s.src} className="story-in">
                {/* Il formato del palco segue il progetto, non la singola schermata:
                    in una web app la versione da telefono sta in un palco come gli
                    altri, alta quanto lui, invece di diventare una colonna enorme. */}
                <div
                  className={`shot-stage relative w-full ${
                    progetto.cover.frame === "phone" ? "aspect-[9/19.5]" : "aspect-[16/10.6]"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <DeviceMockup shot={s} titolo={progetto.title} sizes="(min-width: 768px) 45vw, 92vw" />
                  </div>
                </div>
                <figcaption className="mt-3 text-sm text-muted-foreground">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* Prossimo caso di studio */}
      <section className="contenitore relative z-10 mb-10 mt-28 sm:mt-40">
        <Link
          href={`/progetti/${successivo.slug}/`}
          className="group glass-flat glass-edge block overflow-hidden rounded-2xl px-6 pb-8 pt-7 sm:px-10 sm:pb-10"
          data-cursore="Apri"
        >
          <div className="flex items-baseline justify-between gap-4">
            <p className="eyebrow uppercase">Prossimo caso di studio</p>
            <span aria-hidden className="text-2xl transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </div>
          <ParolaCromata testo={progettoSuccessivo.title} className="mt-6" />
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">{progettoSuccessivo.tagline}</p>
        </Link>
        <footer className="mt-10 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <Link href="/" className="transition-colors hover:text-foreground">
            ← Torna al portfolio
          </Link>
          <span className="eyebrow">Matteo Iazzolino · {progetto.kind}</span>
        </footer>
      </section>
    </main>
  )
}
