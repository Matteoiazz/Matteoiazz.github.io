import { projects } from "@/lib/portfolio-data"
import { TechIcon } from "@/components/tech-icon"
import { DeviceMockup } from "@/components/device-mockup"
import { SectionShell } from "@/components/section-shell"

/**
 * Progetti in colonna singola: una card alla volta, larga, con lo screenshot
 * grande. Scorrendo si presentano in sequenza invece di apparire tutti insieme
 * in griglia — è il ritmo che rende la lettura un racconto.
 *
 * Componente server: le animazioni sono in CSS, non serve JavaScript.
 */
export function Projects() {
  return (
    <SectionShell
      id="projects"
      label="Progetti"
      title="Cosa ho costruito"
      description="Dal backend a microservizi all'app mobile, con lo stack scelto di volta in volta."
    >
      <div className="flex flex-col gap-6">
        {projects.map((project, i) => {
          const destinazione = project.demo ?? (project.repo !== "#" ? project.repo : null)
          const Contenitore = destinazione ? "a" : "div"
          return (
          <Contenitore
            key={project.title}
            {...(destinazione
              ? { href: destinazione, target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={`glass-flat glass-edge story group relative flex flex-col overflow-hidden rounded-2xl ${
              destinazione ? "surface-hover hover:-translate-y-0.5" : ""
            }`}
          >
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-[var(--hairline)] bg-background/50 p-7">
              {project.image ? (
                // Cornice coerente col tipo di progetto: telefono per le app
                // mobile, finestra browser per le web app.
                <div className="flex h-full w-full items-center justify-center transition-transform duration-700 group-hover:scale-[1.02]">
                  <DeviceMockup
                    src={project.image}
                    alt={project.imageAlt ?? project.title}
                    frame={project.frame ?? "browser"}
                  />
                </div>
              ) : (
                <div className="flex h-full items-center justify-center gap-6 text-muted-foreground/50">
                  {project.stack.slice(0, 4).map((tech) => (
                    <TechIcon key={tech} name={tech} className="size-8" />
                  ))}
                </div>
              )}

              <span className="eyebrow absolute left-5 top-4 rounded-full bg-background/70 px-2.5 py-1">
                0{i + 1}
              </span>
            </div>

            <div className="flex flex-col p-7">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
                <span className="eyebrow">{project.year}</span>
              </div>

              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-[var(--hairline)] pt-5 text-muted-foreground/70 transition-colors duration-300 group-hover:text-muted-foreground">
                {project.stack.slice(0, 6).map((tech) => (
                  <TechIcon key={tech} name={tech} className="size-4" />
                ))}
                {destinazione ? (
                  <span
                    aria-hidden
                    className="ml-auto text-sm transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                ) : (
                  <span className="ml-auto text-xs text-muted-foreground/60">Repo privato</span>
                )}
              </div>
            </div>
          </Contenitore>
          )
        })}
      </div>
    </SectionShell>
  )
}
