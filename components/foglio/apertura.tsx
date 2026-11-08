"use client"

import Image from "next/image"
import Link from "next/link"
import { ViewTransition, useEffect, useRef, type CSSProperties } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { profile, projects } from "@/lib/portfolio-data"
import { progettiEn } from "@/lib/inglese"
import { useLingua } from "@/components/foglio/lingua"
import { Palco } from "./schermo"
import { nomePassaggio, segnaOrigine } from "./anteprima"

// I tre progetti con il caso di studio, già nella prima schermata. Larghezze
// diverse: i telefoni stanno in un riquadro stretto, le finestre in uno largo.
const VETRINA = [
  { slug: "tripify", colonne: "md:col-span-3" },
  { slug: "tesi", colonne: "md:col-span-5" },
  { slug: "goldenstay", colonne: "md:col-span-4" },
]

const ritardo = (i: number) => ({ "--i": i }) as CSSProperties

/**
 * Prima schermata: la frase a due voci che si apre con il nome, due righe di
 * presentazione, le due azioni; il fiore a destra; sotto, i tre progetti
 * principali che si affacciano già prima di scorrere.
 */
export function Apertura() {
  const { t } = useLingua()
  return (
    <section aria-labelledby="apertura-titolo" className="relative pt-28 md:pt-36">
      <div className="contenitore">
        <div className="relative">
          <div className="relative z-10 max-w-[62rem]">
            <h1 id="apertura-titolo" className="titolo-1">
              <span className="sale block" style={ritardo(0)}>
                {profile.name},
              </span>
              <span className="sale block" style={ritardo(1)}>
                {profile.role}.
              </span>
              <span className="sale seconda block" style={ritardo(2)}>
                {t("Dal database all'interfaccia,", "From database to interface,")}
              </span>
              <span className="sale seconda block" style={ritardo(3)}>
                {t("verso l'AI.", "heading into AI.")}
              </span>
            </h1>
            <p className="sale lead mt-8 max-w-[46ch]" style={ritardo(4)}>
              {t(
                "Studio Informatica all'Università della Calabria e, da ottobre 2026, anche la magistrale in intelligenza artificiale. Qui ci sono i miei progetti, con il codice vero.",
                "I study Computer Science at the University of Calabria and, since October 2026, an AI master's too. Here is my work, with the real code.",
              )}
            </p>
            <div className="sale mt-9 flex flex-wrap gap-3" style={ritardo(5)}>
              <a href="#progetti" className="pillola pillola-piena" data-verso="giu">
                {t("Vedi i progetti", "See the work")}
                <ArrowDown aria-hidden />
              </a>
              <Link href="/cv/" className="pillola pillola-filo" data-verso="su">
                {t("Curriculum", "Résumé")}
                <ArrowUpRight aria-hidden />
              </Link>
            </div>
          </div>

          <Fiore className="pointer-events-none absolute right-[-1.5%] top-1/2 hidden w-[min(25vw,27rem)] -translate-y-1/2 xl:block" />
          <Fiore className="pointer-events-none mx-auto mt-10 w-[min(46vw,14rem)] md:w-[min(34vw,17rem)] xl:hidden" />
        </div>

        <ul
          aria-label={t("Progetti principali", "Featured work")}
          className="mt-14 grid grid-cols-1 gap-x-[var(--passo)] gap-y-10 md:mt-20 md:grid-cols-12 xl:mt-24"
        >
          {VETRINA.map(({ slug, colonne }, i) => (
            <Vetrina key={slug} slug={slug} colonne={colonne} i={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function Vetrina({ slug, colonne, i }: { slug: string; colonne: string; i: number }) {
  const { t } = useLingua()
  const p = projects.find((x) => x.slug === slug)!
  const en = progettiEn[slug]
  return (
    <li className={`compare ${colonne}`} style={ritardo(i)}>
      <Link
        href={`/progetti/${p.slug}/`}
        className="group block"
        data-cursore={t("Apri", "Open")}
        onClick={(e) => segnaOrigine(e.detail === 0 ? "nessuna" : "copertina")}
      >
        <ViewTransition name={nomePassaggio(p.slug)} share="passaggio" default="none">
          <div className="monocromo relative h-[clamp(15rem,25vw,24rem)] overflow-hidden rounded-[14px] bg-palco">
            <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]">
              <Palco shots={[p.cover, ...p.gallery]} titolo={p.title} priorita sizes="(min-width: 768px) 30vw, 80vw" />
            </div>
          </div>
        </ViewTransition>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[1.05rem] font-medium leading-snug tracking-[-0.01em]">
              <span className="traccia">{p.title}</span>
            </h2>
            <p className="mt-0.5 text-[0.9rem] text-grigio">
              {t(p.kind, en.kind)} · <span className="cifre">{p.year}</span>
            </p>
          </div>
          <ArrowUpRight
            aria-hidden
            className="mt-0.5 size-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </Link>
    </li>
  )
}

/**
 * Il fiore cromato, unico oggetto della pagina: sboccia all'arrivo, gira
 * piano scendendo e si piega appena verso il puntatore.
 */
function Fiore({ className }: { className: string }) {
  const piega = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = piega.current
    if (!el) return
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    const passo = () => {
      x += (tx - x) * 0.08
      y += (ty - y) * 0.08
      el.style.transform = `perspective(900px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 11).toFixed(2)}deg)`
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(passo) : 0
    }
    const muovi = (e: PointerEvent) => {
      tx = e.clientX / innerWidth - 0.5
      ty = e.clientY / innerHeight - 0.5
      if (!frame) frame = requestAnimationFrame(passo)
    }
    window.addEventListener("pointermove", muovi, { passive: true })
    return () => {
      window.removeEventListener("pointermove", muovi)
      cancelAnimationFrame(frame)
    }
  }, [])
  return (
    <div aria-hidden className={className}>
      <div className="fiorisce">
        <div className="fiore-gira">
          <div ref={piega}>
            <Image
              src="/fiore-bianco.webp"
              alt=""
              width={723}
              height={664}
              priority
              draggable={false}
              sizes="(min-width: 1280px) 27rem, 64vw"
              className="h-auto w-full select-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
