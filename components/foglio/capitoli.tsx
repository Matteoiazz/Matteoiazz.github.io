"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { capitoli, type Capitolo } from "@/lib/storia"
import { projects } from "@/lib/portfolio-data"
import { useLingua } from "@/components/foglio/lingua"
import { useMovimentoRidotto } from "@/components/foglio/comuni"
import { StratiStoria } from "./strati"
import { Palco } from "./schermo"
import { segnaOrigine } from "./anteprima"

/**
 * I capitoli della storia: le fondamenta, il motore, quello che si vede, verso
 * l'AI, e in parallelo. A sinistra il racconto scorre, a destra il disegno degli
 * strati resta fermo e si costruisce un capitolo alla volta. Sul telefono ogni
 * capitolo porta con sé il suo disegno, piccolo.
 */
export function Capitoli() {
  const { t } = useLingua()
  const [attivo, setAttivo] = useState(-1)

  // Il capitolo in lettura è quello che attraversa il centro dello schermo.
  useEffect(() => {
    const blocchi = [...document.querySelectorAll<HTMLElement>("[data-capitolo-storia]")]
    const o = new IntersectionObserver(
      (voci) => voci.forEach((v) => v.isIntersecting && setAttivo(Number(v.target.getAttribute("data-capitolo-storia")))),
      { rootMargin: "-50% 0px -50% 0px" },
    )
    blocchi.forEach((b) => o.observe(b))
    return () => o.disconnect()
  }, [])

  const capitolo = attivo >= 0 ? capitoli[attivo] : undefined

  return (
    <section aria-label={t("I capitoli", "The chapters")} className="relative">
      <div className="contenitore grid grid-cols-4 gap-x-[var(--passo)] md:grid-cols-12">
        <div className="col-span-4 md:col-span-12 lg:col-span-7">
          {capitoli.map((c, i) => (
            <Blocco key={c.id} c={c} i={i} />
          ))}
        </div>
        <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
          <div className="sticky top-0 flex h-svh items-center justify-center py-[14svh]">
            <StratiStoria attivo={capitolo?.strato ?? null} tutti={capitolo?.strato === null} className="h-full max-h-[34rem]" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Blocco({ c, i }: { c: Capitolo; i: number }) {
  const { t, lingua } = useLingua()
  const ref = useRef<HTMLElement>(null)
  const fermo = useMovimentoRidotto()
  // Il capitolo entra salendo e prendendo corpo mentre arriva verso il centro.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "start 40%"] })
  // Forma a funzione, calcolata in JavaScript come nel prologo.
  const opacita = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v)))
  const y = useTransform(scrollYProgress, (v) => 56 * (1 - Math.min(1, Math.max(0, v))))
  const testo = lingua === "en" ? c.testo.en : c.testo.it

  return (
    <article ref={ref} id={`capitolo-${c.id}`} data-capitolo-storia={i} className="flex min-h-svh flex-col justify-center py-24">
      <motion.div style={fermo ? undefined : { opacity: opacita, y }}>
        <StratiStoria attivo={c.strato} tutti={c.strato === null} etichette={false} className="mb-8 h-32 lg:hidden" />

        <h2 className="titolo-2">
          {t(c.titolo.it, c.titolo.en)} <span className="seconda">{t(c.seconda.it, c.seconda.en)}</span>
        </h2>

        <div className="mt-8 space-y-5">
          {testo.map((p) => (
            <p key={p.slice(0, 32)} className="lead max-w-[52ch]">
              {p}
            </p>
          ))}
        </div>

        {c.schermate ? (
          <ul className="mt-10 grid grid-cols-3 gap-[var(--passo)]">
            {c.schermate.map((slug) => {
              const p = projects.find((x) => x.slug === slug)!
              return (
                <li key={slug}>
                  <Link href={`/progetti/${slug}/`} onClick={() => segnaOrigine("nessuna")} className="group block" data-cursore={t("Apri", "Open")}>
                    <span className="monocromo relative block h-[clamp(8rem,13vw,12rem)] overflow-hidden rounded-[14px] bg-palco">
                      <span className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                        <Palco shots={[p.cover, ...p.gallery]} titolo={p.title} telefoni={1} margine="10%" sizes="(min-width: 1024px) 14vw, 30vw" />
                      </span>
                    </span>
                    <span className="mt-2 block text-sm text-grigio">{p.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : null}

        {c.progetti ? (
          <ul className="mt-10 flex flex-wrap gap-3">
            {c.progetti.map((slug) => {
              const p = projects.find((x) => x.slug === slug)!
              return (
                <li key={slug}>
                  <Link
                    href={`/progetti/${slug}/`}
                    onClick={() => segnaOrigine("nessuna")}
                    className="group flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 shadow-[inset_0_0_0_1px_var(--riga-forte)] transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_var(--inchiostro)]"
                  >
                    <span className="monocromo relative block size-9 shrink-0 overflow-hidden rounded-full bg-palco">
                      <Image src={p.cover.src} alt="" fill sizes="36px" className="object-cover object-top" />
                    </span>
                    <span className="text-[0.9375rem] font-medium">{p.title}</span>
                    <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : null}
      </motion.div>
    </article>
  )
}
