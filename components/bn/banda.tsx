import type { CSSProperties } from "react"

// Ordine di crescita delle colonne: sparso, non da sinistra a destra.
const ORDINE = [3, 7, 1, 10, 5, 0, 8, 11, 2, 6, 9, 4]

/**
 * Passaggio tra un capitolo bianco e uno nero: le colonne della griglia si
 * riempiono del colore del capitolo successivo mentre la banda entra nello
 * schermo, in ordine sparso, finché il fondo è cambiato del tutto.
 */
export function Banda({ verso }: { verso: "scuro" | "chiaro" }) {
  return (
    <div aria-hidden className={`banda ${verso === "scuro" ? "chiaro" : "scuro"}`} data-no-stampa>
      {ORDINE.map((ordine, i) => (
        <i
          key={i}
          className={`${verso === "scuro" ? "bg-inchiostro" : "bg-carta"} ${i >= 4 ? "hidden md:block" : ""}`}
          style={{ "--i": ordine } as CSSProperties}
        />
      ))}
    </div>
  )
}
