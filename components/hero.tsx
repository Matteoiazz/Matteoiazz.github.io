"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { profile, projects } from "@/lib/portfolio-data"
import { TechIcon } from "@/components/tech-icon"

// Scelti a mano: prendendoli in ordine dallo stack comparivano C++ e C, che a
// 20px sono due "C" quasi identiche una accanto all'altra.
const principali = ["Java", "Kotlin", "Spring Boot", "Angular", "React", "PostgreSQL", "Python"]

const dati = [
  { k: "Ruolo", v: profile.role },
  { k: "Sede", v: "Cosenza" },
  { k: "Progetti", v: `${projects.length}` },
  { k: "Laurea", v: "UniCal" },
]

/**
 * Prima schermata come scena bloccata in tre tempi:
 * la presentazione sale e sfuma, una frase nuova prende il suo posto mentre il
 * fiore cresce e ruota, poi tutto si ritira prima che la scena si sblocchi.
 *
 * La sezione successiva risale sopra la coda della scena (margine negativo)
 * mentre il fiore sfuma: senza, tra la fine dell'hero e i progetti restava
 * un'intera schermata vuota.
 *
 * Con prefers-reduced-motion la scena non si blocca e resta statica.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const calmo = useReducedMotion()

  // "end end": il progresso va da 0 a 1 esattamente mentre la scena è bloccata.
  // Con "end start" più di metà della transizione avveniva dopo lo sblocco,
  // mentre la scena stava già scorrendo via sopra i progetti.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const p = useSpring(scrollYProgress, { stiffness: 170, damping: 26, mass: 0.25 })

  // 1. la presentazione sale e sfuma
  const introY = useTransform(p, [0, 0.3], [0, -70])
  const introFade = useTransform(p, [0, 0.26], [1, 0])

  // 2. il fiore cresce, poi si ritira e sparisce prima dello sblocco
  const flowerScale = useTransform(p, [0, 0.55, 1], [1, 1.22, 0.92])
  const flowerRotate = useTransform(p, [0, 1], [0, 28])
  const flowerY = useTransform(p, [0, 1], [0, -40])
  const flowerFade = useTransform(p, [0, 0.72, 0.94], [1, 1, 0])

  // Lo sfondo della scena sparisce col fiore: allo sblocco il contenitore è
  // vuoto, quindi il suo bordo non traccia più una riga sulla pagina.
  const sceneFade = useTransform(p, [0.72, 0.94], [1, 0])

  // 3. la frase entra mentre la presentazione esce (niente fotogrammi vuoti)
  //    ed esce prima della fine, così non scorre via sotto la nav
  const lineFade = useTransform(p, [0.2, 0.38, 0.62, 0.78], [0, 1, 1, 0])
  const lineY = useTransform(p, [0.2, 0.38, 0.62, 0.78], [36, 0, 0, -36])

  const animato = !calmo

  return (
    <section
      ref={ref}
      id="top"
      className={
        animato
          ? "relative -mb-[15vh] h-[185vh] sm:-mb-[20vh] sm:h-[195vh] lg:-mb-[25vh] lg:h-[210vh]"
          : "relative"
      }
    >
      <div className={`${animato ? "sticky top-0" : "relative"} h-svh overflow-hidden`}>
        {/* Bagliore freddo */}
        <motion.div
          aria-hidden
          style={animato ? { opacity: sceneFade } : undefined}
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 65% 35%, color-mix(in oklch, var(--foreground) 13%, transparent), transparent 70%)",
            }}
          />
        </motion.div>

        {/* Vignettatura dello sfondo sotto l'oggetto: il PNG ha il fondo nero
            dipinto e più scuro della pagina, qui lo sfondo lo raggiunge e sfuma
            in largo così il riquadro dell'immagine non si vede. Resta ferma:
            non ruota né scala col fiore. */}
        <motion.div
          aria-hidden
          style={animato ? { opacity: sceneFade } : undefined}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[min(58vh,94vw)] -translate-x-1/2 -translate-y-1/2 scale-[2] sm:w-[min(66vh,82vw)] lg:left-auto lg:right-[-8%] lg:w-[min(88vh,52vw)] lg:translate-x-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgb(0 0 0 / 0.95) 0%, rgb(0 0 0 / 0.92) 26%, rgb(0 0 0 / 0.6) 40%, rgb(0 0 0 / 0.22) 52%, rgb(0 0 0 / 0) 68%)",
            }}
          />
        </motion.div>

        {/* Oggetto cromato: centrato dietro al testo sui piccoli schermi,
            affiancato a destra dove c'è spazio. */}
        <motion.div
          style={
            animato
              ? { y: flowerY, scale: flowerScale, rotate: flowerRotate, opacity: flowerFade }
              : undefined
          }
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[min(58vh,94vw)] -translate-x-1/2 -translate-y-1/2 will-change-transform sm:w-[min(66vh,82vw)] lg:left-auto lg:right-[-8%] lg:w-[min(88vh,52vw)] lg:translate-x-0"
        >
          {/* Sotto lg passa dietro al testo: attenuato per non disturbare la
              lettura. Da lg in poi è affiancato, quindi pieno.
              `priority` è deprecato da Next 16: per l'immagine più grande
              sopra la piega la documentazione indica loading/fetchPriority. */}
          <Image
            src="/hero-chrome.png"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 1024px) 80vw, 50vw"
            className="object-contain opacity-45 sm:opacity-60 lg:opacity-100"
            style={{
              maskImage: "radial-gradient(circle at center, #000 50%, transparent 74%)",
              WebkitMaskImage: "radial-gradient(circle at center, #000 50%, transparent 74%)",
            }}
          />
        </motion.div>

        {/* Velatura: sotto lg il testo passa sopra al cromo e va protetto. */}
        <motion.div
          aria-hidden
          style={{
            opacity: animato ? introFade : 1,
            background:
              "linear-gradient(180deg, color-mix(in oklch, var(--background) 82%, transparent) 15%, color-mix(in oklch, var(--background) 55%, transparent) 70%, transparent)",
          }}
          className="pointer-events-none absolute inset-0 z-[5] lg:hidden"
        />

        <motion.div
          style={animato ? { y: introY, opacity: introFade } : undefined}
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 sm:px-10"
        >
          <div className="fade-up text-xs text-muted-foreground sm:text-sm">
            {profile.location}
          </div>

          {/* Il nome, soggetto della scena */}
          <h1 className="mt-6 font-semibold leading-[0.88] tracking-[-0.04em]">
            <span className="clip-line">
              <span
                className="clip-rise title-fade block text-[clamp(3rem,11vw,7rem)]"
                style={{ animationDelay: "0.1s" }}
              >
                Matteo
              </span>
            </span>
            <span className="clip-line">
              <span
                className="clip-rise title-fade block text-[clamp(3rem,11vw,7rem)]"
                style={{ animationDelay: "0.22s" }}
              >
                Iazzolino
              </span>
            </span>
          </h1>

          <p
            className="fade-up mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "0.34s" }}
          >
            <span className="text-foreground">{profile.role}.</span> {profile.tagline}
          </p>

          <div
            className="fade-up mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "0.42s" }}
          >
            <a
              href="#projects"
              className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Vedi i progetti
            </a>
            <a
              href="#contact"
              className="glass glass-dyn island rounded-lg px-5 py-2.5 text-sm font-medium"
            >
              Contattami
            </a>
          </div>

          {/* Striscia dati */}
          <div
            className="fade-up mt-12 grid max-w-2xl grid-cols-2 border-t border-[var(--hairline)] sm:grid-cols-4"
            style={{ animationDelay: "0.5s" }}
          >
            {dati.map((d, i) => (
              <div
                key={d.k}
                // Una sola classe per proprietà per cella: se su un elemento
                // finiscono pl-0 e pl-4 insieme vince l'ordine del CSS, non il
                // nostro, e la cella risulta rientrata.
                className={[
                  "py-4 pr-4 border-[var(--hairline)]",
                  i === 0 ? "pl-0" : i === 2 ? "pl-0 sm:pl-4" : "pl-4",
                  i % 2 === 0 ? "border-r" : "",
                  i === 3 ? "sm:border-r-0" : "sm:border-r",
                  i < 2 ? "border-b sm:border-b-0" : "",
                ].join(" ")}
              >
                <p className="eyebrow uppercase">{d.k}</p>
                <p className="mt-1 text-sm font-medium">{d.v}</p>
              </div>
            ))}
          </div>

          <div
            className="fade-up mt-8 flex flex-wrap items-center gap-5 text-muted-foreground/60"
            style={{ animationDelay: "0.58s" }}
          >
            {principali.map((t) => (
              <TechIcon key={t} name={t} className="size-5" />
            ))}
          </div>
        </motion.div>

        {/* Frase del secondo tempo: occupa il posto lasciato dalla
            presentazione (colonna sinistra da lg, in basso sotto lg dove il
            fiore non c'è). Testo nuovo, non una ripetizione del sottotitolo. */}
        {animato ? (
          <motion.div
            style={{ opacity: lineFade, y: lineY }}
            className="pointer-events-none absolute inset-0 z-10 mx-auto flex max-w-6xl items-end justify-center px-6 pb-[18vh] text-center sm:px-10 lg:items-center lg:justify-start lg:pb-0 lg:text-left"
          >
            <p className="max-w-xl text-balance text-[clamp(1.6rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              <span className="text-foreground">Backend solidi,</span>{" "}
              <span className="text-muted-foreground">interfacce che si usano senza pensarci.</span>
            </p>
          </motion.div>
        ) : null}

        <motion.div
          style={animato ? { opacity: introFade } : undefined}
          className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
        >
          <span className="eyebrow uppercase">Scorri</span>
        </motion.div>
      </div>
    </section>
  )
}
