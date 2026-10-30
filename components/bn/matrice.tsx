"use client"

import { useState } from "react"
import { projects, stack } from "@/lib/portfolio-data"
import { TechIcon } from "@/components/tech-icon"
import { useLingua } from "@/components/bn/lingua"

// Una riga per tecnologia, nell'ordine dei gruppi, senza doppioni (Kotlin).
const righe = stack.flatMap((g) => g.items.map((item) => ({ item, gruppo: g.group }))).filter(
  (r, i, tutte) => tutte.findIndex((x) => x.item === r.item) === i,
)

const corto: Record<string, string> = {
  tripify: "Tripify",
  tesi: "Tesi",
  goldenstay: "GoldenStay",
  moneymind: "MoneyMind",
  "muscle-fitness": "M&F",
  wavely: "WAVE.LY",
  "alghe-4d": "Alghe 4D",
}

const gruppiEn: Record<string, string> = {
  Linguaggi: "Languages",
  Frontend: "Frontend",
  "Backend e database": "Backend & data",
  "Mobile e desktop": "Mobile & desktop",
  Infrastruttura: "Infrastructure",
}

/**
 * Competenze come tavola incrociata: tecnologie in riga, progetti in
 * colonna, un punto dove una tecnologia è stata usata. Passando su una riga
 * si accendono i progetti, passando su una colonna le tecnologie di quel
 * progetto. Ciò che non compare in nessun progetto è dichiarato come corso.
 */
export function Matrice() {
  const { t } = useLingua()
  const [riga, setRiga] = useState<string | null>(null)
  const [colonna, setColonna] = useState<string | null>(null)
  const acceso = (tech: string, slug: string) =>
    (riga === tech || colonna === slug) && projects.find((p) => p.slug === slug)?.stack.includes(tech)

  return (
    <div className="mt-28 md:mt-36">
      <div className="grid grid-cols-4 items-end gap-x-[var(--passo)] gap-y-4 md:grid-cols-12">
        <h3 className="col-span-4 text-[clamp(2rem,4.5vw,4rem)] font-extrabold leading-[0.9] tracking-[-0.03em] font-display [font-variation-settings:'wdth'_80] md:col-span-6">
          {t("Competenze, e dove le ho usate", "Skills, and where I used them")}
        </h3>
        <p className="col-span-4 text-pretty text-tenue md:col-span-4 md:col-start-9">
          {t(
            "Passa su una tecnologia o su un progetto: si accende l'incrocio. Dove non c'è un progetto, la tecnologia viene dai corsi.",
            "Hover a technology or a project to light up where they meet. Where there's no project, it comes from coursework.",
          )}
        </p>
      </div>

      <p className="mt-8 text-sm text-tenue md:hidden">{t("Scorri la tabella di lato", "Swipe the table sideways")}</p>
      <div className="vetro-piatto mt-4 overflow-x-auto rounded-[22px] px-4 py-3 sm:px-6 md:mt-10">
        <table className="w-full min-w-[40rem] border-collapse text-sm" onPointerLeave={() => (setRiga(null), setColonna(null))}>
          <thead>
            <tr>
              <th scope="col" className="dato w-[30%] border-b border-riga-forte pb-3 text-left font-normal text-tenue">
                {t("Tecnologia", "Technology")}
              </th>
              {projects.map((p) => (
                <th
                  key={p.slug}
                  scope="col"
                  onPointerEnter={() => (setColonna(p.slug), setRiga(null))}
                  className={`dato border-b border-riga-forte px-1 pb-3 text-center font-normal transition-colors ${
                    colonna === p.slug ? "text-testo" : "text-tenue"
                  }`}
                >
                  {corto[p.slug]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {righe.map((r, ri) => {
              const nuovoGruppo = ri === 0 || righe[ri - 1].gruppo !== r.gruppo
              const usi = projects.filter((p) => p.stack.includes(r.item)).length
              return (
                <tr
                  key={r.item}
                  onPointerEnter={() => (setRiga(r.item), setColonna(null))}
                  className={`transition-colors ${riga === r.item ? "bg-carta text-inchiostro" : ""} ${
                    nuovoGruppo ? "border-t border-riga-forte" : "border-t border-riga"
                  }`}
                >
                  <th scope="row" className="py-2.5 pr-4 text-left font-normal">
                    <span className="flex items-center gap-3">
                      <TechIcon name={r.item} className="size-4 shrink-0 opacity-70" />
                      <span className="font-medium">{r.item}</span>
                      {nuovoGruppo ? (
                        <span className="dato ml-auto hidden text-tenue lg:inline">{t(r.gruppo, gruppiEn[r.gruppo] ?? r.gruppo)}</span>
                      ) : null}
                    </span>
                  </th>
                  {projects.map((p) => {
                    const usato = p.stack.includes(r.item)
                    return (
                      <td key={p.slug} className="px-1 py-2.5 text-center">
                        {usato ? (
                          <span
                            aria-label={t(`usato in ${p.title}`, `used in ${p.title}`)}
                            className={`inline-block size-2.5 rounded-full transition-transform duration-200 ${
                              acceso(r.item, p.slug) ? "scale-[1.6] bg-current" : "bg-current opacity-80"
                            }`}
                          />
                        ) : (
                          <span aria-hidden className="inline-block size-1 rounded-full bg-current opacity-15" />
                        )}
                      </td>
                    )
                  })}
                  {usi === 0 ? (
                    <td className="dato whitespace-nowrap pl-2 text-tenue">{t("corso", "course")}</td>
                  ) : (
                    <td />
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
