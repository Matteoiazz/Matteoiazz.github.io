"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { prologo } from "@/lib/storia"
import { useLingua } from "@/components/foglio/lingua"
import { useMovimentoRidotto } from "@/components/foglio/comuni"

/**
 * L'inizio della storia: una frase che resta ferma al centro dello schermo e
 * si accende una parola alla volta mentre si scorre. Per andare avanti bisogna
 * leggerla. Con il movimento ridotto è subito tutta a fuoco.
 */
export function Prologo() {
  const { t } = useLingua()
  const sezione = useRef<HTMLElement>(null)
  const fermo = useMovimentoRidotto()
  const { scrollYProgress } = useScroll({ target: sezione, offset: ["start start", "end end"] })
  const parole = t(prologo.it, prologo.en).split(" ")

  return (
    <section
      id="storia"
      ref={sezione}
      aria-label={t("La storia", "The story")}
      className={fermo ? "pt-28 md:pt-40" : "relative h-[240svh]"}
    >
      <div className={fermo ? "" : "sticky top-0 flex h-svh items-center"}>
        <div className="contenitore">
          <p className="max-w-[30ch] text-pretty text-[clamp(1.75rem,1rem+2.6vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.028em]">
            {parole.map((parola, i) =>
              fermo ? (
                <span key={i}>{parola} </span>
              ) : (
                <Parola
                  key={i}
                  parola={parola}
                  progresso={scrollYProgress}
                  da={0.06 + (i / parole.length) * 0.8}
                  a={0.06 + ((i + 1) / parole.length) * 0.8}
                />
              ),
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

function Parola({ parola, progresso, da, a }: { parola: string; progresso: MotionValue<number>; da: number; a: number }) {
  // Forma a funzione: il calcolo resta in JavaScript. Con i fotogrammi chiave motion
  // lo passerebbe al browser su una timeline di scorrimento, e lì gli intervalli
  // dentro un elemento fermo (sticky) escono sbagliati.
  const opacita = useTransform(progresso, (v) => 0.16 + 0.84 * Math.min(1, Math.max(0, (v - da) / (a - da))))
  return (
    <>
      <motion.span style={{ opacity: opacita }}>{parola}</motion.span>{" "}
    </>
  )
}
