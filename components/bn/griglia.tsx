/**
 * Le colonne della griglia di costruzione, disegnate sul fondo di ogni
 * capitolo: le stesse 12 (4 sul telefono) su cui si allinea il contenuto.
 */
export function Griglia() {
  return (
    <div aria-hidden className="griglia">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className={i >= 4 ? "hidden md:block" : ""} />
      ))}
    </div>
  )
}
