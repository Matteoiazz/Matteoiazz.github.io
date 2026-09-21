import type { ComponentType } from "react"
import { FaJava } from "react-icons/fa"
import {
  SiAngular,
  SiApachemaven,
  SiC,
  SiCplusplus,
  SiChartdotjs,
  SiDocker,
  SiElectron,
  SiFastapi,
  SiFramer,
  SiGradle,
  SiHibernate,
  SiJavascript,
  SiJetpackcompose,
  SiJsonwebtokens,
  SiKeycloak,
  SiKotlin,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPydantic,
  SiPython,
  SiRabbitmq,
  SiReact,
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si"

type IconComponent = ComponentType<{ className?: string }>

/**
 * Mappa nome tecnologia → logo. La chiave è il nome in minuscolo,
 * così i valori in `portfolio-data.ts` restano leggibili.
 * Se una tecnologia non è qui, il chip viene mostrato senza logo.
 */
const ICONS: Record<string, IconComponent> = {
  java: FaJava,
  javafx: FaJava,
  c: SiC,
  "c++": SiCplusplus,
  electron: SiElectron,
  kotlin: SiKotlin,
  python: SiPython,
  typescript: SiTypescript,
  javascript: SiJavascript,
  react: SiReact,
  angular: SiAngular,
  spring: SiSpring,
  "spring boot": SiSpringboot,
  "node.js": SiNodedotjs,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  docker: SiDocker,
  rabbitmq: SiRabbitmq,
  keycloak: SiKeycloak,
  "next.js": SiNextdotjs,
  "tailwind css": SiTailwindcss,
  "chart.js": SiChartdotjs,
  "jetpack compose": SiJetpackcompose,
  motion: SiFramer,
  "framer motion": SiFramer,
  vite: SiVite,
  // Express resta senza logo: il suo marchio è la scritta "ex" e in mezzo alle
  // altre icone sembrava testo finito lì per sbaglio. Nella scheda del progetto
  // compare comunque come voce con il nome.
  prisma: SiPrisma,
  sqlite: SiSqlite,
  maven: SiApachemaven,
  gradle: SiGradle,
  jwt: SiJsonwebtokens,
  "spring security": SiSpringsecurity,
  hibernate: SiHibernate,
  fastapi: SiFastapi,
  pydantic: SiPydantic,
}

/**
 * Tecnologie con un logo, senza ripetere lo stesso logo: Java e JavaFX, per
 * esempio, condividono l'icona e affiancate sembrano un doppione.
 */
export function conLogoDistinto(nomi: string[]): string[] {
  const visti = new Set<IconComponent>()
  return nomi.filter((nome) => {
    const icona = ICONS[nome.toLowerCase()]
    if (!icona || visti.has(icona)) return false
    visti.add(icona)
    return true
  })
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name.toLowerCase()]
  if (!Icon) return null
  return <Icon className={className} aria-hidden />
}
