import type { ReactNode } from "react"
import { ParolaCromata } from "@/components/parola-cromata"

/**
 * Capitolo del racconto.
 *
 * L'intestazione resta agganciata a lato mentre i contenuti le scorrono
 * accanto: chi legge sa sempre in che capitolo si trova, e il passaggio da
 * una sezione all'altra diventa un cambio di scena invece di uno stacco.
 *
 * Il filo verticale si riempie man mano che il capitolo attraversa lo schermo.
 *
 * Con `parola`, sopra il capitolo c'è la parola cromata a tutta larghezza e
 * l'etichetta piccola sparisce: la parola dice già dove si è.
 */
export function SectionShell({
  id,
  label,
  parola,
  title,
  description,
  etichetta,
  extra,
  children,
}: {
  id: string
  label: string
  parola?: string
  title: ReactNode
  description?: string
  /** Sostituisce la riga con l'etichetta, come nel Profilo dove c'è anche il ritratto. */
  etichetta?: ReactNode
  /** Contenuto in coda alla colonna dell'intestazione, che altrimenti resta vuota. */
  extra?: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`contenitore relative z-10 ${parola ? "pb-24 pt-16 sm:pb-32 sm:pt-20" : "py-24 sm:py-32"}`}
    >
      {parola ? <ParolaCromata testo={parola} className="story-in mb-12 md:mb-16" /> : null}
      <div className="grid gap-10 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,23rem)_minmax(0,1fr)] xl:gap-20">
        <div className="story-in md:sticky md:top-24 md:self-start">
          {etichetta ?? (parola ? null : <p className="eyebrow uppercase">{label}</p>)}
          <h2 className={`title-fade text-balance ${parola ? "" : "mt-4"} text-[clamp(1.9rem,3.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]`}>
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}

          {extra}

          <div
            aria-hidden
            className="story-thread mt-10 hidden h-28 w-px bg-gradient-to-b from-foreground/45 to-transparent md:block"
          />
        </div>

        <div>{children}</div>
      </div>
    </section>
  )
}
