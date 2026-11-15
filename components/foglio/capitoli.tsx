"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useMotionValue, useScroll, useTransform } from "motion/react"
import { capitoli, fasce, stackCompleto, type Capitolo } from "@/lib/storia"
import { projects } from "@/lib/portfolio-data"
import { useLingua } from "@/components/foglio/lingua"
import { useMovimentoRidotto } from "@/components/foglio/comuni"
import { StratiDaVicino, StratiScorrevoli } from "./strati"
import { Palco } from "./schermo"
import { segnaOrigine } from "./anteprima"

const limita = (v: number) => Math.min(1, Math.max(0, v))

/**
 * I capitoli della storia: le fondamenta, il motore, quello che si vede, verso
 * l'AI, e in parallelo. Il racconto scorre e il disegno degli strati resta
 * fermo, costruendosi un capitolo alla volta. Sul desktop sta a destra del
 * testo ed è una vista esplosa che si chiude seguendo la rotella, mentre ogni
 * capitolo prende corpo al centro e si spegne uscendo. Sul telefono sta in una
 * barra fissa in alto, da vicino, con la vista che sale di uno strato a ogni
 * capitolo; nella barra c'è il nome dello strato, il titolo del capitolo quando
 * quello grande è scorso via (come i titoli grandi di iOS) e un filetto che si
 * riempie man mano che la storia va avanti.
 *
 * Tutto quello che segue lo scorrimento si misura in un punto solo, una volta
 * per fotogramma. Ai capitoli arrivano due valori, --fuoco e --salita, che il
 * foglio di stile usa solo se il movimento non è ridotto: senza script, o con
 * meno movimento, il testo resta al suo posto e si legge.
 */
export function Capitoli() {
  const { t, lingua } = useLingua()
  const sezione = useRef<HTMLElement>(null)
  const pila = useRef<HTMLDivElement>(null)
  const fermo = useMovimentoRidotto()
  const [attivo, setAttivo] = useState(-1)
  const [titoloInBarra, setTitoloInBarra] = useState(false)
  const [titoloFisso, setTitoloFisso] = useState("")
  // Posizione nella storia: k quando il capitolo k è al centro dello schermo,
  // con i decimali in mezzo. La segue il disegno del desktop.
  const posizione = useMotionValue(-1)

  useEffect(() => {
    const blocchi = [...document.querySelectorAll<HTMLElement>("[data-capitolo-storia]")]
    const corpi = blocchi.map((b) => b.firstElementChild as HTMLElement)
    const largo = matchMedia("(min-width: 64rem)")
    const scritti: string[] = []
    let frame = 0

    const misura = () => {
      frame = 0
      const alto = window.innerHeight
      const barra = pila.current
      const fondoBarra = barra && barra.offsetParent !== null ? barra.getBoundingClientRect().bottom : 0
      const rettangoli = blocchi.map((b) => b.getBoundingClientRect())
      // Dove sta il testo dentro il suo capitolo (lo spostamento che gli diamo qui sotto non conta).
      const testi = blocchi.map((b, i) => {
        const cima = rettangoli[i].top + corpi[i].offsetTop - b.offsetTop
        return { cima, fondo: cima + corpi[i].offsetHeight, alto: corpi[i].offsetHeight }
      })

      // Il capitolo in lettura è l'ultimo cominciato sopra la riga di lettura: metà
      // schermo sul desktop, poco sopra la metà dello spazio libero sotto la barra sul telefono.
      const riga = fondoBarra + (alto - fondoBarra) * (fondoBarra > 0 ? 0.42 : 0.5)
      let corrente = -1
      rettangoli.forEach((r, i) => {
        if (r.top <= riga) corrente = i
      })
      const titolo = corrente >= 0 ? blocchi[corrente].querySelector("h2") : null
      const titoloScorso = Boolean(titolo && fondoBarra > 0 && titolo.getBoundingClientRect().bottom < fondoBarra)

      // Dove cade il centro dello schermo tra i centri dei capitoli.
      const meta = alto / 2
      const centri = rettangoli.map((r) => r.top + r.height / 2)
      const ultimo = centri.length - 1
      let p = -1
      if (ultimo >= 0) {
        if (meta < centri[0]) p = (meta - centri[0]) / rettangoli[0].height
        else if (meta >= centri[ultimo]) p = ultimo + (meta - centri[ultimo]) / rettangoli[ultimo].height
        else {
          let k = 0
          while (k < ultimo && centri[k + 1] <= meta) k++
          p = k + (meta - centri[k]) / (centri[k + 1] - centri[k])
        }
      }

      // Fin qui si è solo misurato; da qui si scrive.
      setAttivo(corrente)
      setTitoloInBarra(titoloScorso)
      // Con il movimento ridotto il disegno non segue la rotella: cambia a ogni capitolo.
      posizione.set(fermo ? corrente : p)

      testi.forEach((testo, i) => {
        let fuoco: number
        let salita: number
        if (largo.matches) {
          // Desktop: il capitolo prende corpo arrivando al centro dello schermo e si
          // spegne uscendo in alto, così resta a fuoco solo quello che si sta leggendo.
          // Un testo corto si regola sul suo centro; uno più alto dello schermo sulla
          // cima quando entra e sul fondo quando esce, e in mezzo resta a fuoco.
          const cimaPiena = Math.max(alto * 0.38, alto * 0.66 - testo.alto / 2)
          const fondoPieno = Math.min(alto * 0.64, alto * 0.36 + testo.alto / 2)
          const entra = limita((cimaPiena + alto * 0.42 - testo.cima) / (alto * 0.42))
          const esce = limita((fondoPieno - testo.fondo) / (alto * 0.34))
          fuoco = entra * (1 - 0.88 * esce)
          salita = 64 * (1 - entra) - 40 * esce
        } else {
          // Telefono: entra salendo mentre arriva sotto la barra.
          const arriva = limita((alto * 0.92 - rettangoli[i].top) / (alto * 0.52))
          fuoco = arriva
          salita = 56 * (1 - arriva)
        }
        const valori = `${fuoco.toFixed(3)} ${salita.toFixed(1)}`
        if (scritti[i] === valori) return
        scritti[i] = valori
        corpi[i].style.setProperty("--fuoco", fuoco.toFixed(3))
        corpi[i].style.setProperty("--salita", `${salita.toFixed(1)}px`)
      })
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
  }, [posizione, fermo])

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
  const avanzamento = useTransform(scrollYProgress, (v) => limita(v))

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
          {/* Lo spazio a destra è per i nomi degli strati, che stanno accanto al disegno. */}
          <div className="sticky top-0 flex h-svh items-center justify-center pr-36">
            <StratiScorrevoli posizione={posizione} attivo={attivo} fermo={fermo} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Blocco({ c, i }: { c: Capitolo; i: number }) {
  const { t, lingua } = useLingua()
  const testo = lingua === "en" ? c.testo.en : c.testo.it

  return (
    <article
      id={`capitolo-${c.id}`}
      data-capitolo-storia={i}
      className="py-14 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-24"
    >
      {/* Opacità e spostamento seguono lo scorrimento: vedi .corpo-capitolo nel foglio di stile. */}
      <div className="corpo-capitolo">
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
      </div>
    </article>
  )
}
