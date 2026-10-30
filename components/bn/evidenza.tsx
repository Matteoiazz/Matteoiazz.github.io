"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import { projects } from "@/lib/portfolio-data"
import { progettiEn } from "@/lib/inglese"
import { casiStudio } from "@/lib/casi-studio"
import { DeviceMockup } from "@/components/device-mockup"
import { useLingua } from "@/components/bn/lingua"

const inEvidenza = projects.filter((p) => p.casoStudio)

/**
 * I tre progetti con il caso di studio, su un binario orizzontale: la
 * sezione resta ferma e scorrendo in giù le tavole passano da destra a
 * sinistra. La sezione è alta quanto il binario è lungo, così la velocità
 * è quella dello scroll. Sotto md (o col movimento ridotto) le tavole si
 * impilano e si scorrono normalmente.
 */
export function Evidenza() {
  const { t } = useLingua()
  const sezione = useRef<HTMLElement>(null)
  const binario = useRef<HTMLDivElement>(null)
  const [corsa, setCorsa] = useState(0)
  const [orizzontale, setOrizzontale] = useState(false)

  useLayoutEffect(() => {
    const decidi = () => {
      const largo = window.matchMedia("(min-width: 48rem)").matches
      const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      setOrizzontale(largo && !calmo)
    }
    decidi()
    window.addEventListener("resize", decidi)
    return () => window.removeEventListener("resize", decidi)
  }, [])

  // La corsa si misura dopo che il binario è diventato orizzontale, e di
  // nuovo quando cambia larghezza (immagini, lingua, finestra).
  useLayoutEffect(() => {
    const el = binario.current
    if (!el || !orizzontale) return
    const misura = () => setCorsa(Math.max(0, el.scrollWidth - window.innerWidth))
    misura()
    const osservatore = new ResizeObserver(misura)
    osservatore.observe(el)
    return () => osservatore.disconnect()
  }, [orizzontale])

  const { scrollYProgress } = useScroll({ target: sezione, offset: ["start start", "end end"] })
  const morbido = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  const x = useTransform(morbido, (v) => -v * corsa)
  const avanzamento = useTransform(morbido, [0, 1], ["0%", "100%"])

  return (
    <section
      ref={sezione}
      id="progetti"
      className="scuro relative"
      style={orizzontale ? { height: `calc(100svh + ${corsa}px)` } : undefined}
    >
      <div className={orizzontale ? "sticky top-0 flex h-svh flex-col overflow-hidden" : "py-20"}>
        <motion.div
          ref={binario}
          style={orizzontale ? { x } : undefined}
          className={orizzontale ? "flex h-full w-max items-stretch" : "flex flex-col gap-20"}
        >
          {/* Tavola d'apertura */}
          <div className={`contenitore flex shrink-0 flex-col justify-end ${orizzontale ? "pb-[12vh] md:w-[46vw] md:pr-0" : ""}`}>
            <h2 className="text-[clamp(3rem,8.5vw,8rem)] font-extrabold leading-[0.86] tracking-[-0.035em] [font-variation-settings:'wdth'_80]">
              {t("Tre progetti,", "Three projects,")}
              <br />
              <span className="text-tenue">{t("dal database all'interfaccia", "from database to interface")}</span>
            </h2>
            <p className="mt-8 max-w-[38ch] text-lg text-tenue">
              {t(
                "Ognuno con un caso di studio: il problema, l'architettura, il mio ruolo e il codice vero.",
                "Each with a case study: the problem, the architecture, my role and the real code.",
              )}
            </p>
            {orizzontale ? (
              <p className="mt-10 flex items-center gap-3 text-sm text-tenue">
                <span className="h-px w-16 bg-riga-forte" />
                {t("Scorri, le tavole passano di lato", "Scroll, the plates slide sideways")}
              </p>
            ) : null}
          </div>

          {inEvidenza.map((p, i) => {
            const caso = casiStudio.find((c) => c.slug === p.slug)
            const en = progettiEn[p.slug]
            return (
              <article
                key={p.slug}
                className={`group contenitore grid shrink-0 grid-cols-4 content-center gap-x-[var(--passo)] gap-y-8 md:grid-cols-12 ${orizzontale ? "md:w-[88vw] lg:w-[80vw]" : ""}`}
              >
                <a
                  href={`/progetti/${p.slug}/`}
                  data-cursore={t("Leggi", "Read")}
                  className="monocromo shot-stage relative col-span-4 aspect-[16/11] border border-riga-forte bg-[#151515] md:col-span-7 md:aspect-auto md:h-[64svh]"
                  aria-label={t(`Caso di studio: ${p.title}`, `Case study: ${p.title}`)}
                >
                  <div className="flex h-full items-center justify-center gap-[3%] p-[5%]">
                    {p.cover.frame === "phone" ? (
                      [p.gallery[0], p.cover, p.gallery[1]].map((s, k) => (
                        <div key={s.src} className={k === 1 ? "h-[86%]" : "h-[72%]"} style={{ containerType: "size", aspectRatio: "9 / 19.5" }}>
                          <DeviceMockup shot={s} sizes="20vw" />
                        </div>
                      ))
                    ) : (
                      <DeviceMockup shot={p.cover} titolo={p.title} sizes="55vw" />
                    )}
                  </div>
                </a>

                <div className="col-span-4 flex flex-col justify-between gap-8 md:col-span-5">
                  <div>
                    <h3 className="text-[clamp(2.4rem,5vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.03em] transition-[font-variation-settings] duration-500 [font-variation-settings:'wdth'_78] group-hover:[font-variation-settings:'wdth'_100]">
                      {p.title}
                    </h3>
                    <p className="mt-5 max-w-[42ch] text-pretty text-lg leading-snug">{t(p.tagline, en.tagline)}</p>
                    {/* Posizione nella sequenza e tipo: sotto il titolo, mai sopra. */}
                    <p className="dato mt-5 text-tenue">
                      {String(i + 1).padStart(2, "0")} / {String(inEvidenza.length).padStart(2, "0")} · {t(p.kind, en.kind)} · {p.year}
                    </p>
                  </div>
                  <div>
                    {caso ? (
                      <dl className="grid grid-cols-2 border-t border-riga-forte">
                        {caso.numeri.slice(0, 2).map((n) => (
                          <div key={n.k} className="border-b border-riga-forte py-4 pr-4">
                            <dd className="text-3xl font-bold tracking-[-0.02em]">{n.v}</dd>
                            <dt className="dato mt-1 text-tenue">{n.k}</dt>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                    <a
                      href={`/progetti/${p.slug}/`}
                      className="mt-6 inline-flex items-center gap-2 border-b border-testo pb-1 text-base font-medium"
                    >
                      {t("Leggi il caso di studio", "Read the case study")}
                      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
          {orizzontale ? <div aria-hidden className="w-[6vw] shrink-0" /> : null}
        </motion.div>

        {orizzontale ? (
          <div className="contenitore absolute inset-x-0 bottom-6">
            <div className="h-px bg-riga-forte">
              <motion.div className="h-px bg-testo" style={{ width: avanzamento }} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
