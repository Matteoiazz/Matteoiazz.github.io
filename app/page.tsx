import { Ingresso } from "@/components/bn/ingresso"
import { Barra } from "@/components/bn/barra"
import { Apertura } from "@/components/bn/apertura"
import { Banda } from "@/components/bn/banda"
import { Evidenza } from "@/components/bn/evidenza"
import { Tabellone } from "@/components/bn/tabellone"
import { Nastro } from "@/components/bn/nastro"
import { Profilo } from "@/components/bn/profilo"
import { Percorso } from "@/components/bn/percorso"
import { Contatti } from "@/components/bn/contatti"

// Capitoli alternati: bianco, nero, bianco, nero, bianco, nero.
export default function Pagina() {
  return (
    <>
      {/* Senza JavaScript niente ingresso e niente celle: il nome si vede subito. */}
      <noscript>
        <style>{`[data-ingresso]{display:none!important}.celle{display:none!important}`}</style>
      </noscript>
      <Ingresso />
      <Barra />
      <main className="relative overflow-x-clip">
        <Apertura />
        <Banda verso="scuro" />
        <Evidenza />
        <Banda verso="chiaro" />
        <Tabellone />
        <Nastro />
        <Profilo />
        <Banda verso="chiaro" />
        <Percorso />
        <Contatti />
      </main>
    </>
  )
}
