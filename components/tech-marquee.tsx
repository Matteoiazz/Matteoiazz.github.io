import { stack } from "@/lib/portfolio-data"
import { TechIcon } from "@/components/tech-icon"

// Una tecnologia può stare in più gruppi (Kotlin è sia linguaggio sia mobile):
// nel nastro va una volta sola, altrimenti si ripete e le chiavi collidono.
const items = [...new Set(stack.flatMap((group) => group.items))]

/**
 * Striscia dello stack, sobria: solo loghi in scala di grigi che scorrono.
 * overflow-hidden è obbligatorio — il nastro è largo migliaia di pixel e
 * senza clipping allargherebbe il documento.
 */
export function TechMarquee() {
  return (
    <div className="edge-fade relative overflow-hidden border-y border-[var(--hairline)] py-8">
      <div className="ticker-track flex w-max items-center gap-12">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-12" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-2.5 text-sm text-muted-foreground/50"
              >
                <TechIcon name={item} className="size-5 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
