"use client"

import { useState } from "react"
import { progettiCon, stack } from "@/lib/portfolio-data"
import { TechIcon } from "@/components/tech-icon"

/**
 * Competenze come indice interattivo: ogni tecnologia dice in quali progetti
 * è stata usata, ricavandolo dagli stack dei progetti (niente elenchi da
 * tenere allineati a mano).
 *
 * Col mouse la risposta compare nella riga in alto e le altre voci si
 * attenuano: niente righe che si aprono sotto il puntatore e spingono giù le
 * successive mentre lo si muove. Col tocco (o con un clic) la voce si apre
 * sul posto, perché la riga in alto può essere fuori dallo schermo.
 */
export function Competenze() {
  const [sopra, setSopra] = useState<string | null>(null)
  const [aperta, setAperta] = useState<string | null>(null)
  const usiSopra = sopra ? progettiCon(sopra) : []

  return (
    <div className="mt-24 sm:mt-32">
      <div className="flex flex-col gap-3 border-b border-[var(--hairline)] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">Competenze</h3>
        <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground sm:text-right">
          {sopra ? (
            <>
              <span className="text-foreground">{sopra}</span>
              {" · "}
              {usiSopra.length ? usiSopra.map((p) => p.title).join(", ") : "studiato nei corsi universitari"}
            </>
          ) : (
            "Passa sopra una tecnologia, o toccala, per vedere dove l'ho usata."
          )}
        </p>
      </div>

      <div
        data-attiva={sopra ? "" : undefined}
        className="competenze mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      >
        {stack.map((gruppo, gi) => (
          <div key={gruppo.group} className="story-in">
            <p className="eyebrow uppercase">
              {String(gi + 1).padStart(2, "0")} · {gruppo.group}
            </p>
            <ul className="mt-4">
              {gruppo.items.map((tech) => {
                const chiave = `${gruppo.group}/${tech}`
                const usi = progettiCon(tech)
                const sua = aperta === chiave
                return (
                  <li
                    key={chiave}
                    data-on={sopra === tech ? "" : undefined}
                    className="competenza border-b border-[var(--hairline)] transition-opacity duration-200"
                  >
                    <button
                      type="button"
                      aria-expanded={sua}
                      onClick={() => setAperta(sua ? null : chiave)}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setSopra(tech)}
                      onPointerLeave={(e) => e.pointerType === "mouse" && setSopra(null)}
                      onFocus={() => setSopra(tech)}
                      onBlur={() => setSopra(null)}
                      className="flex w-full items-center gap-3 py-3 text-left text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
                    >
                      <TechIcon name={tech} className="size-4 shrink-0" />
                      <span className="flex-1">{tech}</span>
                      <span className="eyebrow text-[0.65rem]">{usi.length ? `×${usi.length}` : "corso"}</span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        sua ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-3 pl-7 text-xs leading-relaxed text-muted-foreground">
                          {usi.length ? usi.map((p) => p.title).join(" · ") : "Studiato nei corsi universitari"}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
