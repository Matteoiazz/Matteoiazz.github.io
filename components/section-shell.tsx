import type { ReactNode } from "react"

/**
 * Capitolo del racconto.
 *
 * L'intestazione resta agganciata a lato mentre i contenuti le scorrono
 * accanto: chi legge sa sempre in che capitolo si trova, e il passaggio da
 * una sezione all'altra diventa un cambio di scena invece di uno stacco.
 *
 * Il filo verticale si riempie man mano che il capitolo attraversa lo schermo.
 */
export function SectionShell({
  id,
  label,
  title,
  description,
  children,
}: {
  id: string
  label: string
  title: ReactNode
  description?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <div className="grid gap-10 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16">
        <div className="story-in md:sticky md:top-24 md:self-start">
          <p className="eyebrow uppercase">{label}</p>
          <h2 className="title-fade mt-4 text-balance text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}

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
