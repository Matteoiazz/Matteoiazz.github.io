"use client"

import { fasce, ordineStrati, type Strato } from "@/lib/storia"
import { useLingua } from "@/components/foglio/lingua"

type Stato = "acceso" | "visto" | "spento"

/** Lo stato di ogni strato dato il capitolo in lettura: lo stack si costruisce dal basso. */
function statoDi(attivo: Strato | null, tutti: boolean) {
  const corrente = attivo ? ordineStrati.indexOf(attivo) : -1
  return (id: Strato): Stato => {
    if (tutti) return "acceso"
    const i = ordineStrati.indexOf(id)
    if (i === corrente) return "acceso"
    return i < corrente ? "visto" : "spento"
  }
}

/**
 * Le quattro fasce del disegno, ognuna un pezzo a sé: quella del capitolo in
 * lettura è accesa, quelle già raccontate restano a metà, quelle da raccontare
 * sono appena accennate e sospese un po' più in alto. Quando tocca a loro, si
 * posano sulla pila.
 */
function Fasce({ stato }: { stato: (id: Strato) => Stato }) {
  return (
    <>
      {fasce.map((f) => {
        const alta = f.a - f.da
        return (
          <span
            key={f.id}
            data-stato={stato(f.id)}
            className="strato absolute inset-x-0 block"
            style={{
              top: `${f.da}%`,
              height: `${alta}%`,
              // La fascia mostra solo la sua parte del disegno intero.
              backgroundImage: "url(/apertura/strati.webp)",
              backgroundRepeat: "no-repeat",
              backgroundSize: `100% ${(100 / alta) * 100}%`,
              backgroundPosition: `0 ${(f.da / (100 - alta)) * 100}%`,
            }}
          />
        )
      })}
    </>
  )
}

/**
 * Il disegno degli strati intero, con i nomi accanto: sul desktop resta fermo
 * a destra del racconto e si costruisce un capitolo alla volta.
 */
export function StratiStoria({
  attivo,
  tutti = false,
  className = "",
}: {
  attivo: Strato | null
  tutti?: boolean
  className?: string
}) {
  const { t } = useLingua()
  const stato = statoDi(attivo, tutti)

  return (
    <div aria-hidden className={`flex items-stretch gap-5 ${className}`}>
      <div className="relative h-full shrink-0" style={{ aspectRatio: "624 / 1141" }}>
        <Fasce stato={stato} />
      </div>
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
    </div>
  )
}

// Sul telefono la pila è più alta del riquadro che la inquadra: si vede uno strato per volta.
const INGRANDIMENTO = 2.3

/**
 * Il disegno degli strati da vicino, per la barra fissa del telefono: un
 * riquadro basso che inquadra lo strato del capitolo in lettura, con i vicini
 * che sfumano ai bordi. A ogni capitolo la vista sale di uno strato, come una
 * cinepresa lungo la pila; prima del primo capitolo e alla fine si allontana e
 * mostra la pila intera.
 */
export function StratiDaVicino({ attivo, tutti = false, className = "" }: { attivo: Strato | null; tutti?: boolean; className?: string }) {
  const stato = statoDi(attivo, tutti)
  const fuoco = !tutti && attivo ? fasce.find((f) => f.id === attivo) : undefined
  // Il punto della pila da portare al centro del riquadro, in percentuale della sua altezza.
  const centro = fuoco ? (fuoco.da + fuoco.a) / 2 : 50
  return (
    <div aria-hidden className={`quadro-strati relative shrink-0 overflow-hidden ${className}`} style={{ aspectRatio: `${624 * INGRANDIMENTO} / 1141` }}>
      <div
        className="pila-strati absolute left-0 top-0 w-full"
        style={{
          height: `${INGRANDIMENTO * 100}%`,
          translate: `0 ${50 / INGRANDIMENTO - centro}%`,
          scale: fuoco ? 1 : 0.8 / INGRANDIMENTO,
        }}
      >
        <Fasce stato={stato} />
      </div>
    </div>
  )
}
