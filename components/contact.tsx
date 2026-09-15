import Image from "next/image"
import { contact, profile } from "@/lib/portfolio-data"

// Solo i profili con un indirizzo vero: un pulsante che non porta da nessuna
// parte fa sembrare il sito incompiuto. Compila i campi in portfolio-data.ts
// e ricompaiono da soli.
const socials = [
  { label: "GitHub", href: contact.github },
  { label: "LinkedIn", href: contact.linkedin },
  { label: "X", href: contact.x },
].filter((s) => s.href && s.href !== "#")

/**
 * Chiusura del racconto.
 *
 * La sezione è larga quanto lo schermo e il contenuto è incapsulato dentro:
 * gli sfondi possono così coprire tutta la larghezza senza lasciare cuciture
 * ai bordi del contenitore, e senza ricorrere a `w-screen` (che include la
 * barra di scorrimento e provoca scorrimento orizzontale).
 */
export function Contact() {
  return (
    // overflow-x-clip: il fiore scalato non deve allargare la pagina (su mobile
    // spostava fuori centro la nav). "clip" e non "hidden": non crea un
    // contenitore di scorrimento e lascia il fiore sporgere sopra la sezione.
    <section id="contact" className="relative overflow-x-clip">
      {/* Sfumatura che riporta il fondo al nero verso il basso */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in oklch, var(--background) 60%, transparent) 45%, var(--background) 88%)",
        }}
      />

      {/* Vignettatura dello sfondo sotto l'oggetto: porta la pagina allo stesso
          nero del fondo dipinto nel PNG, così il suo riquadro non si stacca. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-0 aspect-square w-[min(70vh,90%)] -translate-x-1/2 -translate-y-[24%] scale-[1.9]"
        style={{
          background:
            "radial-gradient(circle at center, rgb(0 0 0 / 0.92) 0%, rgb(0 0 0 / 0.85) 26%, rgb(0 0 0 / 0.5) 40%, rgb(0 0 0 / 0) 66%)",
        }}
      />

      {/* L'oggetto riemerge da dietro il riquadro */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-0 aspect-square w-[min(70vh,90%)] -translate-x-1/2 -translate-y-[24%]"
      >
        <Image
          src="/hero-chrome.png"
          alt=""
          fill
          sizes="(max-width: 1024px) 90vw, 700px"
          // Stesso file dell'hero, già caricato con priorità: "eager" non costa
          // nulla. Da lazy, Next (che indicizza le immagini per src) lo
          // scambiava per l'immagine LCP e segnalava un warning.
          loading="eager"
          className="rotate-[24deg] object-contain opacity-40 sm:opacity-55"
          style={{
            maskImage: "radial-gradient(circle at center, #000 46%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(circle at center, #000 46%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10 sm:pt-36">
        <div className="glass-flat glass-edge story-in relative overflow-hidden rounded-2xl px-6 py-20 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-64"
            style={{
              background:
                "radial-gradient(50% 100% at 50% 0%, color-mix(in oklch, var(--foreground) 14%, transparent), transparent 70%)",
            }}
          />

          <div className="relative">
            <p className="eyebrow uppercase">Contatti</p>
            <h2 className="title-fade mx-auto mt-5 max-w-xl text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              Costruiamo qualcosa insieme
            </h2>
            <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Sono aperto a nuove opportunità e collaborazioni. Il modo più rapido per
              raggiungermi è via email.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                {contact.email}
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-dyn island rounded-lg px-5 py-2.5 text-sm font-medium"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-10 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="eyebrow">{profile.location} · Next.js</span>
        </footer>
      </div>
    </section>
  )
}
