"use client"

import Image from "next/image"
import { fasce, ordineStrati, type Strato } from "@/lib/storia"
import { useLingua } from "@/components/foglio/lingua"

type Stato = "acceso" | "visto" | "spento"

// Un velo color carta per fascia: più è opaco, più lo strato sparisce.
const VELO: Record<Stato, string> = { acceso: "opacity-0", visto: "opacity-55", spento: "opacity-[0.9]" }

/**
 * Il disegno degli strati che accompagna la storia. Lo strato del capitolo in
 * lettura è acceso, quelli già raccontati restano visibili a metà, quelli
 * ancora da raccontare quasi spariscono: lo stack si costruisce dal basso,
 * come il racconto. Accanto, i nomi degli strati.
 */
export function StratiStoria({
  attivo,
  tutti = false,
  etichette = true,
  className = "",
}: {
  attivo: Strato | null
  tutti?: boolean
  etichette?: boolean
  className?: string
}) {
  const { t } = useLingua()
  const corrente = attivo ? ordineStrati.indexOf(attivo) : -1
  const stato = (id: Strato): Stato => {
    if (tutti) return "acceso"
    const i = ordineStrati.indexOf(id)
    if (i === corrente) return "acceso"
    return i < corrente ? "visto" : "spento"
  }

  return (
    <div aria-hidden className={`flex items-stretch gap-6 ${className}`}>
      <div className="relative h-full shrink-0">
        <Image src="/apertura/strati.webp" alt="" width={624} height={1141} sizes="20rem" className="h-full w-auto select-none" draggable={false} />
        {fasce.map((f) => (
          <span
            key={f.id}
            className={`absolute inset-x-0 bg-carta transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${VELO[stato(f.id)]}`}
            style={{ top: `${f.da}%`, height: `${f.a - f.da}%` }}
          />
        ))}
      </div>
      {etichette ? (
        <ol className="relative w-28 shrink-0">
          {fasce.map((f) => {
            const acceso = stato(f.id) === "acceso"
            return (
              <li
                key={f.id}
                className={`absolute left-0 flex -translate-y-1/2 items-center gap-2.5 whitespace-nowrap text-sm transition-colors duration-500 ${
                  acceso ? "text-inchiostro" : "text-grigio"
                }`}
                style={{ top: `${(f.da + f.a) / 2}%` }}
              >
                <span className={`h-px transition-all duration-500 ${acceso ? "w-6 bg-inchiostro" : "w-3 bg-riga-forte"}`} />
                {t(f.nome.it, f.nome.en)}
              </li>
            )
          })}
        </ol>
      ) : null}
    </div>
  )
}
