import { Barra } from "@/components/foglio/barra"
import { Apertura } from "@/components/foglio/apertura"
import { Indice } from "@/components/foglio/indice"
import { ChiSono } from "@/components/foglio/chi-sono"
import { Stack } from "@/components/foglio/stack"
import { Percorso } from "@/components/foglio/percorso"
import { Chiusura } from "@/components/foglio/chiusura"

// Una pagina bianca: la frase con il nome e i tre progetti principali subito,
// poi tutti i progetti, chi sono, lo stack, il percorso; si chiude in nero.
export default function Pagina() {
  return (
    <>
      <Barra />
      <main className="overflow-x-clip">
        <Apertura />
        <Indice />
        <ChiSono />
        <Stack />
        <Percorso />
      </main>
      <Chiusura />
    </>
  )
}
