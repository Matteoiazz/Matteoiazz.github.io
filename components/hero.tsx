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
 * La sezione successiva risale sopra la coda della scena (margine negativo):
 * il suo contenuto entra dal basso proprio mentre la frase del secondo tempo
 * se ne va. Con un margine fisso di 25vh restava invece un tratto di circa
 * un terzo di schermo in cui non si vedeva nulla e bisognava scorrere a vuoto.
 * Il margine è in vh più un tratto in rem: la parte in rem compensa il
 * padding in alto della sezione successiva, che non scala con lo schermo.
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
  const flowerFade = useTransform(p, [0, 0.74, 0.96], [1, 1, 0])

  // Lo sfondo della scena sparisce col fiore: allo sblocco il contenitore è
  // vuoto, quindi il suo bordo non traccia più una riga sulla pagina.
  const sceneFade = useTransform(p, [0.74, 0.96], [1, 0])

  // 3. la frase entra mentre la presentazione esce (niente fotogrammi vuoti)
  //    ed esce prima della fine, così non scorre via sotto la nav
  const lineFade = useTransform(p, [0.2, 0.38, 0.66, 0.84], [0, 1, 1, 0])
  const lineY = useTransform(p, [0.2, 0.38, 0.66, 0.84], [36, 0, 0, -36])

  const animato = !calmo

  return (
    <section
      ref={ref}
      id="top"
      className={
        animato
          ? "relative -mb-[calc(17vh+12rem)] h-[185vh] sm:-mb-[calc(19vh+14rem)] sm:h-[195vh] lg:-mb-[calc(22vh+14rem)] lg:h-[210vh]"
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
          className="pointer-events-none absolute left-1/2 top-[calc(5rem+min(33.3vw,17.3svh))] z-0 aspect-square w-[min(104vw,54svh)] -translate-x-1/2 -translate-y-1/2 scale-[2] sm:top-[calc(5rem+min(29.4vw,17.9svh))] sm:w-[min(92vw,56svh)] lg:left-auto lg:right-[-8%] lg:top-1/2 lg:w-[min(88vh,52vw)] lg:translate-x-0 xl:right-[-5%] xl:w-[min(98vh,54vw)]"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgb(0 0 0 / 0.95) 0%, rgb(0 0 0 / 0.92) 26%, rgb(0 0 0 / 0.6) 40%, rgb(0 0 0 / 0.22) 52%, rgb(0 0 0 / 0) 68%)",
            }}
          />
        </motion.div>

        {/* Oggetto cromato. Sotto lg sta in alto, grande, come su un poster:
            il nome è ancorato in basso e ci si sovrappone appena. Da lg è
            affiancato a destra.
            Sotto lg la posizione parte dalla nav e non da una percentuale
            dell'altezza: nel PNG i petali iniziano al 18% dall'alto, quindi il
            centro sta a 5rem + 0.32 × larghezza e la cima del fiore resta
            sempre 14px sotto la capsula (in basso a 66px), che prima la
            tagliava. I valori in vw/svh sono 0.32 × quelli della larghezza. */}
        <motion.div
          style={
            animato
              ? { y: flowerY, scale: flowerScale, rotate: flowerRotate, opacity: flowerFade }
              : undefined
          }
          className="pointer-events-none absolute left-1/2 top-[calc(5rem+min(33.3vw,17.3svh))] z-0 aspect-square w-[min(104vw,54svh)] -translate-x-1/2 -translate-y-1/2 will-change-transform sm:top-[calc(5rem+min(29.4vw,17.9svh))] sm:w-[min(92vw,56svh)] lg:left-auto lg:right-[-8%] lg:top-1/2 lg:w-[min(88vh,52vw)] lg:translate-x-0 xl:right-[-5%] xl:w-[min(98vh,54vw)]"
        >
          {/* Quasi pieno anche sotto lg: il testo ci passa sopra solo nel
              bordo basso, protetto dalla velatura.
              `priority` è deprecato da Next 16: per l'immagine più grande
              sopra la piega la documentazione indica loading/fetchPriority. */}
          <Image
            src="/hero-chrome.png"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 1024px) 80vw, 50vw"
            className="object-contain opacity-90 lg:opacity-100"
            style={{
              maskImage: "radial-gradient(circle at center, #000 50%, transparent 74%)",
              WebkitMaskImage: "radial-gradient(circle at center, #000 50%, transparent 74%)",
            }}
          />
        </motion.div>

        {/* Velatura dal basso, solo sotto lg: scurisce dove il nome incontra il
            fiore e lascia il fiore libero in alto. */}
        <motion.div
          aria-hidden
          style={{
            opacity: animato ? introFade : 1,
            background:
              "linear-gradient(180deg, transparent 22%, color-mix(in oklch, var(--background) 55%, transparent) 42%, color-mix(in oklch, var(--background) 86%, transparent) 60%, color-mix(in oklch, var(--background) 92%, transparent) 100%)",
          }}
          className="pointer-events-none absolute inset-0 z-[5] lg:hidden"
        />

        <motion.div
          style={animato ? { y: introY, opacity: introFade } : undefined}
          className="contenitore relative z-10 flex h-full flex-col justify-end pb-20 sm:pb-24 lg:justify-center lg:pb-0"
        >
          <div className="fade-up text-xs text-muted-foreground sm:text-sm">
            {profile.location}
          </div>

          {/* Il nome, soggetto della scena. La dimensione sta sull'h1 e non
              sulle righe: il tracking in em si calcola sul font dell'elemento
              che lo dichiara, e prima valeva quello dei 16px di base (quasi
              nullo). Dimensioni per schermo in .hero-nome, globals.css. */}
          <h1 className="hero-nome mt-5 font-semibold leading-[0.88] tracking-[-0.04em] lg:mt-6">
            <span className="clip-line">
              <span className="clip-rise title-fade block" style={{ animationDelay: "0.1s" }}>
                Matteo
              </span>
            </span>
            <span className="clip-line">
              <span className="clip-rise title-fade block" style={{ animationDelay: "0.22s" }}>
                Iazzolino
              </span>
            </span>
          </h1>

          <p
            className="fade-up mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mt-6"
            style={{ animationDelay: "0.34s" }}
          >
            <span className="text-foreground">{profile.role}.</span> {profile.tagline}
          </p>

          <div
            className="fade-up mt-7 flex flex-wrap items-center gap-3 lg:mt-8"
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

          {/* Striscia dati e loghi solo da sm: sul telefono ruolo e sede sono
              già sopra, e senza di loro il nome ha lo spazio per essere il
              protagonista della schermata. */}
          <div
            className="fade-up mt-12 hidden max-w-2xl grid-cols-4 border-t border-[var(--hairline)] sm:grid"
            style={{ animationDelay: "0.5s" }}
          >
            {dati.map((d, i) => (
              <div
                key={d.k}
                className={[
                  "py-4 pr-4 border-[var(--hairline)]",
                  i === 0 ? "pl-0" : "pl-4",
                  i < dati.length - 1 ? "border-r" : "",
                ].join(" ")}
              >
                <p className="eyebrow uppercase">{d.k}</p>
                <p className="mt-1 text-sm font-medium">{d.v}</p>
              </div>
            ))}
          </div>

          <div
            className="fade-up mt-8 hidden flex-wrap items-center gap-5 text-muted-foreground/60 sm:flex"
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
            className="contenitore pointer-events-none absolute inset-0 z-10 flex items-end justify-center pb-[24vh] text-center lg:items-center lg:justify-start lg:pb-0 lg:text-left"
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
