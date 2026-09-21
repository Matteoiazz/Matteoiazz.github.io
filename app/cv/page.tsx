import type { ReactNode } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { contact, experiences, profile, projects, stack } from "@/lib/portfolio-data"
import { TechIcon } from "@/components/tech-icon"

// Il PDF pubblicato qui è senza numero di telefono: il numero resta solo nella
// copia da allegare alle candidature.
const PDF = "/Matteo_Iazzolino_CV.pdf"

export const metadata: Metadata = {
  title: "Curriculum · Matteo Iazzolino",
  description:
    "Curriculum di Matteo Iazzolino, Junior Full-Stack Developer e studente di Informatica all'Università della Calabria.",
}

const lingue = [
  { k: "Italiano", v: "Madrelingua" },
  { k: "Inglese", v: "B2" },
  { k: "Patente", v: "B" },
]

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
 * Tutto viene da portfolio-data.ts: progetti, percorso e competenze restano
 * gli stessi del portfolio senza doverli aggiornare in due posti.
 */
export default function Curriculum() {
  return (
    <main className="contenitore relative z-10 pb-20 pt-8 sm:pt-12">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Torna al portfolio
        </Link>
        <a
          href={PDF}
          download="Matteo_Iazzolino_CV.pdf"
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Scarica PDF ↓
        </a>
      </div>

      <article className="glass-flat glass-edge fade-up mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl px-6 py-9 sm:px-12 sm:py-12">
        <header>
          <p className="eyebrow uppercase">Curriculum vitae</p>
          <h1 className="title-fade mt-4 text-[clamp(2.4rem,7vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg font-medium sm:text-xl">
            Junior Full-Stack Developer
            <span className="text-muted-foreground"> · Studente di Informatica all&apos;UniCal</span>
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            <li className="rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-muted-foreground">
              {profile.location}
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
          <Sezione titolo="Profilo">
            <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground">{profile.intro}</p>
          </Sezione>

          <Sezione titolo="Progetti">
            <ol className="space-y-7">
              {projects.map((p) => (
                <li key={p.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-medium tracking-tight sm:text-lg">
                      {p.title}
                      <span className="text-muted-foreground"> · {p.kind}</span>
                    </h3>
                    <span className="eyebrow">{p.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground/80">{p.team}</p>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {p.highlights.slice(0, p.slug === "tripify" ? 3 : 2).map((h) => (
                      <li key={h} className="flex gap-2.5 text-pretty text-sm leading-relaxed">
                        <span aria-hidden className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-foreground/50" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-2 py-0.5 text-[0.7rem] text-muted-foreground"
                      >
                        <TechIcon name={t} className="size-3" />
                        {t}
                      </li>
                    ))}
                    {p.repo ? (
                      <li>
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-full border border-[var(--hairline-strong)] px-2 py-0.5 text-[0.7rem] text-foreground/85 transition-colors hover:text-foreground"
                        >
                          Codice ↗
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </li>
              ))}
            </ol>
          </Sezione>

          <Sezione titolo="Formazione ed esperienze">
            <ol className="space-y-5">
              {experiences.map((e) => (
                <li key={`${e.company}-${e.period}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-medium tracking-tight">{e.role}</h3>
                    <span className="eyebrow">{e.period}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{e.company}</p>
                </li>
              ))}
            </ol>
          </Sezione>

          <Sezione titolo="Competenze">
            <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {stack.map((g) => (
                <div key={g.group}>
                  <dt className="text-sm font-medium">{g.group}</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
                    {g.items.map((t) => (
                      <span key={t} className="flex items-center gap-1.5">
                        <TechIcon name={t} className="size-3.5" />
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Sezione>

          <Sezione titolo="Lingue e altro">
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
