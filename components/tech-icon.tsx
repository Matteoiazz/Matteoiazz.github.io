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
  SiExpress,
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
  express: SiExpress,
  prisma: SiPrisma,
  sqlite: SiSqlite,
  maven: SiApachemaven,
  gradle: SiGradle,
  jwt: SiJsonwebtokens,
  "spring security": SiSpringsecurity,
  hibernate: SiHibernate,
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name.toLowerCase()]
  if (!Icon) return null
  return <Icon className={className} aria-hidden />
}
