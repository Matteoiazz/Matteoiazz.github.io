"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react"
import { capitoli, fasce, ordineStrati, type Strato } from "@/lib/storia"
import { useLingua } from "@/components/foglio/lingua"

type Stato = "acceso" | "visto" | "spento"

/** Lo stato di ogni strato dato il capitolo in lettura: lo stack si costruisce dal basso. */
function statoDi(attivo: Strato | null, tutti: boolean) {
  const corrente = attivo ? ordineStrati.indexOf(attivo) : -1
  return (id: Strato): Stato => {
    if (tutti) return "acceso"
    const i = ordineStrati.indexOf(id)
    if (i === corrente) return "acceso"
    return i < corrente ? "visto" : "spento"
  }
}

/** Il ritaglio del disegno intero che mostra una fascia sola. */
function ritaglio(da: number, a: number) {
  const alta = a - da
  return {
    backgroundImage: "url(/apertura/strati.webp)",
    backgroundRepeat: "no-repeat",
    backgroundSize: `100% ${(100 / alta) * 100}%`,
    backgroundPosition: `0 ${(da / (100 - alta)) * 100}%`,
  }
}

// ---------------------------------------------------------------------------
// Telefono: la pila da vicino, nella barra fissa.
// ---------------------------------------------------------------------------

// Sul telefono la pila è più alta del riquadro che la inquadra: si vede uno strato per volta.
const INGRANDIMENTO = 2.3

/**
 * Il disegno degli strati da vicino, per la barra fissa del telefono: un
 * riquadro basso che inquadra lo strato del capitolo in lettura, con i vicini
 * che sfumano ai bordi. A ogni capitolo la vista sale di uno strato, come una
 * cinepresa lungo la pila; prima del primo capitolo e alla fine si allontana e
 * mostra la pila intera. Lo strato in lettura è acceso, quelli già raccontati
 * restano a metà, quelli da raccontare sono appena accennati e sospesi un po'
 * più in alto.
 */
