import { stack } from "@/lib/portfolio-data"
import { TechIcon } from "@/components/tech-icon"

const items = stack.flatMap((group) => group.items)

/**
 * Nastro scorrevole con i loghi dello stack.
 * La lista è duplicata: quando la prima metà è uscita di scena, la seconda è
 * già in posizione e l'animazione riparte senza salto visibile.
 */
export function TechMarquee() {
  return (
    <div className="marquee-mask relative overflow-hidden py-10">
      <div className="marquee-track flex w-max gap-16">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-16" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-3 text-xl font-medium text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                <TechIcon name={item} className="size-7 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
