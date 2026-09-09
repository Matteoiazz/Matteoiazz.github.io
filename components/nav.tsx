"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

const links = [
  { href: "#about", label: "Chi sono" },
  { href: "#projects", label: "Progetti" },
  { href: "#experience", label: "Esperienza" },
  { href: "#contact", label: "Contatti" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-4xl items-center justify-between rounded-full border px-4 py-3 pl-6 transition-all duration-300 ${
          scrolled
            ? "border-border bg-card/80 shadow-lg shadow-primary/5 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 text-base font-medium tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
            MI
          </span>
          Matteo Iazzolino
        </a>
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-primary px-6 py-2.5 text-base font-medium text-primary-foreground transition-transform hover:scale-105"
        >
          Contattami
        </a>
      </nav>
    </motion.header>
  )
}
