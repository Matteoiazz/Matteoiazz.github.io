"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { motion, useScroll, useSpring } from "motion/react"
import { projects } from "@/lib/portfolio-data"
import { casiStudio } from "@/lib/casi-studio"
import { progettiEn } from "@/lib/inglese"
import { DeviceMockup } from "@/components/device-mockup"
import { TechIcon } from "@/components/tech-icon"
import { BloccoCodice } from "@/components/blocco-codice"
import { Barra } from "@/components/bn/barra"
import { Griglia } from "@/components/bn/griglia"
import { Nome } from "@/components/bn/nome"
import { Palette } from "@/components/bn/palette"
import { useLingua } from "@/components/bn/lingua"

// Titoli lunghi su due righe, spezzati a metà delle parole.
const righeTitolo = (titolo: string) => {
  const parole = titolo.toUpperCase().split(" ")
  if (parole.length < 3) return [parole.join(" ")]
  const meta = Math.ceil(parole.length / 2)
  return [parole.slice(0, meta).join(" "), parole.slice(meta).join(" ")]
}

/**
 * Caso di studio nel mondo della home: vetro scuro e cromo.
 * In apertura il titolo costruito a celle; poi il riassunto con ruolo e
 * stack, la copertina su lastra nera, i numeri sul tabellone a palette,
 * lo schema con la parte personale in nero e i capitoli con il codice
 * vero. A sinistra un indice fermo segue la lettura; in alto una riga
 * si riempie man mano che si legge.
 */
