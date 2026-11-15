"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { contact, experiences, profile, projects, stack } from "@/lib/portfolio-data"
import { gruppiEn, introEn, percorsoEn, progettiEn } from "@/lib/inglese"
import { useLingua } from "@/components/foglio/lingua"
import { TechIcon } from "@/components/tech-icon"

// Il PDF pubblicato qui è senza numero di telefono: il numero resta solo nella
// copia da allegare alle candidature. Esiste solo in italiano, e in inglese il
// pulsante lo dice.
const PDF = "/Matteo_Iazzolino_CV.pdf"

const collegamenti = [
  { label: contact.email, href: `mailto:${contact.email}` },
  { label: "matteoiazz.vercel.app", href: "https://matteoiazz.vercel.app" },
  { label: "linkedin.com/in/matteoiazzolino", href: contact.linkedin },
  { label: "github.com/Matteoiazz", href: contact.github },
]

function Sezione({ titolo, children }: { titolo: string; children: ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="eyebrow uppercase">{titolo}</h2>
      <div className="hairline mt-3" />
      <div className="mt-5">{children}</div>
    </section>
  )
}

/**
 * Curriculum in pagina, nello stile del sito, con il PDF da scaricare.
 * Tutto viene da portfolio-data.ts (e da inglese.ts per l'altra lingua):
 * progetti, percorso e competenze restano gli stessi del portfolio senza
 * doverli aggiornare in due posti. La lingua è quella scelta nel sito e si
 * cambia anche da qui.
 */
export function Curriculum() {
  const { t, lingua, cambia } = useLingua()
  const inglese = lingua === "en"

  const lingue = [
    { k: t("Italiano", "Italian"), v: t("Madrelingua", "Native") },
    { k: t("Inglese", "English"), v: "B2" },
    { k: t("Patente", "Driving licence"), v: "B" },
  ]

  return (
    <main className="contenitore relative z-10 pb-20 pt-8 sm:pt-12">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3" data-no-stampa>
        <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          {t("← Torna al portfolio", "← Back to the portfolio")}
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => cambia()}
            aria-label={t("Switch to English", "Passa all'italiano")}
            className="flex h-9 items-center gap-1 rounded-full px-2.5 text-[0.85rem] font-medium"
          >
            <span className={inglese ? "text-grigio" : "text-inchiostro"}>IT</span>
            <span aria-hidden className="text-riga-forte">
              /
            </span>
            <span className={inglese ? "text-inchiostro" : "text-grigio"}>EN</span>
          </button>
          <a
            href={PDF}
            download="Matteo_Iazzolino_CV.pdf"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t("Scarica PDF ↓", "Download PDF (in Italian) ↓")}
          </a>
        </div>
      </div>

      <article className="glass-flat mx-auto mt-6 max-w-4xl overflow-hidden rounded-[22px] px-6 py-9 sm:px-12 sm:py-12">
        <header>
          <p className="eyebrow uppercase">Curriculum vitae</p>
          <h1 className="title-fade mt-4 text-[clamp(2.4rem,7vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg font-medium sm:text-xl">
            Junior Full-Stack Developer
            <span className="text-muted-foreground">
              {t(" · Studente di Informatica all'UniCal", " · Computer Science student at UniCal")}
            </span>
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            <li className="rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-muted-foreground">
              {t(profile.location, "Cosenza, Italy")}
            </li>
            {collegamenti.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="block rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-[var(--hairline-strong)] hover:text-foreground"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-10">
          <Sezione titolo={t("Profilo", "Profile")}>
            <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground">{t(profile.intro, introEn)}</p>
          </Sezione>

          <Sezione titolo={t("Progetti", "Projects")}>
            <ol className="space-y-7">
              {projects.map((p) => {
                const en = progettiEn[p.slug]
                return (
                  <li key={p.slug}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-base font-medium tracking-tight sm:text-lg">
                        {p.title}
                        <span className="text-muted-foreground"> · {t(p.kind, en.kind)}</span>
                      </h3>
                      <span className="eyebrow">{p.year}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground/80">{t(p.team, en.team)}</p>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{t(p.tagline, en.tagline)}</p>
                    <ul className="mt-2.5 space-y-1.5">
                      {(inglese ? en.highlights : p.highlights).slice(0, p.slug === "tripify" ? 3 : 2).map((h) => (
                        <li key={h} className="flex gap-2.5 text-pretty text-sm leading-relaxed">
                          <span aria-hidden className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-foreground/50" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {p.stack.map((tecnologia) => (
                        <li
                          key={tecnologia}
                          className="flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          <TechIcon name={tecnologia} className="size-3" />
                          {tecnologia}
                        </li>
                      ))}
                      {p.repo ? (
                        <li>
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-full border border-[var(--hairline-strong)] px-2 py-0.5 text-xs text-foreground/85 transition-colors hover:text-foreground"
                          >
                            {t("Codice ↗", "Code ↗")}
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </li>
                )
              })}
            </ol>
          </Sezione>

          <Sezione titolo={t("Formazione ed esperienze", "Education and experience")}>
            <ol className="space-y-5">
              {experiences.map((e) => {
                const en = inglese ? percorsoEn[e.role] : undefined
                return (
                  <li key={`${e.company}-${e.period}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-base font-medium tracking-tight">{en?.role ?? e.role}</h3>
                      <span className="eyebrow">{en?.period ?? e.period}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{en?.company ?? e.company}</p>
                  </li>
                )
              })}
            </ol>
          </Sezione>

          <Sezione titolo={t("Competenze", "Skills")}>
            <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {stack.map((g) => (
                <div key={g.group}>
                  <dt className="text-sm font-medium">{t(g.group, gruppiEn[g.group] ?? g.group)}</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
                    {g.items.map((tecnologia) => (
                      <span key={tecnologia} className="flex items-center gap-1.5">
                        <TechIcon name={tecnologia} className="size-3.5" />
                        {tecnologia}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Sezione>

          <Sezione titolo={t("Lingue e altro", "Languages and more")}>
            <dl className="flex flex-wrap gap-x-10 gap-y-3">
              {lingue.map((l) => (
                <div key={l.k} className="flex items-baseline gap-3">
                  <dt className="eyebrow uppercase">{l.k}</dt>
                  <dd className="text-sm font-medium">{l.v}</dd>
                </div>
              ))}
            </dl>
          </Sezione>
        </div>
      </article>
    </main>
  )
}
