"use client"

import { useState } from "react"
import { projects, stack } from "@/lib/portfolio-data"
import { progettiEn } from "@/lib/inglese"
import { useLingua } from "@/components/foglio/lingua"
import { TechIcon } from "@/components/tech-icon"

const gruppiEn: Record<string, string> = {
  Linguaggi: "Languages",
  Frontend: "Frontend",
  "Backend e database": "Backend and databases",
  "Mobile e desktop": "Mobile and desktop",
  Infrastruttura: "Infrastructure",
}

const usata = (tecnologia: string) => projects.filter((p) => p.stack.includes(tecnologia))

/**
 * Lo stack come prova: ogni tecnologia accende i progetti in cui è stata
 * usata, ogni progetto accende le sue tecnologie. Funziona al passaggio, al
 * tocco e da tastiera; quelle senza progetto vengono dai corsi.
 */
export function Stack() {
  const { t } = useLingua()
  const [tecnologia, setTecnologia] = useState<string | null>(null)
  const [progetto, setProgetto] = useState<string | null>(null)

  const accesa = (nome: string): boolean | null => {
    if (tecnologia) return tecnologia === nome
    if (progetto) return projects.find((p) => p.slug === progetto)!.stack.includes(nome)
    return null
  }
  const progettoAcceso = (slug: string, lista: string[]): boolean | null => {
    if (progetto) return progetto === slug
    if (tecnologia) return lista.includes(tecnologia)
    return null
  }
  const spegni = () => {
    setTecnologia(null)
    setProgetto(null)
  }

  return (
    <section id="stack" aria-labelledby="stack-titolo" className="pt-28 md:pt-40">
      <div className="contenitore">
        <div className="grid grid-cols-4 items-end gap-x-[var(--passo)] gap-y-5 md:grid-cols-12">
          <h2 id="stack-titolo" className="titolo-2 col-span-4 md:col-span-8">
            {t("Stack.", "Stack.")} <span className="seconda">{t("Ogni tecnologia porta a un progetto.", "Every tool leads to a project.")}</span>
          </h2>
          <p className="col-span-4 max-w-[40ch] text-grigio md:col-span-4 md:col-start-9 md:pb-1">
            {t(
              "Scegli una tecnologia: si accendono i progetti in cui l'ho usata. Oppure parti da un progetto.",
              "Pick a tool and the projects where I used it light up. Or start from a project.",
            )}
          </p>
        </div>

        <div
          className="mt-12 grid grid-cols-4 gap-x-[var(--passo)] gap-y-12 md:mt-16 md:grid-cols-12"
          onPointerLeave={(e) => e.pointerType === "mouse" && spegni()}
        >
          <div className="col-span-4 border-t border-riga md:col-span-8">
            {stack.map((g) => (
              <div key={g.group} className="grid gap-3 border-b border-riga py-5 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:gap-6">
                <p className="pt-1.5 text-grigio">{t(g.group, gruppiEn[g.group] ?? g.group)}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((nome) => {
                    const n = usata(nome).length
                    const stato = accesa(nome)
                    return (
                      <li key={nome}>
                        <button
                          type="button"
                          aria-pressed={tecnologia === nome}
                          onPointerEnter={(e) => {
                            if (e.pointerType !== "mouse") return
                            setProgetto(null)
                            setTecnologia(nome)
                          }}
                          onFocus={() => {
                            setProgetto(null)
                            setTecnologia(nome)
                          }}
                          onClick={() => {
                            setProgetto(null)
                            setTecnologia((x) => (x === nome ? null : nome))
                          }}
                          className={`tecnologia inline-flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3 text-[0.9rem] ${
                            stato === true
                              ? "bg-inchiostro text-carta"
                              : stato === false
                                ? "text-grigio shadow-[inset_0_0_0_1px_var(--riga)]"
                                : "shadow-[inset_0_0_0_1px_var(--riga-forte)]"
                          }`}
                        >
                          <TechIcon name={nome} className="size-4" />
                          {nome}
                          <span className={`cifre text-xs ${stato === true ? "text-carta/70" : "text-grigio"}`}>
                            {n > 0 ? n : t("corso", "course")}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          <ol aria-label={t("Progetti", "Projects")} className="col-span-4 self-start border-t border-riga md:sticky md:top-24 md:col-span-4 md:col-start-9">
            {projects.map((p) => {
              const stato = progettoAcceso(p.slug, p.stack)
              return (
                <li key={p.slug} className="border-b border-riga">
                  <button
                    type="button"
                    aria-pressed={progetto === p.slug}
                    onPointerEnter={(e) => {
                      if (e.pointerType !== "mouse") return
                      setTecnologia(null)
                      setProgetto(p.slug)
                    }}
                    onFocus={() => {
                      setTecnologia(null)
                      setProgetto(p.slug)
                    }}
                    onClick={() => {
                      setTecnologia(null)
                      setProgetto((x) => (x === p.slug ? null : p.slug))
                    }}
                    className={`voce-progetto flex w-full items-center justify-between gap-4 py-3.5 text-left ${stato === false ? "text-grigio" : ""}`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={`size-2 rounded-full transition-colors duration-300 ${stato === true ? "bg-inchiostro" : "bg-riga"}`}
                      />
                      <span className="font-medium">{p.title}</span>
                    </span>
                    <span className="text-right text-sm text-grigio">{t(p.kind, progettiEn[p.slug].kind)}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
