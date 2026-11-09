"use client"

import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import { useLingua } from "@/components/foglio/lingua"

/** Dopo la storia, il riassunto per chi deve decidere in fretta: i fatti in una tabella e il curriculum. */
export function InBreve() {
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
    <section id="in-breve" aria-labelledby="in-breve-titolo" className="pt-28 md:pt-40">
      <div className="contenitore grid grid-cols-4 gap-x-[var(--passo)] gap-y-12 md:grid-cols-12">
        <div className="col-span-4 md:col-span-5">
          <h2 id="in-breve-titolo" className="titolo-2">
            {t("In breve.", "In short.")} <span className="seconda">{t("Il riassunto, con il curriculum.", "The summary, with the résumé.")}</span>
          </h2>
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
        <dl className="col-span-4 self-end border-t border-riga md:col-span-6 md:col-start-7">
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
