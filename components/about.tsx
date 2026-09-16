import { profile, stack } from "@/lib/portfolio-data"
import { TechIcon } from "@/components/tech-icon"
import { SectionShell } from "@/components/section-shell"

// Solo informazioni che il resto della pagina non mostra già: ruolo, sede e
// numero di progetti sono nella prima schermata.
const dati = [
  { k: "Italiano", v: "Madrelingua" },
  { k: "Inglese", v: "B2" },
  { k: "Cerco", v: "Ruolo part-time" },
]

export function About() {
  return (
    <SectionShell
      id="about"
      label="Profilo"
      title="Chi sono"
      description={profile.intro}
      // In coda all'intestazione invece che sotto le card dello stack: così la
      // colonna di sinistra non si ferma a metà lasciando un vuoto.
      extra={
        <dl className="mt-8 space-y-4 border-t border-[var(--hairline)] pt-6">
          {dati.map((riga) => (
            <div key={riga.k} className="flex items-baseline justify-between gap-4">
              <dt className="eyebrow uppercase">{riga.k}</dt>
              <dd className="text-sm font-medium">{riga.v}</dd>
            </div>
          ))}
        </dl>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {stack.map((group) => (
          <div
            key={group.group}
            className="glass-flat glass-edge surface-hover story-in relative rounded-xl p-6"
          >
            <p className="eyebrow uppercase">{group.group}</p>
            <ul className="mt-5 space-y-3.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  <TechIcon name={item} className="size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
