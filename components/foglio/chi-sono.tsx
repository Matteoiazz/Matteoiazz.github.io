"use client"

import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import { introEn } from "@/lib/inglese"
import { useLingua } from "@/components/foglio/lingua"

/** Chi sono: la presentazione a sinistra, i fatti in una tabella a destra, il curriculum. */
export function ChiSono() {
  const { t } = useLingua()
  const fatti = [
    { k: t("Università", "University"), v: t("Università della Calabria, Rende", "University of Calabria, Rende") },
    { k: t("Triennale", "Bachelor's"), v: t("Informatica, laurea prevista a dicembre 2026", "Computer Science, graduating in December 2026") },
    {
      k: t("Magistrale", "Master's"),
      v: t("Artificial Intelligence and Computer Science, da ottobre 2026", "Artificial Intelligence and Computer Science, since October 2026"),
    },
    { k: t("Base", "Based in"), v: t("Cosenza, Italia", "Cosenza, Italy") },
    { k: t("Lingue", "Languages"), v: t("Italiano madrelingua, inglese B2", "Italian (native), English B2") },
    { k: t("Fuori dal codice", "Away from code"), v: t("Palestra e sport", "Gym and sport") },
  ]
  return (
    <section id="chi-sono" aria-labelledby="chi-sono-titolo" className="pt-28 md:pt-40">
      <div className="contenitore grid grid-cols-4 gap-x-[var(--passo)] md:grid-cols-12">
        <h2 id="chi-sono-titolo" className="titolo-2 col-span-4 md:col-span-9">
          {t("Chi sono.", "About.")} <span className="seconda">{t("Studio, costruisco, mi alleno.", "I study, I build, I train.")}</span>
        </h2>

        <div className="col-span-4 mt-10 md:col-span-6 md:mt-14">
          <p className="lead">{t(profile.intro, introEn)}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="/Matteo_Iazzolino_CV.pdf" download className="pillola pillola-piena" data-verso="giu">
              {t("Scarica il curriculum", "Download résumé")}
              <ArrowDown aria-hidden />
            </a>
            <Link href="/cv/" className="pillola pillola-filo">
              {t("Leggilo qui", "Read it here")}
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>

        <dl className="col-span-4 mt-14 border-t border-riga md:col-span-5 md:col-start-8 md:mt-16">
          {fatti.map((f) => (
            <div key={f.k} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 border-b border-riga py-4">
              <dt className="text-grigio">{f.k}</dt>
              <dd className="text-pretty">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
