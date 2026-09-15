import Image from "next/image"
import type { Shot } from "@/lib/portfolio-data"

/**
 * Cornice fittizia attorno a una schermata di progetto: telefono per le app
 * mobile, finestra browser per le web app, finestra con titolo per le app
 * desktop. La cornice sbagliata darebbe un'idea sbagliata del progetto.
 *
 * Va messa dentro un contenitore `.shot-stage` (container-type: size): la
 * cornice si adatta alla sua altezza e larghezza senza mai uscirne, qualunque
 * sia il formato della schermata mostrata.
 */
export function DeviceMockup({
  shot,
  titolo,
  sizes = "(min-width: 1024px) 60vw, 92vw",
}: {
  shot: Shot
  /** Titolo nella barra delle finestre desktop. */
  titolo?: string
  sizes?: string
}) {
  if (shot.frame === "phone") {
    return (
      <div className="shot-phone relative overflow-hidden rounded-[1.6rem] border-[3px] border-neutral-700 bg-neutral-900 shadow-2xl shadow-black/60 ring-1 ring-white/10">
        {/* capsula altoparlante */}
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-neutral-700/90" />
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="(min-width: 1024px) 20vw, 45vw"
          className="object-cover object-top"
        />
      </div>
    )
  }

  return (
    <div className="shot-browser relative flex flex-col overflow-hidden rounded-xl border border-neutral-700/80 bg-neutral-900 shadow-2xl shadow-black/60 ring-1 ring-white/10">
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-neutral-700/80 bg-neutral-800/90 px-3">
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="size-2 rounded-full bg-neutral-600" />
        {shot.frame === "window" ? (
          <span className="flex-1 pr-8 text-center text-[0.72rem] font-medium text-neutral-400">
            {titolo}
          </span>
        ) : (
          <span className="ml-2 h-3 w-2/5 rounded-full bg-neutral-700/70" />
        )}
      </div>
      {/* Le catture sono 16:10 (1440×900): stesso formato, niente tagli. */}
      <div className="relative aspect-[16/10]">
        <Image src={shot.src} alt={shot.alt} fill sizes={sizes} className="object-cover object-top" />
      </div>
    </div>
  )
}
