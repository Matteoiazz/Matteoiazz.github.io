import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects } from "@/lib/portfolio-data"
import { casoStudio } from "@/lib/casi-studio"
import { CasoStudio } from "@/components/bn/caso"

// Export statico: esistono solo le pagine generate qui sotto.
export const dynamicParams = false

export function generateStaticParams() {
  return projects.filter((p) => p.casoStudio && casoStudio(p.slug)).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const progetto = projects.find((p) => p.slug === slug)
  if (!progetto) return {}
  return {
    title: `${progetto.title} · Caso di studio · Matteo Iazzolino`,
    description: progetto.tagline,
  }
}

export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!casoStudio(slug) || !projects.some((p) => p.slug === slug)) notFound()
  return <CasoStudio slug={slug} />
}
