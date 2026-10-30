"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"

// Celle per lettera: colonne × righe della griglia che copre ogni carattere.
const CX = 5
const CY = 7

// Pseudo-casuale deterministico: server e browser devono disegnare le
// stesse celle con gli stessi ritardi, altrimenti l'idratazione non combacia.
const caso = (a: number, b: number) => (((a * 7919 + b * 104729 + 13) % 997) + 997) % 997 / 997

/**
 * Parola monumentale costruita sulla griglia.
 *
 * All'arrivo ogni lettera è coperta da una griglia di celle del colore del
 * fondo che si ritirano in ordine casuale: il nome si compone cella per
 * cella. Poi le lettere rispondono al puntatore: quelle vicine si allargano
 * e si appesantiscono sugli assi della variabile di Archivo, le altre
 * tornano a riposo. La dimensione si adatta perché la riga più lunga
 * riempia esattamente la larghezza disponibile.
 */
export function Nome({
  righe,
  ritardo = 0,
  as: Tag = "h1",
  className = "",
  etichetta,
  subito = false,
  massimo = 0.3,
}: {
  righe: string[]
  ritardo?: number
  as?: "h1" | "h2" | "p"
  className?: string
  /** Testo per gli screen reader, se diverso dalle righe. */
  etichetta?: string
  /** Prima schermata: parte alla fine dell'ingresso, non quando entra in vista. */
  subito?: boolean
  /** Corpo massimo, in frazione della larghezza dello schermo. */
  massimo?: number
}) {
  const radice = useRef<HTMLElement>(null)
  const [visto, setVisto] = useState(false)

  // Adatta il corpo alla larghezza: misura la riga più lunga a 100px.
  useLayoutEffect(() => {
    const el = radice.current
    if (!el) return
    const adatta = () => {
      el.style.fontSize = "100px"
      const larghezza = el.clientWidth
      const piuLunga = Math.max(...[...el.querySelectorAll<HTMLElement>("[data-riga]")].map((r) => r.scrollWidth))
      // Tetto in proporzione allo schermo: una parola corta (EN: "PATH")
      // riempirebbe la riga diventando alta mezza pagina.
      const tetto = window.innerWidth * massimo
      if (piuLunga > 0) el.style.fontSize = `${Math.min(tetto, Math.floor((100 * larghezza * 0.985) / piuLunga))}px`
    }
    adatta()
    document.fonts?.ready.then(adatta)
    const osservatore = new ResizeObserver(adatta)
    osservatore.observe(el)
    return () => osservatore.disconnect()
  }, [massimo, righe.join("|")])

  // Fuori dalla prima schermata le celle partono quando la parola entra in vista.
  useEffect(() => {
    const el = radice.current
    if (!el || subito) return
    const osservatore = new IntersectionObserver(
      ([voce]) => {
        if (voce.isIntersecting) {
          setVisto(true)
          osservatore.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    osservatore.observe(el)
    return () => osservatore.disconnect()
  }, [subito])

  // Le lettere vicine al puntatore si allargano e si appesantiscono.
  useEffect(() => {
    const el = radice.current
    if (!el) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lettere = [...el.querySelectorAll<HTMLElement>(".lettera")]
    let frame = 0
    let px = -9999
    let py = -9999
    const disegna = () => {
      frame = 0
      const raggio = el.clientWidth * 0.18
      for (const l of lettere) {
        const r = l.getBoundingClientRect()
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2))
        const vicino = Math.max(0, 1 - d / raggio)
        // Curva morbida: l'effetto si concentra sotto il puntatore.
        const k = vicino * vicino * (3 - 2 * vicino)
        l.style.setProperty("--w", (92 + 33 * k).toFixed(1))
        l.style.setProperty("--p", (760 + 140 * k).toFixed(0))
      }
    }
    const muovi = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      if (!frame) frame = requestAnimationFrame(disegna)
    }
    const esci = () => {
      px = py = -9999
      if (!frame) frame = requestAnimationFrame(disegna)
    }
    window.addEventListener("pointermove", muovi, { passive: true })
    document.documentElement.addEventListener("pointerleave", esci)
    return () => {
      window.removeEventListener("pointermove", muovi)
      document.documentElement.removeEventListener("pointerleave", esci)
      cancelAnimationFrame(frame)
    }
  }, [righe.join("|")])

  return (
    <Tag
      ref={radice as never}
      aria-label={etichetta ?? righe.join(" ")}
      className={`nome ${subito ? "nome-subito" : ""} ${visto ? "nome-visto" : ""} block w-full select-none font-sans leading-[0.82] tracking-[-0.025em] ${className}`}
      style={{ fontSize: "14vw" }}
    >
      {righe.map((riga, ri) => (
        <span key={ri} data-riga aria-hidden className="block w-max whitespace-nowrap">
          {[...riga].map((c, ci) => (
            <span key={ci} className="lettera relative" style={{ "--w": 92, "--p": 760 } as React.CSSProperties}>
              {c === " " ? " " : c}
              <span
                className="celle"
                style={{ "--cx": CX, "--cy": CY, "--base": `${ritardo + ri * 140}ms` } as React.CSSProperties}
              >
                {Array.from({ length: CX * CY }, (_, k) => (
                  <i key={k} style={{ "--d": Math.round(caso(ri * 31 + ci, k) * 900) } as React.CSSProperties} />
                ))}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
