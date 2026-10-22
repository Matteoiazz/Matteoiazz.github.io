import type { CSSProperties } from "react"
import { profile, projects, stack } from "@/lib/portfolio-data"
import { ParolaCromata } from "@/components/parola-cromata"
import { Competenze } from "@/components/competenze"

// Manifesto in due toni: la prima parte accesa, il resto più tenue. Parte da
// due progetti veri, non da un aggettivo.
const manifesto = [
  { testo: "Mi piace prendere un problema vero", chiaro: true },
  {
    testo:
      "come gli esami di un docente o le acquisizioni di un laboratorio di fisica, e trasformarlo in uno strumento che qualcuno usa davvero.",
    chiaro: false,
  },
]
const parole = manifesto.flatMap((parte, pi) =>
  parte.testo.split(" ").map((p, i, tutte) => ({
    p: pi === 0 && i === tutte.length - 1 ? `${p},` : p,
    chiaro: parte.chiaro,
  })),
)

// Contate dagli stack, non scritte a mano: aggiungendo un progetto si aggiornano.
const tecnologie = new Set([...stack.flatMap((g) => g.items), ...projects.flatMap((p) => p.stack)]).size

const numeri = [
  { v: String(projects.length).padStart(2, "0"), k: "progetti" },
  { v: String(tecnologie), k: "tecnologie e strumenti" },
  { v: "97/100", k: "al diploma" },
  { v: "B2", k: "inglese" },
]
// Due per riga sul telefono, quattro da md: i separatori cambiano di posto.
const bordi = [
  "border-r border-b md:border-b-0",
  "pl-5 border-b md:border-b-0 md:border-r md:pl-6",
  "border-r md:pl-6",
  "pl-5 md:pl-6",
]

/**
 * Profilo dopo i progetti: chi ha visto il lavoro arriva qui a conoscere chi
 * l'ha fatto. Parola cromata, manifesto che si accende scorrendo, i numeri,
 * la presentazione col curriculum e l'indice delle competenze.
 */
export function About() {
  return (
    <section id="about" className="contenitore relative z-10 pb-16 pt-20 sm:pb-20 sm:pt-24">
      <header className="story-in">
        <ParolaCromata testo="Profilo" />
        <h2 className="title-fade relative -mt-[7%] text-balance text-[clamp(2.2rem,5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Chi sono
        </h2>
      </header>

      {/* Ogni parola si accende quando il paragrafo sale nello schermo
          (animation-timeline, in globals.css): senza supporto resta accesa. */}
      <p
        className="manifesto mt-14 max-w-5xl text-balance text-[clamp(1.7rem,3.6vw,3.25rem)] font-semibold leading-[1.14] tracking-[-0.03em] sm:mt-20"
        style={{ "--n": parole.length } as CSSProperties}
      >
        {parole.map((w, i) => (
          <span
            key={i}
            className={`parola-scorre ${w.chiaro ? "text-foreground" : "text-muted-foreground"}`}
            style={{ "--i": i } as CSSProperties}
          >
            {w.p}{" "}
          </span>
        ))}
      </p>

      <dl className="mt-16 grid grid-cols-2 border-y border-[var(--hairline)] sm:mt-20 md:grid-cols-4">
        {numeri.map((n, i) => (
          <div
            key={n.k}
            className={`story-in flex flex-col border-[var(--hairline)] py-7 pr-4 ${bordi[i]}`}
          >
            {/* Etichetta prima nel codice (dt viene prima di dd), sotto il numero a schermo. */}
            <dt className="eyebrow order-2 mt-3 uppercase">{n.k}</dt>
            <dd className="title-fade order-1 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.04em]">
              {n.v}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-16">
        <p className="story-in text-pretty text-lg leading-relaxed text-muted-foreground">{profile.intro}</p>
        <div className="story-in md:pt-1">
          <p className="eyebrow uppercase">Curriculum</p>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Lo stesso percorso in una pagina sola, da leggere qui o da scaricare in PDF.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/cv/"
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Curriculum
            </a>
            <a
              href="/Matteo_Iazzolino_CV.pdf"
              download="Matteo_Iazzolino_CV.pdf"
              className="glass glass-dyn island rounded-lg px-4 py-2 text-sm font-medium"
            >
              Scarica PDF ↓
            </a>
          </div>
        </div>
      </div>

      <Competenze />
    </section>
  )
}
