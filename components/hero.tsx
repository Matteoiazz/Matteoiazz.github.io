"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import { profile } from "@/lib/portfolio-data"
import { Magnetic } from "@/components/magnetic"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Ammorbidisce lo scroll grezzo per un movimento più fluido dell'oggetto.
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  // Il testo si allontana e sfuma velocemente lasciando la scena all'oggetto.
  const contentY = useTransform(p, [0, 1], [0, -180])
  const contentOpacity = useTransform(p, [0, 0.4], [1, 0])

  // L'oggetto chrome: vola verso di te, ruota e si inclina — è il protagonista.
  const chromeY = useTransform(p, [0, 1], [0, -240])
  const chromeScale = useTransform(p, [0, 1], [1, 1.6])
  const chromeRotate = useTransform(p, [0, 1], [0, 42])
  const chromeRotateX = useTransform(p, [0, 1], [0, 18])
  const chromeX = useTransform(p, [0, 1], [0, 60])

  // Il bagliore pulsa e si sposta in controparallax per dare profondità.
  const glowOpacity = useTransform(p, [0, 0.5, 1], [0.45, 0.7, 0.2])
  const glowScale = useTransform(p, [0, 1], [1, 1.4])
  const glowY = useTransform(p, [0, 1], [0, -120])

  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section ref={ref} id="top" className="relative h-[240vh]">
      <div
        className="sticky top-0 flex h-screen flex-col items-center overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {/* Bagliore radiale morbido, in controparallax dietro l'oggetto */}
        <motion.div
          style={{ opacity: glowOpacity, scale: glowScale, y: glowY }}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[42%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[130px]"
        />

        {/* Testo */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto max-w-5xl px-6 pt-24 text-center sm:pt-28"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-2.5 text-base text-foreground backdrop-blur"
          >
            Ciao, sono Matteo
            <span aria-hidden>👋</span>
          </motion.p>

          {/* Rivelazione parola per parola: ogni parola entra da sfocata a nitida.
              Più lenta e "fisica" di una semplice dissolvenza del blocco intero. */}
          <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
            {profile.headlineLead.split(" ").map((word, i) => (
              <motion.span
                key={`lead-${i}`}
                initial={{ opacity: 0, y: 44, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.25 + i * 0.09, ease }}
                className="text-sheen inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
            {profile.headlineMuted.split(" ").map((word, i) => (
              <motion.span
                key={`muted-${i}`}
                initial={{ opacity: 0, y: 44, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1,
                  delay: 0.4 + (profile.headlineLead.split(" ").length + i) * 0.06,
                  ease,
                }}
                className="inline-block text-muted-foreground"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-9 flex items-center justify-center"
          >
            <Magnetic>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-9 py-4.5 text-lg font-medium text-background transition-transform hover:scale-105"
              >
                {/* riflesso che attraversa il pulsante al passaggio del mouse */}
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                Mettiamoci in contatto
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Oggetto chrome: risalito sotto il titolo e reso dinamico allo scroll */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease }}
          style={{
            y: chromeY,
            x: chromeX,
            scale: chromeScale,
            rotate: chromeRotate,
            rotateX: chromeRotateX,
            transformPerspective: 1200,
          }}
          // Parte sotto al blocco di testo (non sopra) e sale con lo scroll.
          // z-0: se su viewport bassi lo spazio non basta, il testo resta comunque leggibile.
          // Sbuca da sotto al testo e sale con lo scroll (z-0: il testo resta sempre leggibile).
          className="pointer-events-none absolute top-[98%] left-1/2 z-0 h-[42vh] w-[42vh] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 will-change-transform sm:h-[56vh] sm:w-[56vh]"
        >
          <Image
            src="/hero-chrome.png"
            alt=""
            fill
            priority
            sizes="52vh"
            className="object-contain"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at center, #000 52%, transparent 70%)",
              maskImage:
                "radial-gradient(circle at center, #000 52%, transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
