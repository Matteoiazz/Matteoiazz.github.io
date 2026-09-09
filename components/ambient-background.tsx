/**
 * Atmosfera di fondo, fissa dietro a tutto il sito.
 * Solo CSS (nessun JS): tre masse luminose in lenta deriva, una griglia tecnica
 * appena accennata e una pellicola di grana. Serve a togliere la sensazione di
 * "nero piatto" senza aggiungere colore che romperebbe lo stile monocromatico.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Massa fredda in alto a sinistra */}
      <div
        className="aurora-blob left-[-15%] top-[-10%] h-[60vmax] w-[60vmax] opacity-[0.14]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.72 0.09 250), transparent 65%)",
          animation: "aurora-a 26s ease-in-out infinite",
        }}
      />
      {/* Massa violacea a destra */}
      <div
        className="aurora-blob right-[-20%] top-[20%] h-[55vmax] w-[55vmax] opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, oklch(0.66 0.11 300), transparent 65%)",
          animation: "aurora-b 32s ease-in-out infinite",
        }}
      />
      {/* Alone neutro in basso, tiene insieme la composizione */}
      <div
        className="aurora-blob bottom-[-25%] left-[25%] h-[65vmax] w-[65vmax] opacity-[0.10]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.85 0.02 240), transparent 65%)",
          animation: "aurora-c 38s ease-in-out infinite",
        }}
      />

      {/* Griglia tecnica, sfuma verso il basso */}
      <div className="grid-layer absolute inset-0 opacity-40" />

      {/* Vignettatura: concentra l'attenzione al centro */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, transparent 40%, var(--background) 100%)",
        }}
      />

      {/* Grana */}
      <div className="grain-layer absolute inset-0 opacity-[0.045] mix-blend-overlay" />
    </div>
  )
}
