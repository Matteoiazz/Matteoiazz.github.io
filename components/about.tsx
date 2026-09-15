import { profile, stack } from "@/lib/portfolio-data"
import { TechIcon } from "@/components/tech-icon"
import { SectionShell } from "@/components/section-shell"

export function About() {
  return (
    <SectionShell id="about" label="Profilo" title="Chi sono" description={profile.intro}>
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

      {/* Solo informazioni che il resto della pagina non mostra già: prima
          questa griglia ripeteva ruolo, sede e numero di progetti dell'hero. */}
      <div className="glass-flat glass-edge story-in relative mt-5 grid grid-cols-1 overflow-hidden rounded-xl sm:grid-cols-3">
        {[
          { k: "Italiano", v: "Madrelingua" },
          { k: "Inglese", v: "B2" },
          { k: "Cerco", v: "Ruolo part-time" },
        ].map((row, i) => (
          <div
            key={row.k}
            className={[
              "p-5 border-[var(--hairline)]",
              i < 2 ? "border-b sm:border-b-0 sm:border-r" : "",
            ].join(" ")}
          >
            <p className="eyebrow uppercase">{row.k}</p>
            <p className="mt-2 text-sm font-medium">{row.v}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
