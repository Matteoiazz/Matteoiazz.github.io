"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { profile } from "@/lib/portfolio-data"
import { Griglia } from "@/components/bn/griglia"
import { Nome } from "@/components/bn/nome"
import { Palette } from "@/components/bn/palette"
import { useLingua } from "@/components/bn/lingua"
import { useOraCosenza } from "@/components/bn/comuni"

/**
 * Prima schermata: il nome gigante e, davanti, il fiore cromato ritagliato
 * (public/fiore-ritaglio.webp, alfa ricavata dall'immagine originale). Il
 * fiore copre una parte delle lettere come un soggetto davanti alla
 * testata di una rivista; ruota appena verso il puntatore e, scorrendo, si
 * avvicina mentre il nome si appanna sotto la barra.
 */
export function Apertura() {
  const { t } = useLingua()
  const ora = useOraCosenza()
  const sezione = useRef<HTMLElement>(null)
  const calmo = useReducedMotion()

  // Il fiore guarda il puntatore: piccole rotazioni e spostamenti, con una molla.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const molla = { stiffness: 60, damping: 18, mass: 0.8 }
  const sx = useSpring(px, molla)
  const sy = useSpring(py, molla)
  useEffect(() => {
    if (calmo || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const muovi = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("pointermove", muovi, { passive: true })
    return () => window.removeEventListener("pointermove", muovi)
  }, [calmo, px, py])

  // Lo stile del fiore è lo stesso sul server e nel browser (altrimenti
  // l'idratazione non combacia): con il movimento ridotto le trasformazioni
  // restano a zero invece di sparire.
  const fermo = useRef(false)
  fermo.current = Boolean(calmo)
  const { scrollYProgress } = useScroll({ target: sezione, offset: ["start start", "end start"] })
  const ruota = useTransform(() => (fermo.current ? 0 : sx.get() * 10 + scrollYProgress.get() * 38))
  const sposta = useTransform(() => (fermo.current ? "0vw" : `${sx.get() * 2.4}vw`))
  const alza = useTransform(() => (fermo.current ? "0vh" : `${sy.get() * 2 - scrollYProgress.get() * 8}vh`))
  const scala = useTransform(() => (fermo.current ? 1 : 1 + scrollYProgress.get() * 0.18))

  return (
    <section ref={sezione} id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      <Griglia />

      {/* Luce fredda dietro il fiore: il cromo ha bisogno di qualcosa da riflettere. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[54%] size-[110vw] -translate-x-1/2 -translate-y-1/2 md:left-[63%] md:size-[78vh]"
        style={{ background: "radial-gradient(closest-side, rgb(255 255 255 / 0.11), rgb(255 255 255 / 0.03) 55%, transparent)" }}
      />

      <div className="contenitore relative z-30 grid grid-cols-4 gap-x-[var(--passo)] gap-y-6 pt-28 md:grid-cols-12 md:pt-32">
        <div className="col-span-4 md:col-span-7">
          <Palette
            frasi={t(
              ["Junior Full-Stack Developer", "Java · Spring Boot · Angular", "React · Kotlin · Python", "Verso l'AI · Magistrale UniCal"],
              ["Junior Full-Stack Developer", "Java · Spring Boot · Angular", "React · Kotlin · Python", "Heading to AI · MSc UniCal"],
            )}
            className="text-[clamp(0.7rem,2.9vw,1.45rem)]"
          />
        </div>
        <p className="col-span-4 max-w-[36ch] text-pretty text-lg leading-snug text-tenue md:col-span-4 md:col-start-9 md:text-xl">
          <span className="text-testo">{t("Costruisco applicazioni intere,", "I build complete applications,")}</span>{" "}
          {t(
            "dal modello dati all'interfaccia. Studio Informatica all'Università della Calabria e, da ottobre, la magistrale in AI.",
            "from the data model to the interface. I study Computer Science at the University of Calabria and, since October, the master's in AI.",
          )}
        </p>
      </div>

      <div className="contenitore relative z-10 flex flex-1 items-end pb-6 pt-8 md:items-center md:py-8">
        {/* Il fiore è ancorato al nome, non allo schermo: copre sempre la stessa
            parte delle lettere. Sul telefono sta sopra il nome e i petali bassi
            coprono solo la cima di MATTEO, così il nome resta leggibile. */}
        <div className="appanna relative w-full">
          <Nome righe={["MATTEO", "IAZZOLINO"]} etichetta={profile.name} subito massimo={0.3} className="text-carta" />
          <motion.div
            aria-hidden
            style={{ rotate: ruota, x: sposta, y: alza, scale: scala }}
            className="pointer-events-none absolute bottom-[52%] left-1/2 z-20 w-[70vw] -translate-x-1/2 md:bottom-auto md:left-[63%] md:top-[56%] md:w-[min(38vw,68vh)] md:-translate-y-1/2"
          >
            <Image
              src="/fiore-ritaglio.webp"
              alt=""
              width={723}
              height={664}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 40vw, 70vw"
              className="h-auto w-full [filter:drop-shadow(0_40px_60px_rgb(0_0_0/0.75))_drop-shadow(0_6px_14px_rgb(0_0_0/0.6))]"
            />
          </motion.div>
        </div>
      </div>

      <div className="contenitore relative z-30 pb-6">
        {/* L'azione principale in basso a sinistra, sotto l'inizio del nome. */}
        <div className="grid grid-cols-4 items-end gap-x-[var(--passo)] gap-y-5 border-t border-riga pt-4 md:grid-cols-12">
          <div className="col-span-4 flex flex-wrap gap-3 md:col-span-6">
            <a
              href="#progetti"
              data-cursore={t("Vai", "Go")}
              className="group flex items-center gap-2 rounded-full bg-carta px-5 py-3 text-sm font-medium text-inchiostro"
            >
              {t("Vedi i progetti", "See the work")}
              <ArrowDown aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="/Matteo_Iazzolino_CV.pdf"
              download="Matteo_Iazzolino_CV.pdf"
              className="pillola-vetro rounded-full px-5 py-3 text-sm font-medium"
            >
              {t("Curriculum PDF", "CV (PDF)")}
            </a>
          </div>
          <p className="col-span-2 flex items-center gap-2 text-sm md:col-span-3">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-carta opacity-50 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-carta" />
            </span>
            {t("Aperto a nuove opportunità", "Open to new opportunities")}
          </p>
          <p className="dato col-span-2 text-right text-tenue md:col-span-3" suppressHydrationWarning>
            39°18′N 16°15′E
            <br />
            Cosenza · {ora || "--:--:--"}
          </p>
        </div>
      </div>
    </section>
  )
}
