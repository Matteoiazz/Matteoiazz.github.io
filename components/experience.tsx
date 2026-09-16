import { experiences } from "@/lib/portfolio-data"
import { SectionShell } from "@/components/section-shell"

export function Experience() {
  return (
    <SectionShell
      id="experience"
      label="Percorso"
      title="Formazione ed esperienza"
      description="Tre tappe: la scuola, l'università che sto finendo e il lavoro in sala che porto avanti in parallelo."
    >
      <ol className="relative space-y-5">
        {/* Binario del racconto: si riempie mentre il capitolo scorre. */}
        <span
          aria-hidden
          className="story-thread absolute left-[5px] top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-foreground/40 via-foreground/20 to-transparent sm:block"
        />

        {experiences.map((exp) => (
          <li key={`${exp.company}-${exp.period}`} className="story relative sm:pl-10">
            <span
              aria-hidden
              className="absolute left-0 top-8 hidden size-[11px] rounded-full border border-foreground/40 bg-background sm:block"
            />
            {/* Schede come nel resto del sito: prima erano tre blocchi di testo
                appoggiati sul fondo, e la sezione sembrava incompiuta. */}
            <div className="glass-flat glass-edge surface-hover rounded-xl p-6">
              <p className="eyebrow">{exp.period}</p>
              <h3 className="mt-2 text-base font-medium tracking-tight">
                {exp.role}
                <span className="text-muted-foreground"> · {exp.company}</span>
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
