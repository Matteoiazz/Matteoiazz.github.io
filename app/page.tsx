import { Ingresso } from "@/components/bn/ingresso"
import { Barra } from "@/components/bn/barra"
import { Nebbia } from "@/components/bn/nebbia"
import { Apertura } from "@/components/bn/apertura"
import { Evidenza } from "@/components/bn/evidenza"
import { Tabellone } from "@/components/bn/tabellone"
import { Nastro } from "@/components/bn/nastro"
import { Profilo } from "@/components/bn/profilo"
import { Percorso } from "@/components/bn/percorso"
import { Contatti } from "@/components/bn/contatti"

// Un solo fondo scuro: il ritmo lo danno il fiore, il vetro e la nebbia ai
// bordi dello schermo, dove il contenuto che esce si appanna.
export default function Pagina() {
  return (
    <>
      {/* Senza JavaScript niente ingresso e le lettere sono già a fuoco. */}
      <noscript>
        <style>{`[data-ingresso]{display:none!important}.nome .lettera>.vista{opacity:1!important;filter:none!important;transform:none!important}`}</style>
      </noscript>
      <Ingresso />
      <Barra />
      <Nebbia />
      <main className="relative overflow-x-clip">
        <Apertura />
        <Evidenza />
        <Tabellone />
        <Nastro />
        <Profilo />
        <Percorso />
        <Contatti />
      </main>
    </>
  )
}
