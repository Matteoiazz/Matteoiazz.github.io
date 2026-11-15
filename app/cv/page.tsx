import type { Metadata } from "next"
import { Curriculum } from "@/components/foglio/curriculum"

// Il titolo non ha parole da tradurre: vale in italiano e in inglese.
export const metadata: Metadata = {
  title: "Curriculum vitae · Matteo Iazzolino",
  description:
    "Curriculum di Matteo Iazzolino, Junior Full-Stack Developer e studente di Informatica all'Università della Calabria.",
}

/** La pagina del curriculum: il contenuto, nelle due lingue, è in components/foglio/curriculum.tsx. */
export default function Pagina() {
  return <Curriculum />
}
