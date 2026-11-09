"use client"

import Image from "next/image"
import Link from "next/link"
import { ViewTransition, type CSSProperties } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { profile, projects } from "@/lib/portfolio-data"
import { progettiEn } from "@/lib/inglese"
import { useLingua } from "@/components/foglio/lingua"
import { Palco } from "./schermo"
import { nomePassaggio, segnaOrigine } from "./anteprima"

// I tre progetti più importanti, già nella prima schermata: Tripify (la triennale), la tesi
// e ApKit4D (la magistrale). Larghezze
// diverse: i telefoni stanno in un riquadro stretto, le finestre in uno largo.
const VETRINA = [
  { slug: "tripify", colonne: "md:col-span-3" },
  { slug: "tesi", colonne: "md:col-span-5" },
  { slug: "apkit4d", colonne: "md:col-span-4" },
]

const ritardo = (i: number) => ({ "--i": i }) as CSSProperties

/**
 * Prima schermata: la frase a due voci che si apre con il nome, la
 * presentazione e le due azioni; sui desktop larghi, accanto, il disegno degli
 * strati (database, server, interfaccia, rete neurale). Sotto, i tre progetti
 * principali, che si affacciano già prima di scorrere.
 */
export function Apertura() {
  const { t } = useLingua()
  return (
    <section aria-labelledby="apertura-titolo" className="relative pt-28 md:pt-32">
      <div className="contenitore">
        <div className="min-[90rem]:grid min-[90rem]:grid-cols-12 min-[90rem]:items-center min-[90rem]:gap-x-[var(--passo)]">
          <div className="min-[90rem]:col-span-9">
            <h1 id="apertura-titolo" className="titolo-1 max-w-[62rem]">
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

            {/* Da 64rem le azioni a sinistra e la presentazione a destra; da 90rem, con il disegno accanto, di nuovo una sotto l'altra. */}
            <div className="mt-8 grid grid-cols-4 gap-x-[var(--passo)] gap-y-8 md:grid-cols-12 lg:mt-12 min-[90rem]:mt-9 min-[90rem]:flex min-[90rem]:flex-col min-[90rem]:gap-9">
              <p className="sale lead col-span-4 max-w-[46ch] md:col-span-8 lg:order-2 lg:col-span-5 lg:col-start-8 min-[90rem]:order-none" style={ritardo(4)}>
                {t(
                  "Studio Informatica all'Università della Calabria e, da ottobre 2026, anche la magistrale in intelligenza artificiale. Qui ci sono i miei progetti, con il codice vero.",
                  "I study Computer Science at the University of Calabria and, since October 2026, an AI master's too. Here is my work, with the real code.",
                )}
              </p>
              <div className="sale col-span-4 flex flex-wrap gap-3 self-start md:col-span-8 lg:order-1 lg:col-span-6 min-[90rem]:order-none" style={ritardo(5)}>
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
          </div>

          {/* La frase del titolo disegnata: dal database all'interfaccia, verso l'AI. */}
          <div aria-hidden className="sale hidden justify-center min-[90rem]:col-span-3 min-[90rem]:flex" style={ritardo(3)}>
            <Image
              src="/apertura/strati.webp"
              alt=""
              width={624}
              height={1141}
              priority
              sizes="(min-width: 1440px) 20rem, 0px"
              className="h-[min(33rem,62vh)] w-auto select-none"
              draggable={false}
            />
          </div>
        </div>

        <ul
          aria-label={t("Progetti principali", "Featured work")}
          className="mt-14 grid grid-cols-1 gap-x-[var(--passo)] gap-y-10 md:mt-16 md:grid-cols-12 lg:mt-20"
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
