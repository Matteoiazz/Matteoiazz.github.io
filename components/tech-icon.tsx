import type { ComponentType } from "react"
import { FaJava } from "react-icons/fa"
import {
  SiAngular,
  SiChartdotjs,
  SiDocker,
  SiFramer,
  SiJavascript,
  SiJetpackcompose,
  SiKeycloak,
  SiKotlin,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiRabbitmq,
  SiReact,
  SiSpring,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
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
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name.toLowerCase()]
  if (!Icon) return null
  return <Icon className={className} aria-hidden />
}
