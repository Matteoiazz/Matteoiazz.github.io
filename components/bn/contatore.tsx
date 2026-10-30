"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Numero a rulli, come un contachilometri: ogni cifra scorre fino al suo
 * valore quando il numero entra in vista. I caratteri non numerici
 * (barre, lettere) restano fermi.
 */
export function Contatore({ valore, className = "" }: { valore: string; className?: string }) {
  const radice = useRef<HTMLSpanElement>(null)
  const [visto, setVisto] = useState(false)

  useEffect(() => {
    const el = radice.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisto(true)
      return
    }
    const o = new IntersectionObserver(([v]) => v.isIntersecting && (setVisto(true), o.disconnect()), { threshold: 0.6 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <span ref={radice} className={`inline-flex tabular-nums ${className}`} aria-label={valore}>
      {[...valore].map((c, i) =>
        /\d/.test(c) ? (
          <span key={i} aria-hidden className="relative inline-block h-[1em] overflow-hidden leading-none">
            <span
              className="flex flex-col transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateY(-${visto ? Number(c) * 10 : 0}%)`,
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d} className="h-[1em]">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden className="leading-none">
            {c}
          </span>
        ),
      )}
    </span>
  )
}
