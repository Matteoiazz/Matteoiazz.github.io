import { projects } from "@/lib/portfolio-data"
import { ProjectGrid } from "@/components/project-grid"

/**
 * Progetti in un mosaico a tutta larghezza invece che in colonna: chi apre la
 * sezione vede subito tutti i lavori insieme, ognuno nella sua card, e sceglie
 * cosa approfondire. L'intestazione sta sopra e non a lato, per lasciare alla
 * griglia l'intera larghezza del contenuto.
 */
export function Projects() {
  return (
    <section id="projects" className="contenitore relative z-10 py-24 sm:py-32">
      <div className="story-in flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow uppercase">Progetti</p>
          <h2 className="title-fade mt-4 text-balance text-[clamp(2.2rem,5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            Cosa ho costruito
          </h2>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Un&apos;app Android a microservizi, web app, un sito con area soci e app desktop, ognuno
            con lo stack adatto al problema. Apri un progetto per schermate e dettagli.
          </p>
        </div>
        <p className="eyebrow shrink-0">{String(projects.length).padStart(2, "0")} progetti</p>
      </div>

      <ProjectGrid projects={projects} />
    </section>
  )
}
