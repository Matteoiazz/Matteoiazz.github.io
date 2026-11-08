"use client"

import Image from "next/image"
import { experiences } from "@/lib/portfolio-data"
import { percorsoEn } from "@/lib/inglese"
import { useLingua } from "@/components/foglio/lingua"

/**
 * Il percorso come righe di registro: quando, cosa e dove (con il logo
 * dell'istituzione), e in due righe che cosa ha voluto dire. I loghi stanno in
 * bianco e nero come le schermate e prendono colore al passaggio sulla riga.
 */
export function Percorso() {
  const { t, lingua } = useLingua()
  return (
    <section id="percorso" aria-labelledby="percorso-titolo" className="pt-28 md:pt-40">
      <div className="contenitore">
        <h2 id="percorso-titolo" className="titolo-2 max-w-[22ch]">
          {t("Percorso.", "Path.")} <span className="seconda">{t("Dal liceo alla magistrale in AI.", "From high school to an AI master's.")}</span>
        </h2>
        <ol className="mt-12 border-t border-riga md:mt-16">
          {experiences.map((e) => {
            const en = percorsoEn[e.role]
            const inglese = lingua === "en" && en
            return (
              <li key={e.role} className="group grid grid-cols-4 gap-x-[var(--passo)] gap-y-4 border-b border-riga py-7 md:grid-cols-12 md:py-9">
                <p className="col-span-4 md:col-span-3">
                  <span className="cifre block">{inglese ? en.period : e.period}</span>
                  <span className="block text-sm text-grigio">{inglese ? en.tipo : e.tipo}</span>
                </p>
                <div className="col-span-4 flex items-start gap-4 md:col-span-4">
                  {e.logo ? (
                    <span className="monocromo relative block size-12 shrink-0 rounded-[12px] bg-palco md:size-16">
                      <span className="absolute inset-[13%]">
                        <Image src={e.logo} alt="" fill sizes="64px" className="object-contain" />
                      </span>
                    </span>
                  ) : null}
                  <div className="min-w-0">
                    <h3 className="titolo-3 text-balance">{inglese ? en.role : e.role}</h3>
                    <p className="mt-1.5 text-grigio">{e.company}</p>
                  </div>
                </div>
                <p className="col-span-4 max-w-[60ch] text-pretty md:col-span-5">{inglese ? en.description : e.description}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
