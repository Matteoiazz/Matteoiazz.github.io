import { Barra } from "@/components/foglio/barra"
import { Apertura } from "@/components/foglio/apertura"
import { Prologo } from "@/components/foglio/prologo"
import { Capitoli } from "@/components/foglio/capitoli"
import { Binario } from "@/components/foglio/binario"
import { Stack } from "@/components/foglio/stack"
import { InBreve } from "@/components/foglio/in-breve"
import { Chiusura } from "@/components/foglio/chiusura"

// La casa come una storia da scorrere: la frase con il nome e i tre progetti
// principali, poi il prologo che si accende parola per parola, i capitoli che
// costruiscono gli strati dal database all'AI, i progetti che scorrono di lato,
// gli strumenti, il riassunto; si chiude in nero.
export default function Pagina() {
  return (
    <>
      <Barra />
      <main className="overflow-x-clip">
        <Apertura />
        <Prologo />
        <Capitoli />
        <Binario />
        <Stack />
        <InBreve />
      </main>
      <Chiusura />
    </>
  )
}
