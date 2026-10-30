"use client"

import { useRef } from "react"
import { ArrowUp, ArrowUpRight, Copy } from "lucide-react"
import { contact } from "@/lib/portfolio-data"
import { Griglia } from "@/components/bn/griglia"
import { Nome } from "@/components/bn/nome"
import { Palette } from "@/components/bn/palette"
import { Wordmark } from "@/components/wordmark"
import { useLingua } from "@/components/bn/lingua"
import { apriComandi, avvisa, copia, useOraCosenza } from "@/components/bn/comuni"

/**
 * Chiusura. La parola gigante, l'email in grande che attira il cursore e si
 * copia con un clic, i link come righe che si invertono, e in fondo una
 * lastra nera da tabellone con il saluto, l'ora e il ritorno in cima.
 */
export function Contatti() {
  const { t } = useLingua()
  const ora = useOraCosenza()
  const magnete = useRef<HTMLButtonElement>(null)

  // Il pulsante si sposta verso il puntatore, poco: una calamita.
  const attira = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = magnete.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.18
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.3
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }
  const lascia = () => {
    if (magnete.current) magnete.current.style.transform = ""
  }

  const link = [
    { testo: "GitHub", href: contact.github, nota: "github.com/Matteoiazz" },
    { testo: "LinkedIn", href: contact.linkedin, nota: "in/matteoiazzolino" },
    { testo: t("Curriculum", "CV"), href: "/cv/", nota: t("in pagina o PDF", "page or PDF") },
  ]

  return (
    <>
      <section id="contatti" className="chiaro relative overflow-hidden py-24 md:py-32">
        <Griglia />
        <div className="contenitore relative z-10">
          <Nome as="h2" righe={[t("SCRIVIMI", "WRITE ME")]} massimo={0.24} cromo />

          <div className="mt-14 grid grid-cols-4 gap-x-[var(--passo)] gap-y-12 md:mt-20 md:grid-cols-12">
            <div className="col-span-4 md:col-span-7">
              <p className="max-w-[40ch] text-pretty text-lg text-tenue">
                {t(
                  "Cerco uno stage o un primo lavoro da sviluppatore. Il modo più rapido per raggiungermi è l'email: un clic e la copi.",
                  "I'm looking for an internship or a first developer job. Email is the quickest way to reach me: one click copies it.",
                )}
              </p>
              <button
                ref={magnete}
                type="button"
                data-cursore={t("Copia", "Copy")}
                onPointerMove={attira}
                onPointerLeave={lascia}
                onClick={async () => avvisa((await copia(contact.email)) ? t("Email copiata", "Email copied") : contact.email)}
                className="group mt-8 inline-flex max-w-full items-center gap-4 rounded-full bg-carta px-7 py-5 text-left text-inchiostro shadow-[0_20px_50px_-20px_rgb(255_255_255/0.25)] transition-transform duration-300 ease-out"
              >
                <span className="truncate text-[clamp(1.1rem,2.6vw,2.2rem)] font-semibold tracking-[-0.02em]">{contact.email}</span>
                <Copy aria-hidden className="size-5 shrink-0 opacity-70 transition-transform group-hover:scale-110" />
              </button>
              <p className="mt-4 text-sm">
                <a href={`mailto:${contact.email}`} className="underline">
                  {t("Oppure apri la tua app di posta", "Or open your mail app")}
                </a>
              </p>
            </div>

            <ul className="vetro-piatto col-span-4 self-end overflow-hidden rounded-[22px] md:col-span-4 md:col-start-9">
              {link.map((l) => (
                <li key={l.testo} className="border-b border-riga last:border-b-0">
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-carta hover:text-inchiostro"
                  >
                    <span className="text-2xl font-semibold tracking-[-0.02em]">{l.testo}</span>
                    <span className="flex items-center gap-3">
                      <span className="dato opacity-60">{l.nota}</span>
                      <ArrowUpRight aria-hidden className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="scuro relative overflow-hidden" data-no-stampa>
        <div className="contenitore py-14 md:py-20">
          <div className="text-[clamp(0.8rem,4.2vw,4.2rem)]">
            <Palette
              frasi={t(["Grazie della visita", "A presto", "Scrivimi quando vuoi"], ["Thanks for visiting", "Speak soon", "Write any time"])}
              intervallo={2800}
              classeCasella="rounded-[3px] bg-white/[0.08] text-testo shadow-[inset_0_1px_0_rgb(255_255_255/0.2)] after:bg-black/50"
            />
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-riga-forte pt-6 text-sm md:grid-cols-4">
            <p className="dato text-tenue" suppressHydrationWarning>
              Cosenza · {ora || "--:--:--"}
            </p>
            <p className="dato text-tenue">© {new Date().getFullYear()} Matteo Iazzolino</p>
            <button type="button" onClick={apriComandi} className="dato text-left text-tenue hover:text-testo">
              {t("Premi Ctrl+K per il menu", "Press Ctrl+K for the menu")}
            </button>
            <a href="#top" className="flex items-center gap-2 justify-self-start md:justify-self-end">
              {t("Torna su", "Back to top")}
              <ArrowUp aria-hidden className="size-4" />
            </a>
          </div>
        </div>
        {/* La firma cromata del primo sito chiude la pagina. */}
        <Wordmark />
      </footer>
    </>
  )
}
