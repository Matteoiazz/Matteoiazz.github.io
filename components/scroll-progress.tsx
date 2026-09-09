"use client"

import { motion, useScroll, useSpring } from "motion/react"

/** Barra di avanzamento in cima alla pagina. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-transparent via-foreground to-transparent"
    />
  )
}
