"use client"

import { projects } from "@/lib/portfolio-data"
import { Reveal, Stagger, StaggerItem } from "@/components/reveal"
import { TechIcon } from "@/components/tech-icon"
import { DeviceMockup } from "@/components/device-mockup"
import { SpotlightCard } from "@/components/spotlight-card"

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-32 sm:py-44">
      <Reveal className="flex flex-col items-center text-center">
        <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-6 py-2.5 text-base">
          Portfolio
        </span>
        <h2 className="mt-8 text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-muted-foreground">I miei ultimi </span>
          <span className="text-foreground">progetti</span>
        </h2>
      </Reveal>

      <Stagger className="mt-20 grid gap-10 sm:grid-cols-2" stagger={0.1}>
        {projects.map((project) => (
          <StaggerItem key={project.title}>
            <SpotlightCard className="h-full rounded-3xl">
            <article className="group flex h-full flex-col">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Apri il progetto ${project.title}`}
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:border-foreground/25 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-black/40"
              >
                {/* Bagliore soft sul mockup, stile Proxio */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(circle_at_center,color-mix(in_oklch,var(--foreground)_10%,transparent),transparent_60%)] group-hover:opacity-100"
                />
                {/* Stato base: i loghi dello stack. Se c'è uno screenshot, sfumano
                    per lasciare spazio al mockup del telefono. */}
                <div
                  className={`flex flex-wrap items-center justify-center gap-6 px-10 text-muted-foreground/70 transition-all duration-500 group-hover:text-muted-foreground ${
                    project.image ? "group-hover:scale-95 group-hover:opacity-0" : ""
                  }`}
                >
                  {project.stack.slice(0, 5).map((tech) => (
                    <TechIcon key={tech} name={tech} className="size-11" />
                  ))}
                </div>

                {project.image ? (
                  // Mockup: appare solo all'hover, con la cornice adatta al tipo di progetto.
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <div className="flex h-full w-full translate-y-4 items-center justify-center transition-transform duration-500 ease-out group-hover:translate-y-0">
                      <DeviceMockup
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        frame={project.frame ?? "browser"}
                      />
                    </div>
                  </div>
                ) : null}
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-hover:text-foreground">
                  <ArrowIcon />
                </span>
              </a>

              <div className="mt-7 flex items-baseline gap-4">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {project.title}
                </h3>
                <span className="font-mono text-base text-muted-foreground">{project.year}</span>
              </div>
              <p className="mt-3 flex-1 text-pretty text-lg leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 font-mono text-sm text-secondary-foreground"
                  >
                    <TechIcon name={tech} className="size-4 shrink-0" />
                    {tech}
                  </span>
                ))}
              </div>
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
                >
                  Demo live <ArrowIcon />
                </a>
              ) : null}
            </article>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
