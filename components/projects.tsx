import { projects } from "@/lib/portfolio-data"
import { ProjectGrid } from "@/components/project-grid"
import { ParolaCromata } from "@/components/parola-cromata"

/**
 * Progetti subito dopo la prima schermata: sono la prima cosa che chi valuta
 * il portfolio vuole vedere. Mosaico a tutta larghezza, con la parola cromata
 * gigante sopra e il titolo che ci si appoggia sopra il bordo inferiore.
 */
export function Projects() {
  return (
    <section id="projects" className="contenitore relative z-10 pb-16 pt-24 sm:pb-20 sm:pt-32">
      <header className="story-in">
        <ParolaCromata testo="Progetti" />
        {/* Margine in percentuale: si calcola sulla larghezza, come l'altezza
            della parola, quindi il titolo copre sempre la stessa fetta. */}
        <div className="relative -mt-[7%] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="title-fade text-balance text-[clamp(2.2rem,5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Cosa ho costruito
            </h2>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Un&apos;app Android a microservizi, web app, un sito con area soci, app desktop e un
              progetto di ricerca per il Dipartimento di Fisica, ognuno con lo stack adatto al
              problema. Apri un progetto per schermate e dettagli.
            </p>
          </div>
          <p className="eyebrow shrink-0">{String(projects.length).padStart(2, "0")} progetti</p>
        </div>
      </header>

      <ProjectGrid projects={projects} />
    </section>
  )
}
