"use client"

import { ArrowDown } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import { Griglia } from "@/components/bn/griglia"
import { Nome } from "@/components/bn/nome"
import { Palette } from "@/components/bn/palette"
import { useLingua } from "@/components/bn/lingua"
import { useOraCosenza } from "@/components/bn/comuni"

/**
 * Prima schermata: il nome su tutta la larghezza della griglia, che si
 * costruisce cella per cella e risponde al puntatore. Sopra, la riga a
 * palette che alterna ruolo e stack; sotto, coordinate e ora di Cosenza,
 * disponibilità e le due azioni.
 */
export function Apertura() {
  const { t } = useLingua()
  const ora = useOraCosenza()
  return (
    <section id="top" className="chiaro relative flex min-h-svh flex-col overflow-hidden">
      <Griglia />

      <div className="contenitore relative z-10 grid flex-1 grid-cols-4 content-start gap-x-[var(--passo)] gap-y-8 pt-28 md:grid-cols-12 md:pt-32">
        <div className="col-span-4 md:col-span-7">
          <Palette
            frasi={t(
              ["Junior Full-Stack Developer", "Java · Spring Boot · Angular", "React · Kotlin · Python", "Verso l'AI · Magistrale UniCal"],
              ["Junior Full-Stack Developer", "Java · Spring Boot · Angular", "React · Kotlin · Python", "Heading to AI · MSc UniCal"],
            )}
            className="text-[clamp(0.7rem,2.9vw,1.55rem)]"
          />
        </div>
        <p className="col-span-4 max-w-[36ch] text-pretty text-lg leading-snug md:col-span-4 md:col-start-9 md:text-xl">
          {t(
            "Costruisco applicazioni intere, dal modello dati all'interfaccia. Studio Informatica all'Università della Calabria e, da ottobre, la magistrale in AI.",
            "I build complete applications, from the data model to the interface. I study Computer Science at the University of Calabria and, since October, the master's in AI.",
          )}
        </p>
      </div>

      <div className="contenitore relative z-10 pb-6">
        <Nome righe={["MATTEO", "IAZZOLINO"]} etichetta={profile.name} subito massimo={0.3} />

        {/* L'azione principale in basso a sinistra, sotto l'inizio del nome:
            l'occhio finisce la parola e la trova lì. */}
        <div className="mt-6 grid grid-cols-4 items-end gap-x-[var(--passo)] gap-y-5 border-t border-riga-forte pt-4 md:grid-cols-12">
          <div className="col-span-4 flex flex-wrap gap-3 md:col-span-6">
            <a
              href="#progetti"
              data-cursore={t("Vai", "Go")}
              className="group flex items-center gap-2 bg-inchiostro px-5 py-3 text-sm font-medium text-carta"
            >
              {t("Vedi i progetti", "See the work")}
              <ArrowDown aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="/Matteo_Iazzolino_CV.pdf"
              download="Matteo_Iazzolino_CV.pdf"
              className="border border-inchiostro px-5 py-3 text-sm font-medium transition-colors hover:bg-inchiostro hover:text-carta"
            >
              {t("Curriculum PDF", "CV (PDF)")}
            </a>
          </div>
          <p className="col-span-2 flex items-center gap-2 text-sm md:col-span-3">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-inchiostro opacity-40 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-inchiostro" />
            </span>
            {t("Aperto a nuove opportunità", "Open to new opportunities")}
          </p>
          <p className="dato col-span-2 text-right md:col-span-3" suppressHydrationWarning>
            39°18′N 16°15′E
            <br />
            Cosenza · {ora || "--:--:--"}
          </p>
        </div>
      </div>
    </section>
  )
}
