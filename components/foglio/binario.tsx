"use client"

import Link from "next/link"
import { ViewTransition, useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { projects, type Project } from "@/lib/portfolio-data"
import { progettiEn } from "@/lib/inglese"
import { useLingua } from "@/components/foglio/lingua"
import { useMovimentoRidotto } from "@/components/foglio/comuni"
import { Palco } from "./schermo"
import { nomePassaggio, segnaOrigine } from "./anteprima"

// Il binario parte allineato al contenuto della pagina anche sugli schermi larghi.
const ATTACCO = "max(var(--lati), calc((100vw - 104rem) / 2 + var(--lati)))"

/**
 * Il lavoro, uno per uno: la sezione si ferma e i sette progetti scorrono di
 * lato mentre si scende, con una riga sotto che dice quanto manca. Con il
 * movimento ridotto il binario si scorre a mano.
 */
export function Binario() {
  const { t } = useLingua()
  const sezione = useRef<HTMLElement>(null)
  const binario = useRef<HTMLUListElement>(null)
  const fermo = useMovimentoRidotto()
  const [distanza, setDistanza] = useState(0)

  // Quanto deve correre il binario: la sua larghezza meno quella dello schermo.
  useEffect(() => {
    const misura = () => {
      const b = binario.current
      if (b) setDistanza(Math.max(0, b.scrollWidth - window.innerWidth))
    }
    misura()
    const o = new ResizeObserver(misura)
    if (binario.current) o.observe(binario.current)
    window.addEventListener("resize", misura)
    return () => {
      o.disconnect()
      window.removeEventListener("resize", misura)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sezione, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, (v) => -v * distanza)
  const avanzamento = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v)))

  const titolo = (
    <h2 className="titolo-2">
      {t("Il lavoro.", "The work.")} <span className="seconda">{t("Sette progetti, uno per uno.", "Seven projects, one by one.")}</span>
    </h2>
  )

  if (fermo) {
    return (
      <section id="progetti" ref={sezione} className="pt-28 md:pt-40">
        <div className="contenitore">{titolo}</div>
        <ul className="mt-10 flex gap-[var(--passo)] overflow-x-auto pb-6" style={{ paddingInline: ATTACCO }}>
          {projects.map((p) => (
            <Carta key={p.slug} p={p} />
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section id="progetti" ref={sezione} className="relative" style={{ height: `calc(100svh + ${distanza}px)` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="contenitore">{titolo}</div>
        <motion.ul ref={binario} style={{ x, paddingInline: ATTACCO }} className="mt-10 flex w-max gap-[var(--passo)] md:mt-14">
          {projects.map((p) => (
            <Carta key={p.slug} p={p} />
          ))}
        </motion.ul>
        <div className="contenitore mt-10 md:mt-12">
          <div className="h-px bg-riga">
            <motion.div className="h-px origin-left bg-inchiostro" style={{ scaleX: avanzamento }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Carta({ p }: { p: Project }) {
  const { t } = useLingua()
  const en = progettiEn[p.slug]
  return (
    <li className="w-[min(30rem,82vw)] shrink-0">
      <Link
        href={`/progetti/${p.slug}/`}
        className="group block"
        data-cursore={t("Apri", "Open")}
        onClick={(e) => segnaOrigine(e.detail === 0 ? "nessuna" : "binario")}
      >
        <ViewTransition name={nomePassaggio(p.slug, "binario")} share="passaggio" default="none">
          <div className="monocromo relative h-[clamp(14rem,40svh,24rem)] overflow-hidden rounded-[14px] bg-palco">
            <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]">
              <Palco shots={[p.cover, ...p.gallery]} titolo={p.title} sizes="(min-width: 768px) 30rem, 82vw" />
            </div>
          </div>
        </ViewTransition>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[1.15rem] font-medium tracking-[-0.01em]">
              <span className="traccia">{p.title}</span>
            </h3>
            <p className="mt-0.5 text-[0.9rem] text-grigio">
              {t(p.kind, en.kind)} · {t(p.squadra, en.squadra)} · <span className="cifre">{p.year}</span>
              {p.casoStudio ? ` · ${t("caso di studio", "case study")}` : ""}
            </p>
            <p className="mt-3 max-w-[44ch] text-pretty text-[0.95rem] leading-relaxed text-grigio">{t(p.tagline, en.tagline)}</p>
          </div>
          <ArrowUpRight
            aria-hidden
            className="mt-1 size-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </Link>
    </li>
  )
}
