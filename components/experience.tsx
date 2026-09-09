"use client"

import { experiences } from "@/lib/portfolio-data"
import { Reveal, Stagger, StaggerItem } from "@/components/reveal"

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-32 sm:py-44">
      <Reveal className="flex flex-col items-center text-center">
        <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-6 py-2.5 text-base">
          Esperienza
        </span>
        <h2 className="mt-8 text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-muted-foreground">Il mio </span>
          <span className="text-foreground">percorso</span>
        </h2>
      </Reveal>

      <Stagger className="mt-20 flex flex-col" stagger={0.12}>
        {experiences.map((exp) => (
          <StaggerItem key={`${exp.company}-${exp.period}`}>
            <div className="grid gap-3 border-t border-border py-12 sm:grid-cols-[220px_1fr] sm:gap-10">
              <p className="font-mono text-base text-muted-foreground">{exp.period}</p>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {exp.role} <span className="text-muted-foreground">· {exp.company}</span>
                </h3>
                <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
