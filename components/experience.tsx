import { experiences } from "@/lib/portfolio-data"
import { SectionShell } from "@/components/section-shell"

/**
 * Percorso come elenco editoriale, senza card: date in colonna, titoli
 * grandi, righe sottili a separare. Le altre sezioni sono fatte di
 * superfici, questa di testo, e il cambio di forma dà ritmo alla pagina.
 * L'intestazione a lato resta ferma mentre l'elenco scorre.
 */
export function Experience() {
  return (
    <SectionShell
      id="experience"
      label="Percorso"
      parola="Percorso"
      title="Formazione ed esperienza"
      description="La scuola, la triennale che sto chiudendo con la tesi, la magistrale in AI iniziata a ottobre e l'anno di Servizio Civile."
    >
      <ol className="border-t border-[var(--hairline)]">
        {experiences.map((exp) => (
          <li
            key={`${exp.company}-${exp.period}`}
            className="story group grid gap-3 border-b border-[var(--hairline)] py-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8 sm:py-10 lg:grid-cols-[12rem_minmax(0,1fr)]"
          >
            <div className="flex items-baseline gap-3 sm:block">
              <p className="eyebrow text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                {exp.period}
              </p>
              <p className="eyebrow uppercase text-[0.65rem] sm:mt-2">{exp.tipo}</p>
            </div>
            <div>
              <h3 className="text-balance text-xl font-medium leading-snug tracking-[-0.02em] sm:text-2xl">
                {exp.role}
              </h3>
              <p className="mt-1.5 text-sm text-foreground/60">{exp.company}</p>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