export function StratiDaVicino({ attivo, tutti = false, className = "" }: { attivo: Strato | null; tutti?: boolean; className?: string }) {
  const stato = statoDi(attivo, tutti)
  const fuoco = !tutti && attivo ? fasce.find((f) => f.id === attivo) : undefined
  // Il punto della pila da portare al centro del riquadro, in percentuale della sua altezza.
  const centro = fuoco ? (fuoco.da + fuoco.a) / 2 : 50
  return (
    <div aria-hidden className={`quadro-strati relative shrink-0 overflow-hidden ${className}`} style={{ aspectRatio: `${624 * INGRANDIMENTO} / 1141` }}>
      <div
        className="pila-strati absolute left-0 top-0 w-full"
        style={{
          height: `${INGRANDIMENTO * 100}%`,
          translate: `0 ${50 / INGRANDIMENTO - centro}%`,
          scale: fuoco ? 1 : 0.8 / INGRANDIMENTO,
        }}
      >
        {fasce.map((f) => (
          <span
            key={f.id}
            data-stato={stato(f.id)}
            className="strato absolute inset-x-0 block"
            style={{ top: `${f.da}%`, height: `${f.a - f.da}%`, ...ritaglio(f.da, f.a) }}
          />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Desktop: la pila si monta sotto lo scorrimento.
// ---------------------------------------------------------------------------

const liscio = (t: number) => {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

/**
 * Quanto è arrivato lo strato i (0 = database … 3 = AI) alla posizione p della
 * storia, dove p = k quando il capitolo k è al centro dello schermo. Lo strato
 * comincia a scendere quando il suo capitolo entra dal basso e si posa poco
 * prima che arrivi al centro. Il capitolo i è quello che racconta lo strato i.
 */
const arrivo = (p: number, i: number) => liscio((p - (i - 0.7)) / 0.58)

/** Nell'ultimo capitolo tutti gli strati tornano accesi. */
const finale = (p: number) => liscio((p - 3.3) / 0.58)

/**
 * Di quanti "spazi" lo strato i è spostato dal suo posto. Ogni strato non
 * ancora arrivato tiene aperto uno spazio sotto di sé, e chi gli sta sopra sale
 * con lui: la pila è una vista esplosa che si chiude dal basso. Metà
 * dell'apertura totale va verso il basso, così il disegno resta centrato.
 */
function spazi(p: number, i: number) {
  let sotto = 0
  let tutti = 0
  for (let j = 0; j < ordineStrati.length; j++) {
    const manca = 1 - arrivo(p, j)
    tutti += manca
    if (j <= i) sotto += manca
  }
  return tutti / 2 - sotto
}

function opacitaDi(p: number, i: number) {
  const prossimo = i < ordineStrati.length - 1 ? arrivo(p, i + 1) : 0
  return Math.min(1, 0.14 + 0.86 * arrivo(p, i) - 0.55 * prossimo * (1 - finale(p)))
}

/**
 * Il disegno degli strati sul desktop, legato allo scorrimento: è una vista
 * esplosa che si chiude dal basso mentre si legge. Ogni strato scende e prende
 * inchiostro seguendo la rotella, non a scatti; quelli già raccontati si
 * attenuano e nell'ultimo capitolo tornano tutti accesi. Gli strati si spostano
 * appena con il puntatore, a profondità diverse. Ogni strato, con il suo nome
 * accanto, è il link al capitolo che lo racconta: sotto il puntatore si accende
 * e si stacca appena dalla pila.
 *
 * Con il movimento ridotto la posizione arriva già a scatti, un capitolo alla
 * volta, e gli strati non seguono il puntatore.
 */
export function StratiScorrevoli({
  posizione,
  attivo,
  fermo,
}: {
  /** Posizione nella storia: k quando il capitolo k è al centro dello schermo. */
  posizione: MotionValue<number>
  /** Il capitolo in lettura. */
  attivo: number
  /** Movimento ridotto. */
  fermo: boolean
}) {
  const { t } = useLingua()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const mollaX = useSpring(px, { stiffness: 90, damping: 18, mass: 0.6 })
  const mollaY = useSpring(py, { stiffness: 90, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (fermo || !matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const muovi = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1)
      py.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("pointermove", muovi, { passive: true })
    return () => {
      window.removeEventListener("pointermove", muovi)
      // Senza puntatore da seguire gli strati tornano subito al loro posto.
      for (const v of [px, py, mollaX, mollaY]) v.jump(0)
    }
  }, [fermo, px, py, mollaX, mollaY])

  return (
    <nav aria-label={t("Gli strati della storia", "The layers of the story")} className="figura-storia relative" style={{ aspectRatio: "624 / 1141" }}>
      {ordineStrati.map((id, i) => (
        <StratoScorrevole key={id} id={id} i={i} posizione={posizione} mollaX={mollaX} mollaY={mollaY} attivo={attivo} fermo={fermo} />
      ))}
    </nav>
  )
}

function StratoScorrevole({
  id,
  i,
  posizione,
  mollaX,
  mollaY,
  attivo,
  fermo,
}: {
  id: Strato
  i: number
  posizione: MotionValue<number>
  mollaX: MotionValue<number>
  mollaY: MotionValue<number>
  attivo: number
  fermo: boolean
}) {
  const { t } = useLingua()
  const f = fasce.find((x) => x.id === id)!
  const capitolo = capitoli[i]
  // Sotto il puntatore, o con il fuoco da tastiera, lo strato si accende.
  const sopra = useMotionValue(0)
  const scelto = useSpring(sopra, { stiffness: 260, damping: 30 })
  const scegli = (si: boolean) => sopra.set(si ? 1 : 0)
  // Calcolati in JavaScript dalla posizione nella storia (forma a funzione).
  const sposta = useTransform(posizione, (p) => `0 calc(var(--spazio) * ${spazi(p, i).toFixed(4)})`)
  const opacita = useTransform([posizione, scelto], ([p, s]: number[]) => {
    const o = opacitaDi(p, i)
    return o + (1 - o) * Math.min(1, Math.max(0, s))
  })
  // Profondità: il database sta in fondo, l'AI davanti. Si muovono in versi opposti.
  const profondita = (i - 1.5) / 1.5
  // Solo in altezza: le linee tratteggiate tra gli strati sono verticali e restano allineate.
  const y = useTransform([mollaY, scelto], ([v, s]: number[]) => v * profondita * 5 - (fermo ? 0 : 5 * s))
  const nome = t(f.nome.it, f.nome.en)
  const titolo = t(capitolo.titolo.it, capitolo.titolo.en)
  const corrente = attivo === i
  // Nell'ultimo capitolo, che li riguarda tutti, i nomi sono tutti accesi.
  const acceso = corrente || attivo >= ordineStrati.length

  return (
    <motion.a
      href={`#capitolo-${capitolo.id}`}
      aria-label={`${nome}: ${titolo}`}
      aria-current={corrente ? "location" : undefined}
      data-cursore={titolo}
      onPointerEnter={() => scegli(true)}
      onPointerLeave={() => scegli(false)}
      onFocus={(e) => scegli(e.currentTarget.matches(":focus-visible"))}
      onBlur={() => scegli(false)}
      className="group absolute inset-x-0 block"
      style={{ top: `${f.da}%`, height: `${f.a - f.da}%`, translate: sposta }}
    >
      <motion.span aria-hidden className="absolute inset-0 block" style={{ opacity: opacita, y, ...ritaglio(f.da, f.a) }} />
      {/* Il nome accanto: lo spazio fino al disegno fa parte del link, così il puntatore non lo perde. */}
      <span
        className={`absolute left-full top-1/2 flex -translate-y-1/2 items-center gap-2.5 whitespace-nowrap py-2 pl-5 text-sm transition-colors duration-300 group-hover:text-inchiostro group-focus-visible:text-inchiostro ${
          acceso ? "text-inchiostro" : "text-grigio"
        }`}
      >
        <span
          aria-hidden
          className={`h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-6 group-hover:bg-inchiostro group-focus-visible:w-6 group-focus-visible:bg-inchiostro ${
            acceso ? "w-6 bg-inchiostro" : "w-3 bg-riga-forte"
          }`}
        />
        {nome}
      </span>
    </motion.a>
  )
}
