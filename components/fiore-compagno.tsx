"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"

/**
 * Il fiore della prima schermata resta con chi scorre: quando la scena
 * iniziale lo fa sparire, ricompare fermo sul lato destro, dietro i
 * contenuti, e ruota piano con la pagina. Sparisce di nuovo prima dei
 * contatti, dove riemerge il fiore della chiusura.
 *
 * Inizio e fine si misurano sulle sezioni vere (#top e #contact), non in
 * percentuale della pagina: l'altezza cambia con lo schermo e coi filtri.
 * Le card sono opache, quindi si vede negli spazi tra un blocco e l'altro.
 * Solo da md: sul telefono starebbe dietro al testo.
 */
export function FioreCompagno() {
  const calmo = useReducedMotion()
  const { scrollY } = useScroll()
  // Anche l'altezza dello schermo sta qui: le trasformazioni girano pure nel
  // rendering sul server, dove window non esiste. Finché non si misura, il
  // fiore resta spento.
  const limiti = useRef({ inizio: Infinity, fine: Infinity, h: 1 })

  useEffect(() => {
    const misura = () => {
      const h = window.innerHeight
      const scena = document.getElementById("top")
      const contatti = document.getElementById("contact")
      limiti.current = {
        inizio: scena ? scena.offsetTop + scena.offsetHeight - h * 1.05 : h,
        fine: contatti ? contatti.offsetTop - h * 0.85 : document.body.scrollHeight,
        h,
      }
    }
    misura()
    const osservatore = new ResizeObserver(misura)
    osservatore.observe(document.body)
    return () => osservatore.disconnect()
  }, [])

  const opacita = useTransform(scrollY, (y) => {
    const { inizio, fine, h } = limiti.current
    const entra = Math.min(1, Math.max(0, (y - inizio) / (h * 0.45)))
    const esce = Math.min(1, Math.max(0, (fine - y) / (h * 0.45)))
    return Math.min(entra, esce) * 0.28
  })
  const rotazione = useSpring(
    useTransform(scrollY, (y) => y * 0.022),
    { stiffness: 70, damping: 22, mass: 0.6 },
  )
  // Sale un poco mentre si scende: lo stacco dallo sfondo fermo si sente.
  const spostamento = useTransform(scrollY, (y) => `${Math.sin(y / 1400) * 6}vh`)

  if (calmo) return null

  return (
    <motion.div
      aria-hidden
      style={{ opacity: opacita, y: spostamento }}
      // Per metà fuori dallo schermo: vive nel margine, non dietro al testo.
      className="pointer-events-none fixed right-[-21vw] top-[calc(50%-21vw)] z-0 hidden aspect-square w-[42vw] max-w-[46rem] md:block"
    >
      <motion.div style={{ rotate: rotazione }} className="relative size-full will-change-transform">
        <Image
          src="/hero-chrome.png"
          alt=""
          fill
          sizes="42vw"
          // Stesso file della prima schermata, già in cache.
          loading="eager"
          className="object-contain"
          style={{
            maskImage: "radial-gradient(circle at center, #000 44%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at center, #000 44%, transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
