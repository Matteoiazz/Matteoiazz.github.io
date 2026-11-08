"use client"

import { useEffect, useRef } from "react"
import { ArrowDown, ArrowUp, ArrowUpRight, Copy } from "lucide-react"
import { contact, profile } from "@/lib/portfolio-data"
import { useLingua } from "@/components/foglio/lingua"
import { avvisa, copia, useOraCosenza, useScorciatoia } from "@/components/foglio/comuni"

/**
 * La chiusura in nero: l'invito, l'email da scrivere o copiare, i link, l'ora
 * di Cosenza e, in fondo, il nome a tutta larghezza.
 */
export function Chiusura() {
  const { t } = useLingua()
  const ora = useOraCosenza()
  const scorciatoia = useScorciatoia()
  const copiaEmail = async () => avvisa((await copia(contact.email)) ? t("Email copiata", "Email copied") : contact.email)

  const collegamenti = [
    { nome: "LinkedIn", dettaglio: "in/matteoiazzolino", href: contact.linkedin, scarica: false },
    { nome: "GitHub", dettaglio: "Matteoiazz", href: contact.github, scarica: false },
    { nome: t("Curriculum", "Résumé"), dettaglio: "PDF", href: "/Matteo_Iazzolino_CV.pdf", scarica: true },
  ]

  return (
    <footer id="contatti" aria-labelledby="contatti-titolo" className="notte mt-28 overflow-hidden md:mt-40">
      <div className="contenitore pt-24 md:pt-32">
        <div className="grid grid-cols-4 gap-x-[var(--passo)] gap-y-16 md:grid-cols-12">
          <div className="col-span-4 md:col-span-7">
            <h2 id="contatti-titolo" className="titolo-1 text-balance">
              {t("Parliamone.", "Let's talk.")}{" "}
              <span className="seconda">{t("Per uno stage o un primo lavoro da sviluppatore.", "About an internship or a first developer job.")}</span>
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4 md:mt-12">
              <a
                href={`mailto:${contact.email}`}
                className="break-all text-[clamp(1.3rem,0.9rem+1.7vw,2.25rem)] font-medium tracking-[-0.02em] underline decoration-1 underline-offset-[0.2em] transition-[text-decoration-color] hover:decoration-transparent"
              >
                {contact.email}
              </a>
              <button type="button" onClick={copiaEmail} className="pillola pillola-filo" data-cursore={t("Copia", "Copy")}>
                <Copy aria-hidden />
                {t("Copia", "Copy")}
              </button>
            </div>
          </div>

          <ul className="col-span-4 self-end border-t border-riga md:col-span-4 md:col-start-9">
            {collegamenti.map((l) => (
              <li key={l.nome} className="border-b border-riga">
                <a
                  href={l.href}
                  {...(l.scarica ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="text-[1.15rem] font-medium tracking-[-0.01em]">
                    <span className="traccia">{l.nome}</span>
                  </span>
                  <span className="flex items-center gap-3 text-grigio">
                    {l.dettaglio}
                    {l.scarica ? (
                      <ArrowDown aria-hidden className="size-4 text-inchiostro transition-transform duration-500 group-hover:translate-y-0.5" />
                    ) : (
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 text-inchiostro transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-sm text-grigio md:mt-28">
          <span>
            {t("A Cosenza sono le", "In Cosenza it's")} <span className="cifre text-inchiostro">{ora || "--:--:--"}</span>
          </span>
          <span className="hidden pointer-fine:inline">
            {t("Premi", "Press")} {scorciatoia} {t("per il menu", "for the menu")}
          </span>
        </p>
      </div>

      <NomeVivo />

      <div className="contenitore flex flex-wrap items-center justify-between gap-4 border-t border-riga py-6 text-sm text-grigio">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <a href="#" className="group flex items-center gap-2 transition-colors hover:text-inchiostro">
          {t("Torna su", "Back to top")}
          <ArrowUp aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  )
}

/**
 * Il nome a tutta larghezza, in Mona Sans con l'asse della larghezza: le
 * lettere vicine al puntatore si allargano, quelle lontane si stringono.
 * Prende la misura del contenitore e calcola il corpo che lo riempie.
 */
function NomeVivo() {
  const riga = useRef<HTMLParagraphElement>(null)
  const nome = profile.name.toUpperCase()

  useEffect(() => {
    const el = riga.current
    if (!el) return
    const lettere = [...el.querySelectorAll<HTMLSpanElement>("[data-lettera]")]

    // Corpo che fa combaciare il nome con la larghezza disponibile.
    const adatta = () => {
      // Le lettere tornano a larghezza 100 per la misura, poi il corpo si scala in proporzione.
      lettere.forEach((l) => (l.style.fontVariationSettings = "'wdth' 100"))
      const corpo = parseFloat(getComputedStyle(el).fontSize)
      const larghezza = el.parentElement!.clientWidth - parseFloat(getComputedStyle(el.parentElement!).paddingLeft) * 2
      el.style.fontSize = `${(corpo * larghezza) / el.scrollWidth}px`
      centri = lettere.map((l) => {
        const r = l.getBoundingClientRect()
        return r.left + r.width / 2
      })
    }
    let centri: number[] = []
    adatta()
    const osserva = new ResizeObserver(adatta)
    osserva.observe(el.parentElement!)
    document.fonts?.ready.then(adatta)

    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return () => osserva.disconnect()
    }

    const valori = lettere.map(() => 100)
    let px = -1
    let frame = 0
    const passo = () => {
      frame = 0
      let ancora = false
      const raggio = innerWidth * 0.2
      lettere.forEach((l, i) => {
        const vicino = px < 0 ? 0 : Math.max(0, 1 - Math.abs(px - centri[i]) / raggio)
        const meta = px < 0 ? 100 : 82 + 43 * vicino
        valori[i] += (meta - valori[i]) * 0.16
        if (Math.abs(meta - valori[i]) > 0.2) ancora = true
        l.style.fontVariationSettings = `'wdth' ${valori[i].toFixed(1)}`
      })
      if (ancora) frame = requestAnimationFrame(passo)
    }
    const muovi = (e: PointerEvent) => {
      px = e.clientX
      if (!frame) frame = requestAnimationFrame(passo)
    }
    const esci = () => {
      px = -1
      if (!frame) frame = requestAnimationFrame(passo)
    }
    const zona = el.parentElement!
    zona.addEventListener("pointermove", muovi)
    zona.addEventListener("pointerleave", esci)
    return () => {
      osserva.disconnect()
      zona.removeEventListener("pointermove", muovi)
      zona.removeEventListener("pointerleave", esci)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="contenitore select-none pb-6 pt-10 md:pb-10 md:pt-16" aria-hidden>
      <p
        ref={riga}
        className="w-max whitespace-nowrap text-[11vw] font-semibold uppercase leading-[0.8] tracking-[-0.02em]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {[...nome].map((c, i) =>
          c === " " ? (
            <span key={i}>{" "}</span>
          ) : (
            <span key={i} data-lettera className="inline-block">
              {c}
            </span>
          ),
        )}
      </p>
    </div>
  )
}
