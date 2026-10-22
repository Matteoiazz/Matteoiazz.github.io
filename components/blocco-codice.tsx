import type { Codice } from "@/lib/casi-studio"

// Dove comincia il commento in una riga: "//" e "#" dopo uno spazio, oppure
// tutta la riga se è un commento a blocchi. Basta per gli estratti dei casi di
// studio, che non hanno "//" o "#" dentro le stringhe.
function dividi(riga: string): [string, string] {
  const t = riga.trimStart()
  if (/^(\/\/|#|\/\*\*|\*\/|\*( |$))/.test(t)) return ["", riga]
  const m = riga.match(/\s(\/\/|#)\s/)
  if (m?.index !== undefined) return [riga.slice(0, m.index), riga.slice(m.index)]
  return [riga, ""]
}

/**
 * Estratto di codice nello stile delle finestre del sito: barra con il file,
 * testo monocromo e commenti attenuati. Niente evidenziazione a colori: il
 * sito è in bianco e nero, e i commenti (in italiano) sono la parte da leggere.
 */
export function BloccoCodice({ codice }: { codice: Codice }) {
  const righe = codice.righe.split("\n")
  return (
    <figure className="overflow-hidden rounded-xl border border-[var(--hairline-strong)] bg-[color-mix(in_oklch,var(--foreground)_3%,var(--background))] shadow-2xl shadow-black/40">
      <figcaption className="flex items-center gap-1.5 border-b border-[var(--hairline)] bg-neutral-900/70 px-4 py-2.5">
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="eyebrow ml-3 truncate text-[0.7rem]">{codice.file}</span>
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.78rem] leading-[1.7] sm:px-5 sm:text-[0.8rem]">
        <code>
          {righe.map((riga, i) => {
            const [codiceRiga, commento] = dividi(riga)
            return (
              <span key={i} className="block min-h-[1.7em]">
                <span className="text-foreground/85">{codiceRiga}</span>
                {commento ? <span className="text-muted-foreground/60">{commento}</span> : null}
              </span>
            )
          })}
        </code>
      </pre>
    </figure>
  )
}
