import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects } from "@/lib/portfolio-data"
import { Progetto } from "@/components/foglio/progetto"

// Export statico: esistono solo le pagine generate qui sotto, una per progetto.
export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const progetto = projects.find((p) => p.slug === slug)
  if (!progetto) return {}
  return {
    title: `${progetto.title} · ${progetto.casoStudio ? "Caso di studio" : "Progetto"} · Matteo Iazzolino`,
    description: progetto.tagline,
  }
}

export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!projects.some((p) => p.slug === slug)) notFound()
  return <Progetto slug={slug} />
}
