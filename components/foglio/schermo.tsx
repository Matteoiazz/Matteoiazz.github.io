import Image from "next/image"
import type { Shot } from "@/lib/portfolio-data"

/**
 * Cornice chiara attorno a una schermata: un telefono con un filo
 * d'inchiostro per le app mobile, una finestra con la barra grigio chiaro per
 * web e desktop (sulle app desktop c'è il nome nella barra). La cornice
 * sbagliata darebbe un'idea sbagliata del progetto.
 *
 * Va dentro un `.palco-schermo` (container-type: size): la cornice prende le
 * misure dal riquadro e non ne esce mai, qualunque sia il suo formato.
 */
export function Schermo({
  shot,
  titolo,
  sizes,
  priorita = false,
}: {
  shot: Shot
  titolo?: string
  sizes?: string
  priorita?: boolean
}) {
  if (shot.frame === "phone") {
    return (
      <div className="schermo-telefono relative rounded-[1.35rem] bg-inchiostro p-[0.28rem] shadow-[0_2px_4px_rgb(0_0_0/0.08),0_24px_40px_-22px_rgb(0_0_0/0.45)]">
        <div className="relative h-full w-full overflow-hidden rounded-[1.08rem]">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            priority={priorita}
            sizes={sizes ?? "(min-width: 768px) 14vw, 40vw"}
            className="object-cover object-top"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="schermo-finestra relative flex flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_1px_3px_rgb(0_0_0/0.08),0_28px_50px_-28px_rgb(0_0_0/0.4)]">
      <div className="flex h-6 shrink-0 items-center gap-[5px] bg-[#f1f1f1] px-2.5">
        <span className="size-[7px] rounded-full bg-[#d4d4d4]" />
        <span className="size-[7px] rounded-full bg-[#d4d4d4]" />
        <span className="size-[7px] rounded-full bg-[#d4d4d4]" />
        {shot.frame === "window" && titolo ? (
          <span className="flex-1 truncate pr-6 text-center text-[0.75rem] font-medium text-[#666]">{titolo}</span>
        ) : (
          <span className="ml-2 h-2.5 w-2/5 rounded-full bg-white" />
        )}
      </div>
      {/* Le catture sono 16:10 (1440×900): stesso formato, niente tagli. */}
      <div className="relative aspect-[16/10]">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          priority={priorita}
          sizes={sizes ?? "(min-width: 768px) 40vw, 90vw"}
          className="object-cover object-top"
        />
      </div>
    </div>
  )
}

/**
 * Il riquadro grigio chiaro con la schermata dentro: un telefono o due
 * affiancati per le app mobile, la finestra per le altre. È lo stesso oggetto
 * in casa, nell'anteprima dell'indice e in testa alla pagina del progetto,
 * così la view transition sembra un solo oggetto che si sposta.
 */
export function Palco({
  shots,
  titolo,
  telefoni = 2,
  margine = "9%",
  sizes,
  priorita = false,
}: {
  shots: Shot[]
  titolo: string
  telefoni?: number
  margine?: string
  sizes?: string
  priorita?: boolean
}) {
  const primo = shots[0]
  const mobile = primo.frame === "phone"
  const elenco = mobile ? shots.filter((s) => s.frame === "phone").slice(0, telefoni) : [primo]
  return (
    <div className="absolute flex items-center justify-center gap-[5%]" style={{ inset: margine }}>
      {elenco.map((s, k) =>
        mobile ? (
          <div
            key={s.src}
            className="palco-schermo h-full"
            style={{ aspectRatio: "9 / 19.5", transform: elenco.length > 1 && k % 2 === 1 ? "translateY(7%)" : undefined }}
          >
            <Schermo shot={s} sizes={sizes} priorita={priorita} />
          </div>
        ) : (
          <div key={s.src} className="palco-schermo flex h-full w-full items-center justify-center">
            <Schermo shot={s} titolo={titolo} sizes={sizes} priorita={priorita} />
          </div>
        ),
      )}
    </div>
  )
}
