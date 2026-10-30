"use client"

import { useEffect, useRef, useState } from "react"
import { experiences } from "@/lib/portfolio-data"
import { percorsoEn } from "@/lib/inglese"
import { Griglia } from "@/components/bn/griglia"
import { Nome } from "@/components/bn/nome"
import { Contatore } from "@/components/bn/contatore"
import { useLingua } from "@/components/bn/lingua"

// L'anno che resta fermo a sinistra, ricavato dal periodo di ogni voce.
const annoDi = (periodo: string) => periodo.match(/20\d\d/g)?.[0] ?? ""

/**
 * Percorso come elenco editoriale su fondo bianco. A sinistra un anno
 * gigante resta fermo e rotola al valore della voce che si sta leggendo,
 * come un contachilometri; a destra le voci scorrono.
 */
export function Percorso() {
  const { t } = useLingua()
  const voci = useRef<(HTMLLIElement | null)[]>([])
  const [attiva, setAttiva] = useState(0)

  useEffect(() => {
    const o = new IntersectionObserver(
      (cambi) => {
        for (const c of cambi) {
          if (c.isIntersecting) setAttiva(Number((c.target as HTMLElement).dataset.indice))
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    voci.current.forEach((v) => v && o.observe(v))
    return () => o.disconnect()
  }, [])

  return (
    <section id="percorso" className="chiaro relative py-24 md:py-32">
      <Griglia />
      <div className="contenitore relative z-10">
        <Nome as="h2" righe={[t("PERCORSO", "PATH")]} massimo={0.2} />

        <div className="mt-16 grid grid-cols-4 gap-x-[var(--passo)] md:mt-24 md:grid-cols-12">
          <div className="col-span-4 hidden md:col-span-4 md:block">
            <div className="sticky top-28">
              <p className="text-[clamp(5rem,11vw,10rem)] font-extrabold leading-none tracking-[-0.04em] [font-variation-settings:'wdth'_76]">
                <Contatore key={attiva} valore={annoDi(experiences[attiva].period)} />
              </p>
              <p className="dato mt-4 text-tenue">
                {String(attiva + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          <ol className="col-span-4 border-t border-inchiostro md:col-span-8">
            {experiences.map((e, i) => {
              const en = percorsoEn[e.role]
              return (
                <li
                  key={e.role}
                  ref={(el) => {
                    voci.current[i] = el
                  }}
                  data-indice={i}
                  className={`grid gap-3 border-b border-riga-forte py-10 transition-opacity duration-500 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8 md:py-14 ${
                    attiva === i ? "opacity-100" : "md:opacity-45"
                  }`}
                >
                  <div>
                    <p className="dato">{t(e.period, en?.period ?? e.period)}</p>
                    <p className="dato mt-2 uppercase text-tenue">{t(e.tipo, en?.tipo ?? e.tipo)}</p>
                  </div>
                  <div>
                    <h3 className="text-balance text-[clamp(1.5rem,2.6vw,2.25rem)] font-bold leading-[1.05] tracking-[-0.02em]">
                      {t(e.role, en?.role ?? e.role)}
                    </h3>
                    <p className="mt-2 text-tenue">{e.company}</p>
                    <p className="mt-5 max-w-[60ch] text-pretty leading-relaxed">{t(e.description, en?.description ?? e.description)}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
