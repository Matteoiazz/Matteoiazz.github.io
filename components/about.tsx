"use client"

import { profile, stack } from "@/lib/portfolio-data"
import { Reveal, Stagger, StaggerItem } from "@/components/reveal"
import { TechIcon } from "@/components/tech-icon"
import { SpotlightCard } from "@/components/spotlight-card"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-32 sm:py-44">
      <Reveal>
        <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-6 py-2.5 text-base">
          Chi sono
        </span>
      </Reveal>
      <div className="mt-12 grid gap-16 lg:grid-cols-[1.2fr_1fr]">
        <Reveal delay={0.05}>
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-foreground">Chi sono. </span>
            <span className="text-muted-foreground">{profile.tagline}</span>
          </h2>
          <p className="mt-8 text-pretty text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            {profile.intro}
          </p>
        </Reveal>

        <Stagger className="grid gap-5" stagger={0.08}>
          {stack.map((group) => (
            <StaggerItem key={group.group}>
              <SpotlightCard className="rounded-3xl" radius={260}>
              <div className="rounded-3xl border border-border bg-card p-7 transition-colors duration-500 hover:border-foreground/20">
                <p className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
                  {group.group}
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-base text-secondary-foreground"
                    >
                      <TechIcon name={item} className="size-5 shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
