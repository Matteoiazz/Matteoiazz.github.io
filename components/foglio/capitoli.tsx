"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { capitoli, fasce, stackCompleto, type Capitolo } from "@/lib/storia"
import { projects } from "@/lib/portfolio-data"
import { useLingua } from "@/components/foglio/lingua"
import { useMovimentoRidotto } from "@/components/foglio/comuni"
import { StratiDaVicino, StratiStoria } from "./strati"
import { Palco } from "./schermo"
import { segnaOrigine } from "./anteprima"

/**
 * I capitoli della storia: le fondamenta, il motore, quello che si vede, verso
 * l'AI, e in parallelo. Il racconto scorre e il disegno degli strati resta
 * fermo, costruendosi un capitolo alla volta: sul desktop a destra del testo,
 * sul telefono in una barra fissa in alto, da vicino, con la vista che sale di
 * uno strato a ogni capitolo. Nella barra c'è il nome dello strato; quando il
 * titolo del capitolo è scorso via compare lì in piccolo (come i titoli grandi
 * di iOS), e un filetto in basso si riempie man mano che la storia va avanti.
 */
export function Capitoli() {
  const { t, lingua } = useLingua()
  const sezione = useRef<HTMLElement>(null)
  const pila = useRef<HTMLDivElement>(null)
  const [attivo, setAttivo] = useState(-1)
  const [titoloInBarra, setTitoloInBarra] = useState(false)
  const [titoloFisso, setTitoloFisso] = useState("")

  // Il capitolo in lettura è l'ultimo cominciato sopra la riga di lettura: metà
  // schermo sul desktop, poco sopra la metà dello spazio libero sotto la barra sul telefono.
  useEffect(() => {
    const blocchi = [...document.querySelectorAll<HTMLElement>("[data-capitolo-storia]")]
    let frame = 0
    const misura = () => {
      frame = 0
      const barra = pila.current
      const fondoBarra = barra && barra.offsetParent !== null ? barra.getBoundingClientRect().bottom : 0
      const riga = fondoBarra + (window.innerHeight - fondoBarra) * (fondoBarra > 0 ? 0.42 : 0.5)
      let corrente = -1
      blocchi.forEach((b, i) => {
        if (b.getBoundingClientRect().top <= riga) corrente = i
      })
      setAttivo(corrente)
      const titolo = corrente >= 0 ? blocchi[corrente].querySelector("h2") : null
      setTitoloInBarra(Boolean(titolo && fondoBarra > 0 && titolo.getBoundingClientRect().bottom < fondoBarra))
    }
    const scorri = () => {
      if (!frame) frame = requestAnimationFrame(misura)
    }
    misura()
    window.addEventListener("scroll", scorri, { passive: true })
    window.addEventListener("resize", scorri)
    return () => {
      window.removeEventListener("scroll", scorri)
      window.removeEventListener("resize", scorri)
      cancelAnimationFrame(frame)
    }
  }, [])

  const capitolo = attivo >= 0 ? capitoli[attivo] : undefined
  // Il nome dello strato inquadrato nella barra; all'ultimo capitolo, la pila intera.
  const fascia = capitolo?.strato ? fasce.find((f) => f.id === capitolo.strato) : undefined
  const strato = fascia ? t(fascia.nome.it, fascia.nome.en) : capitolo ? t(stackCompleto.it, stackCompleto.en) : ""

  // Il titolo in barra cambia solo quando è visibile: mentre svanisce resta quello di prima.
  useEffect(() => {
    if (titoloInBarra && capitolo) setTitoloFisso(lingua === "en" ? capitolo.titolo.en : capitolo.titolo.it)
  }, [titoloInBarra, capitolo, lingua])

  // Quanta storia è passata, per il filetto della barra (calcolato in JavaScript).
  const { scrollYProgress } = useScroll({ target: sezione, offset: ["start 20%", "end 60%"] })
  const avanzamento = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v)))

  return (
    <section ref={sezione} aria-label={t("I capitoli", "The chapters")} className="relative">
      <div ref={pila} aria-hidden data-no-stampa className="pila-fissa z-30 bg-carta lg:hidden">
        <div className="contenitore flex h-[clamp(8.5rem,19svh,10rem)] items-stretch justify-between gap-4">
          <StratiDaVicino attivo={capitolo?.strato ?? null} tutti={capitolo?.strato === null} className="h-full" />
          <div className="flex min-w-0 flex-col items-end justify-center text-right">
            {/* Il nome dello strato inquadrato: cambia con il capitolo. */}
            <p key={strato} className="cambia text-balance text-[1.15rem] font-medium leading-tight tracking-[-0.01em]">
              {strato}
            </p>
            {/* Il titolo del capitolo, quando quello grande è scorso via. */}
            <p
              className={`mt-1.5 min-h-5 text-balance text-sm leading-snug text-grigio transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                titoloInBarra ? "opacity-100" : "translate-y-1 opacity-0"
              }`}
            >
              {titoloFisso}
            </p>
          </div>
        </div>
        <div className="h-px bg-riga">
          <motion.div className="h-px origin-left bg-inchiostro" style={{ scaleX: avanzamento }} />
        </div>
      </div>

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
    <article
      ref={ref}
      id={`capitolo-${c.id}`}
      data-capitolo-storia={i}
      className="py-14 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-24"
    >
      <motion.div style={fermo ? undefined : { opacity: opacita, y }}>
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
