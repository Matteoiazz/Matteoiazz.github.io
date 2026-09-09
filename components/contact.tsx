"use client"

import { contact, profile } from "@/lib/portfolio-data"
import { Reveal } from "@/components/reveal"

const socials = [
  { label: "GitHub", href: contact.github },
  { label: "LinkedIn", href: contact.linkedin },
  { label: "X", href: contact.x },
]

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-32 sm:py-44">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card px-6 py-28 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[110px]"
          />
          <div className="relative z-10">
            <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-6 py-2.5 text-base">
              Contatti
            </span>
            <h2 className="mx-auto mt-8 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-foreground">Costruiamo qualcosa </span>
              <span className="text-muted-foreground">insieme</span>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-xl text-muted-foreground sm:text-2xl">
              Sono aperto a nuove opportunità e collaborazioni. Il modo più rapido per raggiungermi è via email.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-12 inline-flex rounded-full bg-foreground px-10 py-5 text-lg font-medium text-background transition-transform hover:scale-105"
            >
              {contact.email}
            </a>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-background/60 px-7 py-3 text-base font-medium backdrop-blur transition-colors hover:bg-secondary"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs">Costruito con Next.js · {profile.location}</p>
      </footer>
    </section>
  )
}
