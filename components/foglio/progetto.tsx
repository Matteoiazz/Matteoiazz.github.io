"use client"

import Link from "next/link"
import { ViewTransition, useEffect, useState } from "react"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/portfolio-data"
import { casiStudio } from "@/lib/casi-studio"
import { progettiEn } from "@/lib/inglese"
import { useLingua } from "@/components/foglio/lingua"
import { TechIcon } from "@/components/tech-icon"
import { Barra } from "./barra"
import { Chiusura } from "./chiusura"
import { Codice } from "./codice"
import { Palco, Schermo } from "./schermo"
import { nomePassaggio, nomeTestata, segnaOrigine } from "./anteprima"

/**
 * La pagina di un progetto, con la stessa pulizia della casa: titolo grande,
 * a sinistra la scheda (anno, tipo, squadra, ruolo, stack, link), a destra il
 * racconto; poi la copertina, arrivata dalla casa con la view transition.
 * Per i tre casi di studio seguono lo schema dell'architettura con la mia
 * parte in nero e i capitoli con il codice vero; per gli altri, cosa c'è
 * dentro. In fondo le schermate e il progetto successivo.
 */
export function Progetto({ slug }: { slug: string }) {
  const { t, lingua } = useLingua()
  const indice = projects.findIndex((x) => x.slug === slug)
  const p = projects[indice]
  const en = progettiEn[slug]
  const caso = casiStudio.find((c) => c.slug === slug)
  const prossimo = projects[(indice + 1) % projects.length]
  const schermate = [p.cover, ...p.gallery]
  const inglese = lingua === "en"

  const voci = caso
    ? [
        { id: "schema", titolo: t("Come è fatto", "How it's built") },
        ...caso.capitoli.map((c, i) => ({ id: `capitolo-${i + 1}`, titolo: c.titolo })),
        { id: "schermate", titolo: t("Schermate", "Screens") },
      ]
    : []

  // Voce dell'indice attiva: il capitolo che attraversa il centro dello schermo.
  const [attiva, setAttiva] = useState(voci[0]?.id ?? "")
  useEffect(() => {
    if (!caso) return
    const o = new IntersectionObserver(
      (cambi) => cambi.forEach((c) => c.isIntersecting && setAttiva(c.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    )
    document.querySelectorAll("[data-capitolo]").forEach((el) => o.observe(el))
    return () => o.disconnect()
  }, [caso, lingua])

  const scheda = [
    { k: t("Anno", "Year"), v: <span className="cifre">{p.year}</span> },
    { k: t("Tipo", "Type"), v: t(p.kind, en.kind) },
    { k: t("Squadra", "Team"), v: t(p.team, en.team) },
    ...(caso ? [{ k: t("La mia parte", "My part"), v: caso.ruolo }] : []),
  ]

  return (
    <>
      <Barra home={false} />
      <div aria-hidden className="lettura fixed inset-x-0 top-0 z-[60] h-[2px] bg-inchiostro" data-no-stampa />

      <main>
        {/* Testata */}
        <section className="contenitore pt-28 md:pt-36">
          <Link href="/#progetti" className="group inline-flex items-center gap-2 text-sm text-grigio transition-colors hover:text-inchiostro">
            <ArrowLeft aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-x-0.5" />
            {t("Tutti i progetti", "All work")}
          </Link>
          <h1 className="mt-8 text-balance text-[clamp(2.75rem,1rem+6vw,6rem)] font-medium leading-[0.98] tracking-[-0.04em] md:mt-10">
            {p.title}
          </h1>

          <div className="mt-12 grid grid-cols-4 gap-x-[var(--passo)] gap-y-12 md:mt-16 md:grid-cols-12">
            <div className="col-span-4 md:order-2 md:col-span-7 md:col-start-6">
              {inglese ? (
                <>
                  <p className="lead">{en.tagline}</p>
                  <p className="mt-5 text-sm text-grigio">
                    {caso ? "The full case study is written in Italian, and so are the code comments." : "The full description is in Italian."}
                  </p>
                  <p className="mt-6 max-w-[65ch] text-pretty leading-relaxed text-grigio">{caso ? caso.sommario : p.description}</p>
                </>
              ) : (
                <p className="lead">{caso ? caso.sommario : p.description}</p>
              )}
            </div>

            <div className="col-span-4 md:order-1 md:col-span-4">
              <dl className="border-t border-riga">
                {scheda.map((r) => (
                  <div key={r.k} className="grid grid-cols-[minmax(0,6.5rem)_minmax(0,1fr)] gap-4 border-b border-riga py-3.5 text-[0.95rem]">
                    <dt className="text-grigio">{r.k}</dt>
                    <dd className="text-pretty">{r.v}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[minmax(0,6.5rem)_minmax(0,1fr)] gap-4 border-b border-riga py-3.5 text-[0.95rem]">
                  <dt className="text-grigio">Stack</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {p.stack.map((tech) => (
                      <span key={tech} className="inline-flex items-center gap-1.5 rounded-full py-1 pl-2 pr-2.5 text-[0.8rem] shadow-[inset_0_0_0_1px_var(--riga-forte)]">
                        <TechIcon name={tech} className="size-3.5" />
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              {p.demo || p.repo ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {p.demo ? (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="pillola pillola-piena" data-verso="su">
                      {t("Sito online", "Live site")}
                      <ArrowUpRight aria-hidden />
                    </a>
                  ) : null}
                  {p.repo ? (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="pillola pillola-filo" data-verso="su">
                      {t("Codice su GitHub", "Code on GitHub")}
                      <ArrowUpRight aria-hidden />
                    </a>
                  ) : null}
                </div>
              ) : (
                <p className="mt-6 text-sm text-grigio">{t("Codice privato del gruppo.", "The team's code is private.")}</p>
              )}
            </div>
          </div>
        </section>

        {/* Copertina: la stessa della casa, arrivata con la transizione */}
        <section className="contenitore mt-16 md:mt-24">
          <ViewTransition name={nomeTestata(p.slug)} share="passaggio" default="none">
            <div className="relative h-[clamp(19rem,50vw,44rem)] overflow-hidden rounded-[14px] bg-palco">
              <Palco shots={schermate} titolo={p.title} telefoni={3} margine="7%" priorita sizes="(min-width: 768px) 80vw, 92vw" />
            </div>
          </ViewTransition>
          <p className="mt-3 text-sm text-grigio">{p.cover.caption}</p>
        </section>

        {caso ? (
          <>
            {/* I numeri del progetto, in una tabella */}
            <section className="contenitore mt-16 md:mt-20">
              <dl className="grid grid-cols-1 border-t border-riga sm:grid-cols-2 lg:grid-cols-4 lg:border-b">
                {caso.numeri.map((n) => (
                  <div key={n.k} className="flex items-baseline gap-3 border-b border-riga py-4 lg:border-b-0 lg:py-5">
                    <dt className="order-2 text-grigio">{n.k}</dt>
                    <dd className="cifre order-1 shrink-0 text-[1.25rem] font-medium leading-none tracking-[-0.015em]">{n.v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Corpo: indice fermo a sinistra, capitoli a destra */}
            <section className="contenitore mt-20 grid grid-cols-4 gap-x-[var(--passo)] md:mt-28 md:grid-cols-12">
              <nav aria-label={t("Indice", "Contents")} className="col-span-3 hidden lg:block" data-no-stampa>
                <ol className="sticky top-28 space-y-0.5">
                  {voci.map((v) => (
                    <li key={v.id}>
                      <a
                        href={`#${v.id}`}
                        className={`flex items-center gap-3 py-1.5 text-sm transition-colors ${attiva === v.id ? "text-inchiostro" : "text-grigio hover:text-inchiostro"}`}
                      >
                        <span aria-hidden className={`h-px transition-all duration-500 ${attiva === v.id ? "w-6 bg-inchiostro" : "w-3 bg-riga-forte"}`} />
                        {v.titolo}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="col-span-4 min-w-0 md:col-span-12 lg:col-span-8 lg:col-start-5">
                <article id="schema" data-capitolo className="scroll-mt-28">
                  <h2 className="titolo-2">{t("Come è fatto.", "How it's built.")}</h2>
                  <p className="mt-5 max-w-[65ch] text-pretty leading-relaxed text-grigio">{caso.architettura.didascalia}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm">
                    <span aria-hidden className="inline-block size-3 rounded-[3px] bg-inchiostro" />
                    {t("In nero, la mia parte", "In black, my part")}
                  </p>
                  <div className="mt-8 border-t border-riga">
                    {caso.architettura.livelli.map((livello) => (
                      <div key={livello.nome} className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 border-b border-riga py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
                        <p className="text-sm text-grigio">{livello.nome}</p>
                        <div className="flex flex-wrap gap-2">
                          {livello.blocchi.map((b) => (
                            <div
                              key={b.nome}
                              className={`min-w-[8.5rem] flex-1 rounded-xl px-3.5 py-2.5 ${
                                b.mio ? "bg-inchiostro text-carta" : "shadow-[inset_0_0_0_1px_var(--riga-forte)]"
                              }`}
                            >
                              <p className="text-sm font-medium">{b.nome}</p>
                              {b.nota ? <p className={`mt-0.5 text-xs ${b.mio ? "text-carta/70" : "text-grigio"}`}>{b.nota}</p> : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                {caso.capitoli.map((cap, i) => (
                  <article key={cap.titolo} id={`capitolo-${i + 1}`} data-capitolo className="mt-24 scroll-mt-28 md:mt-32">
                    <h2 className="titolo-2">{cap.titolo}</h2>
                    <div className="mt-6 space-y-4">
                      {cap.testo.map((testo) => (
                        <p key={testo.slice(0, 32)} className="max-w-[65ch] text-pretty text-[1.05rem] leading-relaxed">
                          {testo}
                        </p>
                      ))}
                    </div>
                    {cap.codice ? (
                      <div className="mt-8">
                        <Codice codice={cap.codice} />
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="contenitore mt-20 grid grid-cols-4 gap-x-[var(--passo)] md:mt-28 md:grid-cols-12">
            <h2 className="titolo-2 col-span-4 md:col-span-4">{t("Cosa c'è dentro.", "What's inside.")}</h2>
            <ul className="col-span-4 mt-8 border-t border-riga md:col-span-7 md:col-start-6 md:mt-0">
              {p.highlights.map((h) => (
                <li key={h.slice(0, 40)} className="max-w-[68ch] text-pretty border-b border-riga py-4 leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Schermate */}
        {p.gallery.length > 0 ? (
          <section id="schermate" data-capitolo className="contenitore mt-24 scroll-mt-28 md:mt-32">
            <h2 className="titolo-2">{t("Schermate.", "Screens.")}</h2>
            <div className={`mt-10 grid gap-x-[var(--passo)] gap-y-10 ${p.cover.frame === "phone" ? "grid-cols-2 md:grid-cols-3" : "md:grid-cols-2"}`}>
              {p.gallery.map((s) => (
                <figure key={s.src}>
                  <div
                    className={`relative overflow-hidden rounded-[14px] bg-palco ${
                      s.frame === "phone" ? "aspect-[9/14]" : "aspect-[16/11]"
                    }`}
                  >
                    <div className="palco-schermo absolute inset-[7%] flex items-center justify-center">
                      <Schermo shot={s} titolo={p.title} sizes={s.frame === "phone" ? "(min-width: 768px) 20vw, 42vw" : "(min-width: 768px) 45vw, 92vw"} />
                    </div>
                  </div>
                  <figcaption className="mt-3 text-sm text-grigio">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {/* Progetto successivo */}
        <section className="contenitore mt-28 md:mt-40">
          <Link href={`/progetti/${prossimo.slug}/`} className="group grid grid-cols-4 gap-x-[var(--passo)] gap-y-8 border-t border-riga pt-8 md:grid-cols-12 md:pt-10"
            data-cursore={t("Apri", "Open")}
            onClick={(e) => segnaOrigine(e.detail === 0 ? "nessuna" : "copertina")}
          >
            <div className="col-span-4 md:col-span-6">
              <p className="text-grigio">{t("Prossimo progetto", "Next project")}</p>
              <p className="titolo-1 mt-4">
                <span className="titolo-largo inline-block group-hover:[font-variation-settings:'wdth'_112]">{prossimo.title}</span>
              </p>
              <p className="mt-5 max-w-[44ch] text-pretty text-grigio">{t(prossimo.tagline, progettiEn[prossimo.slug].tagline)}</p>
            </div>
            <ViewTransition name={nomePassaggio(prossimo.slug)} share="passaggio" default="none">
              <div className="monocromo relative col-span-4 h-[clamp(14rem,24vw,22rem)] overflow-hidden rounded-[14px] bg-palco md:col-span-5 md:col-start-8">
                <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]">
                  <Palco shots={[prossimo.cover, ...prossimo.gallery]} titolo={prossimo.title} sizes="(min-width: 768px) 40vw, 90vw" />
                </div>
              </div>
            </ViewTransition>
          </Link>
        </section>
      </main>

      <Chiusura />
    </>
  )
}
