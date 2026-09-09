import Image from "next/image"

export type DeviceFrame = "phone" | "browser"

type DeviceMockupProps = {
  src: string
  alt: string
  frame: DeviceFrame
}

/**
 * Cornice fittizia attorno allo screenshot di un progetto.
 * "phone" per le app mobile, "browser" per le web app: la cornice sbagliata
 * darebbe un'idea sbagliata di cos'è il progetto.
 *
 * Pensata per stare dentro un contenitore `relative`: appare in hover,
 * la logica di visibilità sta nel componente che la usa.
 */
export function DeviceMockup({ src, alt, frame }: DeviceMockupProps) {
  if (frame === "phone") {
    return (
      <div className="relative aspect-[9/19.5] h-[86%] overflow-hidden rounded-[1.75rem] border-[3px] border-neutral-700 bg-neutral-900 shadow-2xl shadow-black/60 ring-1 ring-white/10">
        {/* capsula altoparlante */}
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-neutral-700/90" />
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 40vw, 20vw"
          className="object-cover object-top"
        />
      </div>
    )
  }

  return (
    <div className="relative w-[86%] overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900 shadow-2xl shadow-black/60 ring-1 ring-white/10">
      {/* barra della finestra */}
      <div className="flex items-center gap-1.5 border-b border-neutral-700 bg-neutral-800 px-3 py-2">
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="ml-2 h-3 flex-1 rounded-full bg-neutral-700/70" />
      </div>
      {/* Formato tarato sulle catture desktop a schermo intero (~21:10):
          con 16/10 object-cover taglierebbe i lati dell'interfaccia. */}
      <div className="relative aspect-[21/10]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 80vw, 40vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  )
}
