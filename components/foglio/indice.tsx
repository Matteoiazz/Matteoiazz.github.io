"use client"

import Image from "next/image"
import Link from "next/link"
import { ViewTransition, useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react"
import { projects } from "@/lib/portfolio-data"
import { progettiEn } from "@/lib/inglese"
import { useLingua } from "@/components/foglio/lingua"
import { Palco } from "./schermo"
import { nomePassaggio, segnaOrigine } from "./anteprima"

// Misure dell'anteprima che segue il puntatore: larga per le finestre,
// stretta e alta per i telefoni.
const MISURE = { finestra: { w: 384, h: 256 }, telefono: { w: 220, h: 300 } }

/**
 * Tutti i progetti in un indice a righe. Con il mouse, il titolo sotto il
 * puntatore si allarga, gli altri passano al grigio e la copertina segue il
 * puntatore; aprendo il progetto, quella stessa copertina diventa la testata
 * della sua pagina. Sul telefono ogni riga ha la sua miniatura.
 */
export function Indice() {
  const { t } = useLingua()
  const [attivo, setAttivo] = useState<string | null>(null)
  const [fine, setFine] = useState(false)
  const misura = useRef(MISURE.finestra)

  useEffect(() => {
    const mq = matchMedia("(hover: hover) and (pointer: fine)")
    const aggiorna = () => setFine(mq.matches)
    aggiorna()
    mq.addEventListener("change", aggiorna)
    return () => mq.removeEventListener("change", aggiorna)
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.7 })
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.7 })
  const velocita = useVelocity(sx)
  const inclina = useSpring(useTransform(velocita, [-2400, 2400], [-7, 7], { clamp: true }), { stiffness: 180, damping: 22 })

  // L'anteprima sta a destra del puntatore e passa a sinistra vicino al bordo.
  const segui = (cx: number, cy: number, salta = false) => {
    const { w, h } = misura.current
    const tx = cx + 28 + w > innerWidth - 16 ? cx - 28 - w : cx + 28
    const ty = Math.min(Math.max(cy - h / 2, 16), innerHeight - h - 16)
    if (salta) {
      x.jump(tx)
      y.jump(ty)
    } else {
      x.set(tx)
      y.set(ty)
    }
  }

  const corrente = fine ? projects.find((p) => p.slug === attivo) : undefined

  return (
    <section id="progetti" aria-labelledby="progetti-titolo" className="pt-28 md:pt-40">
      <div className="contenitore">
        <div className="grid grid-cols-4 items-end gap-x-[var(--passo)] gap-y-5 md:grid-cols-12">
          <h2 id="progetti-titolo" className="titolo-2 col-span-4 md:col-span-8">
            {t("Progetti.", "Work.")}{" "}
            <span className="seconda">{t("Sette, dall'università e da solo.", "Seven, from university and on my own.")}</span>
          </h2>
          <p className="col-span-4 max-w-[40ch] text-grigio md:col-span-4 md:col-start-9 md:pb-1">
            {t("Tre hanno un caso di studio con il codice vero.", "Three come with a case study and real code.")}{" "}
            <span className="hidden pointer-fine:inline">{t("Passa sopra a un titolo per vedere l'app.", "Hover a title to see the app.")}</span>
            <span className="pointer-fine:hidden">{t("Tocca una riga per aprirla.", "Tap a row to open it.")}</span>
          </p>
        </div>

        <ol
          className="indice mt-12 border-t border-riga md:mt-16"
          onPointerMove={fine ? (e) => segui(e.clientX, e.clientY) : undefined}
          onPointerLeave={fine ? () => setAttivo(null) : undefined}
        >
          {projects.map((p) => {
            const en = progettiEn[p.slug]
            return (
              <li key={p.slug} className="border-b border-riga">
                <Link
                  href={`/progetti/${p.slug}/`}
                  className="riga-progetto group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 py-5 md:grid-cols-12 md:gap-x-[var(--passo)] md:py-7"
                  onPointerEnter={(e) => {
                    if (!fine) return
                    misura.current = p.cover.frame === "phone" ? MISURE.telefono : MISURE.finestra
                    if (!attivo) segui(e.clientX, e.clientY, true)
                    setAttivo(p.slug)
                  }}
                  onClick={(e) =>
                    segnaOrigine(e.detail === 0 ? "nessuna" : fine ? (attivo === p.slug ? "anteprima" : "nessuna") : "miniatura")
                  }
                >
                  <span className="min-w-0 md:col-span-4">
                    <span className="titolo-largo block whitespace-nowrap text-[clamp(1.3rem,0.9rem+0.9vw,1.65rem)] font-medium leading-tight tracking-[-0.022em]">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-sm text-grigio md:hidden">
                      {t(p.kind, en.kind)} · <span className="cifre">{p.year}</span>
                    </span>
                  </span>
                  <span className="hidden text-grigio md:col-span-3 md:block">{t(p.kind, en.kind)}</span>
                  <span className="hidden text-grigio md:col-span-2 md:block">{t(p.squadra, en.squadra)}</span>
                  <span className="cifre hidden text-grigio md:col-span-1 md:block">{p.year}</span>
                  <span className="flex items-center justify-end gap-3 md:col-span-2">
                    {p.casoStudio ? (
                      <span className="hidden rounded-full px-2.5 py-1 text-xs font-medium shadow-[inset_0_0_0_1px_var(--riga-forte)] lg:inline">
                        {t("Caso di studio", "Case study")}
                      </span>
                    ) : null}
                    <ArrowUpRight
                      aria-hidden
                      className="hidden size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:block"
                    />
                    {/* Miniatura sul telefono: lì non c'è il passaggio del mouse. */}
                    <ViewTransition name={nomePassaggio(p.slug, "miniatura")} share="passaggio" default="none">
                      <span className="monocromo relative block h-12 w-[4.5rem] overflow-hidden rounded-md bg-palco md:hidden">
                        <Image src={p.cover.src} alt="" fill sizes="72px" className="object-cover object-top" />
                      </span>
                    </ViewTransition>
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>

      {fine ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40"
          style={{ x: sx, y: sy, rotate: inclina }}
        >
          <AnimatePresence>
            {corrente ? (
              <motion.div
                key={corrente.slug}
                initial={{ opacity: 0, scale: 0.86, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0"
              >
                <Copertina slug={corrente.slug} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </section>
  )
}

/** La copertina dentro l'anteprima: è lei che, al clic, diventa la testata della pagina del progetto. */
function Copertina({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug)!
  const m = p.cover.frame === "phone" ? MISURE.telefono : MISURE.finestra
  return (
    <ViewTransition name={nomePassaggio(slug, "anteprima")} share="passaggio" default="none">
      <div
        className="relative overflow-hidden rounded-[14px] bg-palco shadow-[0_2px_6px_rgb(0_0_0/0.06),0_30px_60px_-24px_rgb(0_0_0/0.35)]"
        style={{ width: m.w, height: m.h }}
      >
        <Palco shots={[p.cover, ...p.gallery]} titolo={p.title} margine="8%" sizes="384px" />
      </div>
    </ViewTransition>
  )
}
