"use client"

import type { CSSProperties } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { profile, projects, stack } from "@/lib/portfolio-data"
import { introEn } from "@/lib/inglese"
import { Griglia } from "@/components/bn/griglia"
import { Nome } from "@/components/bn/nome"
import { Contatore } from "@/components/bn/contatore"
import { Matrice } from "@/components/bn/matrice"
import { useLingua } from "@/components/bn/lingua"

const tecnologie = new Set([...stack.flatMap((g) => g.items), ...projects.flatMap((p) => p.stack)]).size

/**
 * Chi sono, su fondo nero: la parola gigante, il manifesto che si accende
 * parola per parola, i numeri dentro una frase (non in una fila di
 * riquadri), la presentazione con il curriculum e la matrice delle
 * competenze.
 */
export function Profilo() {
  const { t } = useLingua()
  const manifesto = t(
    [
      { p: "Mi piace prendere un problema vero,", chiaro: true },
      { p: "come gli esami di un docente o le acquisizioni di un laboratorio di fisica, e trasformarlo in uno strumento che qualcuno usa davvero.", chiaro: false },
    ],
    [
      { p: "I like taking a real problem,", chiaro: true },
      { p: "like a lecturer's exams or a physics lab's microscope data, and turning it into a tool someone actually uses.", chiaro: false },
    ],
  )
  const parole = manifesto.flatMap((parte) => parte.p.split(" ").map((w) => ({ w, chiaro: parte.chiaro })))

  return (
    <section id="profilo" className="scuro relative py-24 md:py-32">
      <Griglia />
      <div className="contenitore relative z-10">
        <Nome as="h2" righe={[t("CHI SONO", "ABOUT ME")]} massimo={0.2} cromo />

        <p
          className="manifesto mt-16 max-w-[24ch] text-balance text-[clamp(1.9rem,4.4vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.025em] md:mt-24"
          style={{ "--n": parole.length } as CSSProperties}
        >
          {parole.map((w, i) => (
            <span key={`${w.w}-${i}`} className={w.chiaro ? "" : "text-tenue"} style={{ "--i": i } as CSSProperties}>
              {w.w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-20 grid grid-cols-4 gap-x-[var(--passo)] gap-y-12 md:mt-28 md:grid-cols-12">
          {/* I numeri stanno in una frase: ogni cifra ha accanto il suo contesto. */}
          <p className="col-span-4 text-pretty text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.3] md:col-span-7">
            {t("Ho lavorato a ", "I have worked on ")}
            <Contatore valore={String(projects.length)} className="font-bold" />
            {t(" progetti con ", " projects using ")}
            <Contatore valore={String(tecnologie)} className="font-bold" />
            {t(" tecnologie e strumenti, lavorato in squadre fino a ", " technologies and tools, worked in teams of up to ")}
            <Contatore valore="8" className="font-bold" />
            {t(" persone e chiuso il diploma con ", " people and finished high school with ")}
            <Contatore valore="97/100" className="font-bold" />.
            <span className="text-tenue">
              {t(" Fuori dal codice mi trovi in palestra.", " Away from code, you'll find me at the gym.")}
            </span>
          </p>

          <div className="col-span-4 md:col-span-4 md:col-start-9">
            <p className="text-pretty leading-relaxed text-tenue">{t(profile.intro, introEn)}</p>
            <p className="dato mt-6 text-tenue">
              {t("Italiano madrelingua · Inglese B2", "Italian native · English B2")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/Matteo_Iazzolino_CV.pdf" download="Matteo_Iazzolino_CV.pdf" className="flex items-center gap-2 rounded-full bg-carta px-4 py-2.5 text-sm font-medium text-inchiostro">
                {t("Scarica il CV", "Download CV")}
                <ArrowDown aria-hidden className="size-4" />
              </a>
              <a href="/cv/" className="pillola-vetro flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium">
                {t("Curriculum in pagina", "CV page")}
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <Matrice />
      </div>
    </section>
  )
}