export function CasoStudio({ slug }: { slug: string }) {
  const { t, lingua } = useLingua()
  const caso = casiStudio.find((c) => c.slug === slug)!
  const p = projects.find((x) => x.slug === slug)!
  const en = progettiEn[slug]
  const indice = casiStudio.findIndex((c) => c.slug === slug)
  const prossimo = projects.find((x) => x.slug === casiStudio[(indice + 1) % casiStudio.length].slug)!
  const schermate = [p.cover, ...p.gallery]

  const voci = [
    { id: "schema", titolo: t("Come è fatto", "How it's built") },
    ...caso.capitoli.map((c, i) => ({ id: `capitolo-${i + 1}`, titolo: c.titolo })),
    { id: "schermate", titolo: t("Schermate", "Screens") },
  ]

  const { scrollYProgress } = useScroll()
  const lettura = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.2 })

  // Qui non c'è l'ingresso della home: il titolo si costruisce subito.
  useEffect(() => {
    document.documentElement.classList.add("pronto")
  }, [])

  // Voce dell'indice attiva: il capitolo che attraversa il centro dello schermo.
  const [attiva, setAttiva] = useState(voci[0].id)
  useEffect(() => {
    const o = new IntersectionObserver(
      (cambi) => cambi.forEach((c) => c.isIntersecting && setAttiva(c.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    )
    voci.forEach((v) => {
      const el = document.getElementById(v.id)
      if (el) o.observe(el)
    })
    return () => o.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, lingua])

  return (
    <>
      <Barra home={false} />
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-white mix-blend-difference"
        style={{ scaleX: lettura }}
        data-no-stampa
      />

      <main className="relative overflow-x-clip">
        {/* Apertura */}
        <section className="chiaro relative pb-16 pt-28 md:pt-36">
          <Griglia />
          <div className="contenitore relative z-10">
            <a href="/#progetti" className="group inline-flex items-center gap-2 text-sm">
              <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
              {t("Tutti i progetti", "All the work")}
            </a>

            <Nome righe={righeTitolo(p.title)} etichetta={p.title} subito massimo={0.26} cromo className="mt-10 md:mt-14" />

            {lingua === "en" ? (
              <p className="dato mt-6 inline-block rounded-full border border-riga-forte px-3 py-1">
                This case study is written in Italian; the code comments are too.
              </p>
            ) : null}

            <div className="mt-12 grid grid-cols-4 gap-x-[var(--passo)] gap-y-10 md:mt-16 md:grid-cols-12">
              <p className="col-span-4 text-pretty text-[clamp(1.3rem,2.3vw,1.9rem)] font-medium leading-[1.3] tracking-[-0.015em] md:col-span-7">
                {caso.sommario}
              </p>
              <dl className="vetro-piatto col-span-4 space-y-6 rounded-[22px] p-6 md:col-span-4 md:col-start-9">
                <div>
                  <dt className="dato uppercase text-tenue">{t("Progetto", "Project")}</dt>
                  <dd className="mt-1.5 font-medium">
                    {t(p.kind, en.kind)} · {p.year}
                  </dd>
                </div>
                <div>
                  <dt className="dato uppercase text-tenue">{t("Il mio ruolo", "My role")}</dt>
                  <dd className="mt-1.5 font-medium">{caso.ruolo}</dd>
                </div>
                <div>
                  <dt className="dato uppercase text-tenue">{t("Contesto", "Context")}</dt>
                  <dd className="mt-1.5 text-sm text-tenue">{t(p.team, en.team)}</dd>
                </div>
                <div>
                  <dt className="dato uppercase text-tenue">Stack</dt>
                  <dd className="mt-2.5 flex flex-wrap gap-2">
                    {p.stack.map((tech) => (
                      <span key={tech} className="flex items-center gap-1.5 border border-riga-forte px-2.5 py-1 text-xs">
                        <TechIcon name={tech} className="size-3.5" />
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="flex flex-wrap gap-3">
                  {p.demo ? (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-carta px-4 py-2.5 text-sm font-medium text-inchiostro">
                      {t("Sito online", "Live site")}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </a>
                  ) : null}
                  {p.repo ? (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="pillola-vetro flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium">
                      {t("Codice", "Code")}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </a>
                  ) : null}
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Copertina su lastra nera */}
        <section className="scuro relative">
          <div className="contenitore py-10 md:py-14">
            <div className="monocromo vetro-piatto shot-stage relative aspect-[4/3] w-full overflow-hidden rounded-[26px] sm:aspect-[16/9]">
              <div className="flex h-full w-full items-center justify-center gap-[3%] p-[3%]">
                {p.cover.frame === "phone"
                  ? schermate.filter((s) => s.frame === "phone").slice(0, 3).map((s, k) => (
                      <div key={s.src} className={k === 1 ? "h-full" : "h-[86%]"} style={{ containerType: "size", aspectRatio: "9 / 19.5" }}>
                        <DeviceMockup shot={s} sizes="25vw" />
                      </div>
                    ))
                  : <DeviceMockup shot={p.cover} titolo={p.title} sizes="90vw" />}
              </div>
            </div>

            {/* I numeri sul tabellone a palette, ognuno con il suo contesto. */}
            <dl className="mt-10 grid border-t border-riga-forte md:grid-cols-2">
              {caso.numeri.map((n) => (
                <div key={n.k} className="flex items-center gap-5 border-b border-riga-forte py-5 md:odd:border-r md:odd:pr-6 md:even:pl-6">
                  <dd className="text-[clamp(1.4rem,2.6vw,2.2rem)]">
                    <Palette frasi={[n.v]} caselle={Math.max(3, n.v.length)} classeCasella="rounded-[3px] bg-white/[0.08] text-testo shadow-[inset_0_1px_0_rgb(255_255_255/0.2)] after:bg-black/50" />
                  </dd>
                  <dt className="text-tenue">{n.k}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Corpo: indice fermo a sinistra, capitoli a destra */}
        <section className="chiaro relative py-20 md:py-28">
          <Griglia />
          <div className="contenitore relative z-10 grid grid-cols-4 gap-x-[var(--passo)] md:grid-cols-12">
            <nav aria-label={t("Indice", "Contents")} className="col-span-3 hidden md:block" data-no-stampa>
              <ol className="sticky top-24 space-y-1 border-l border-riga-forte">
                {voci.map((v, i) => (
                  <li key={v.id}>
                    <a
                      href={`#${v.id}`}
                      className={`-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition-colors ${
                        attiva === v.id ? "border-testo font-medium" : "border-transparent text-tenue hover:text-testo"
                      }`}
                    >
                      <span className="dato pt-px">{String(i).padStart(2, "0")}</span>
                      {v.titolo}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="col-span-4 min-w-0 md:col-span-9 lg:col-span-8 lg:col-start-5">
              {/* Schema dell'architettura */}
              <article id="schema" className="scroll-mt-24">
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] font-display [font-variation-settings:'wdth'_82]">
                  <span className="dato mr-4 align-top font-normal text-tenue">00</span>
                  {t("Come è fatto", "How it's built")}
                </h2>
                <p className="mt-5 max-w-[65ch] text-pretty leading-relaxed text-tenue">{caso.architettura.didascalia}</p>
                <p className="dato mt-4 flex items-center gap-2">
                  <span className="inline-block size-3 rounded-[3px] bg-carta" />
                  {t("in nero, la mia parte", "in black, my part")}
                </p>
                <div className="vetro-piatto mt-8 overflow-hidden rounded-[22px] px-5">
                  {caso.architettura.livelli.map((livello) => (
                    <div key={livello.nome} className="grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-4 border-b border-riga py-4 last:border-b-0 sm:grid-cols-[8rem_minmax(0,1fr)]">
                      <p className="dato uppercase text-tenue">{livello.nome}</p>
                      <div className="flex flex-wrap gap-2">
                        {livello.blocchi.map((b) => (
                          <div
                            key={b.nome}
                            className={`min-w-[8.5rem] flex-1 rounded-xl border px-3.5 py-2.5 ${
                              b.mio ? "border-carta bg-carta text-inchiostro" : "border-riga-forte"
                            }`}
                          >
                            <p className="text-sm font-semibold">{b.nome}</p>
                            {b.nota ? <p className={`mt-0.5 text-xs ${b.mio ? "text-inchiostro/70" : "text-tenue"}`}>{b.nota}</p> : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              {caso.capitoli.map((cap, i) => (
                <article key={cap.titolo} id={`capitolo-${i + 1}`} className="mt-24 scroll-mt-24 md:mt-32">
                  <h2 className="text-balance text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] font-display [font-variation-settings:'wdth'_82]">
                    <span className="dato mr-4 align-top font-normal text-tenue">{String(i + 1).padStart(2, "0")}</span>
                    {cap.titolo}
                  </h2>
                  <div className="mt-6 space-y-4">
                    {cap.testo.map((testo) => (
                      <p key={testo.slice(0, 32)} className="max-w-[65ch] text-pretty text-[1.05rem] leading-relaxed">
                        {testo}
                      </p>
                    ))}
                  </div>
                  {cap.codice ? (
                    <div className="mt-8">
                      <BloccoCodice codice={cap.codice} />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Schermate */}
        <section id="schermate" className="scuro relative scroll-mt-16 py-20 md:py-28">
          <div className="contenitore">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] font-display [font-variation-settings:'wdth'_82]">
              {t("Schermate", "Screens")}
            </h2>
            <p className="mt-3 text-sm text-tenue">{t("In bianco e nero; a colori al passaggio del mouse.", "Black and white; colour on hover.")}</p>
            <div className={`mt-10 grid gap-6 ${p.cover.frame === "phone" ? "grid-cols-2 md:grid-cols-4" : "md:grid-cols-2"}`}>
              {schermate.map((s) => (
                <figure key={s.src} className="monocromo">
                  <div className={`shot-stage relative w-full ${p.cover.frame === "phone" ? "aspect-[9/19.5]" : "aspect-[16/10.6]"}`}>
                    <div className="flex h-full w-full items-center justify-center">
                      <DeviceMockup shot={s} titolo={p.title} sizes="(min-width: 768px) 45vw, 92vw" />
                    </div>
                  </div>
                  <figcaption className="mt-3 text-sm text-tenue">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Prossimo caso di studio */}
        <section className="chiaro relative">
          <Griglia />
          <a
            href={`/progetti/${prossimo.slug}/`}
            data-cursore={t("Leggi", "Read")}
            className="contenitore group relative z-10 block py-20 md:py-28"
          >
            <p className="dato flex items-center justify-between text-tenue">
              {t("Prossimo caso di studio", "Next case study")}
              <ArrowRight aria-hidden className="size-5 text-testo transition-transform duration-300 group-hover:translate-x-1" />
            </p>
            <p className="mt-6 text-[clamp(3rem,11vw,10rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.035em] transition-[font-variation-settings] duration-700 font-display [font-variation-settings:'wdth'_70] group-hover:font-display [font-variation-settings:'wdth'_112]">
              {prossimo.title}
            </p>
            <p className="mt-6 max-w-[48ch] text-tenue">{t(prossimo.tagline, progettiEn[prossimo.slug].tagline)}</p>
          </a>
        </section>
      </main>
    </>
  )
}
