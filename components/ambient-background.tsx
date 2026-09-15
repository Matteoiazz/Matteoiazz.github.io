/**
 * Atmosfera di fondo — versione a costo zero.
 *
 * Niente `filter: blur()` e niente animazioni: un radial-gradient è già
 * morbido di suo, e viene dipinto una volta sola. La versione precedente
 * animava tre superfici sfocate a 90px grandi quanto lo schermo, costringendo
 * il browser a ri-rasterizzarle a ogni fotogramma.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage: [
          "radial-gradient(60% 50% at 12% 8%, color-mix(in oklch, var(--brand) 22%, transparent), transparent 70%)",
          "radial-gradient(55% 45% at 88% 22%, color-mix(in oklch, var(--brand-2) 16%, transparent), transparent 70%)",
          "radial-gradient(70% 55% at 50% 105%, color-mix(in oklch, var(--brand) 14%, transparent), transparent 70%)",
        ].join(","),
      }}
    />
  )
}
