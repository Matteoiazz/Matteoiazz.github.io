"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { contact, projects } from "@/lib/portfolio-data"
import { useLingua } from "@/components/foglio/lingua"
import { avvisa, copia } from "@/components/foglio/comuni"
import { scorrimento } from "@/components/foglio/scorrimento"

type Comando = { id: string; testo: string; gruppo: string; scorciatoia?: string; fai: () => void }

const vai = (destinazione: string) => {
  const bersaglio = destinazione.startsWith("#") ? document.querySelector<HTMLElement>(destinazione) : null
  if (bersaglio) {
    // Con lo scorrimento lento attivo ci arriva lui, alla sua velocità.
    const lento = scorrimento()
    if (lento) lento.scrollTo(bersaglio)
    else bersaglio.scrollIntoView({ behavior: "smooth" })
  } else {
    window.location.href = destinazione.startsWith("#") ? `/${destinazione}` : destinazione
  }
}

/**
 * Menu dei comandi (Ctrl+K o ⌘K, oppure "Menu" in alto): sezioni, progetti,
 * email, curriculum, lingua. Si filtra scrivendo e si usa da tastiera; sul
 * telefono è il menu. Qui vivono anche gli avvisi in basso, aperti con avvisa().
 */
export function Comandi() {
  const { t, cambia } = useLingua()
  const dialogo = useRef<HTMLDialogElement>(null)
  const campo = useRef<HTMLInputElement>(null)
  const [filtro, setFiltro] = useState("")
  const [scelto, setScelto] = useState(0)
  const [avviso, setAvviso] = useState<{ testo: string; n: number } | null>(null)

  const comandi: Comando[] = useMemo(
    () => [
      { id: "storia", gruppo: t("Vai a", "Go to"), testo: t("La storia", "The story"), fai: () => vai("#storia") },
      { id: "percorso", gruppo: t("Vai a", "Go to"), testo: t("Percorso", "Path"), fai: () => vai("#percorso") },
      { id: "progetti", gruppo: t("Vai a", "Go to"), testo: t("Progetti", "Work"), fai: () => vai("#progetti") },
      { id: "stack", gruppo: t("Vai a", "Go to"), testo: "Stack", fai: () => vai("#stack") },
      { id: "in-breve", gruppo: t("Vai a", "Go to"), testo: t("In breve, con il curriculum", "In short, with the résumé"), fai: () => vai("#in-breve") },
      { id: "contatti", gruppo: t("Vai a", "Go to"), testo: t("Contatti", "Contact"), fai: () => vai("#contatti") },
      ...projects.map((p) => ({
        id: `progetto-${p.slug}`,
        gruppo: t("Progetti", "Projects"),
        testo: p.casoStudio ? `${p.title} · ${t("caso di studio", "case study")}` : p.title,
        fai: () => vai(`/progetti/${p.slug}/`),
      })),
      {
        id: "email",
        gruppo: t("Azioni", "Actions"),
        testo: t("Copia l'email", "Copy email"),
        scorciatoia: "E",
        fai: async () => avvisa((await copia(contact.email)) ? t("Email copiata", "Email copied") : contact.email),
      },
      { id: "cv", gruppo: t("Azioni", "Actions"), testo: t("Scarica il curriculum (PDF)", "Download résumé (PDF)"), fai: () => vai("/Matteo_Iazzolino_CV.pdf") },
      { id: "cvpagina", gruppo: t("Azioni", "Actions"), testo: t("Curriculum in pagina", "Résumé page"), fai: () => vai("/cv/") },
      { id: "lingua", gruppo: t("Azioni", "Actions"), testo: t("Switch to English", "Passa all'italiano"), scorciatoia: "L", fai: () => cambia() },
      {
        id: "griglia",
        gruppo: t("Azioni", "Actions"),
        testo: t("Modalità progettista: mostra la griglia", "Designer mode: show the grid"),
        scorciatoia: "G",
        fai: () => document.documentElement.classList.toggle("progettista"),
      },
      { id: "github", gruppo: "Link", testo: "GitHub", fai: () => window.open(contact.github, "_blank", "noopener") },
      { id: "linkedin", gruppo: "Link", testo: "LinkedIn", fai: () => window.open(contact.linkedin, "_blank", "noopener") },
    ],
    [t, cambia],
  )

  const visibili = comandi.filter((c) => `${c.gruppo} ${c.testo}`.toLowerCase().includes(filtro.toLowerCase()))

  const apri = () => {
    setFiltro("")
    setScelto(0)
    if (!dialogo.current?.open) dialogo.current?.showModal()
    // La pagina sotto il menu resta ferma finché il menu è aperto.
    scorrimento()?.stop()
    requestAnimationFrame(() => campo.current?.focus())
  }
  const esegui = (c?: Comando) => {
    if (!c) return
    dialogo.current?.close()
    c.fai()
  }

  useEffect(() => {
    const tasto = (e: KeyboardEvent) => {
      const scrivendo = e.target instanceof HTMLElement && /input|textarea/i.test(e.target.tagName)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (dialogo.current?.open) dialogo.current.close()
        else apri()
        return
      }
      if (scrivendo || e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === "?") apri()
      // Scorciatoie a una lettera, fuori dal menu.
      if (!dialogo.current?.open) {
        const c = comandi.find((x) => x.scorciatoia?.toLowerCase() === e.key.toLowerCase())
        if (c) c.fai()
      }
    }
    const daFuori = () => apri()
    const nuovoAvviso = (e: Event) =>
      setAvviso((prima) => ({ testo: (e as CustomEvent<string>).detail, n: (prima?.n ?? 0) + 1 }))
    window.addEventListener("keydown", tasto)
    window.addEventListener("mi-comandi", daFuori)
    window.addEventListener("mi-avviso", nuovoAvviso)
    return () => {
      window.removeEventListener("keydown", tasto)
      window.removeEventListener("mi-comandi", daFuori)
      window.removeEventListener("mi-avviso", nuovoAvviso)
    }
  }, [comandi])

  let gruppoPrima = ""
  return (
    <>
      <dialog
        ref={dialogo}
        aria-label={t("Menu dei comandi", "Command menu")}
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        onClose={() => scorrimento()?.start()}
        className="menu-comandi"
        data-lenis-prevent
      >
        <div className="flex items-center gap-3 border-b border-riga px-5 py-4">
          <input
            ref={campo}
            value={filtro}
            onChange={(e) => {
              setFiltro(e.target.value)
              setScelto(0)
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setScelto((s) => Math.min(s + 1, visibili.length - 1))
              } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setScelto((s) => Math.max(s - 1, 0))
              } else if (e.key === "Enter") {
                e.preventDefault()
                esegui(visibili[scelto])
              }
            }}
            placeholder={t("Cerca una sezione, un progetto, un'azione…", "Search a section, a project, an action…")}
            aria-label={t("Cerca nel menu", "Search the menu")}
            className="w-full bg-transparent text-lg outline-none placeholder:text-grigio"
          />
          <kbd className="shrink-0 rounded-md px-1.5 py-0.5 font-sans text-xs text-grigio shadow-[inset_0_0_0_1px_var(--riga-forte)]">Esc</kbd>
        </div>
        <ul role="listbox" aria-label={t("Comandi", "Commands")} className="max-h-[56vh] overflow-y-auto py-2">
          {visibili.length === 0 ? (
            <li className="px-5 py-6 text-grigio">{t("Niente con queste parole. Prova con «progetti» o «email».", "Nothing matches. Try “work” or “email”.")}</li>
          ) : null}
          {visibili.map((c, i) => {
            const intestazione = c.gruppo !== gruppoPrima
            gruppoPrima = c.gruppo
            return (
              <li key={c.id} role="option" aria-selected={i === scelto}>
                {intestazione ? <p className="px-5 pb-1 pt-3 text-xs font-medium text-grigio">{c.gruppo}</p> : null}
                <button
                  type="button"
                  onPointerEnter={() => setScelto(i)}
                  onClick={() => esegui(c)}
                  className={`flex w-full items-center justify-between px-5 py-2.5 text-left transition-colors ${i === scelto ? "bg-palco" : ""}`}
                >
                  {c.testo}
                  {c.scorciatoia ? <kbd className="font-sans text-xs text-grigio">{c.scorciatoia}</kbd> : null}
                </button>
              </li>
            )
          })}
        </ul>
        <p className="flex flex-wrap gap-x-4 gap-y-1 border-t border-riga px-5 py-3 text-xs text-grigio">
          <span>↑ ↓ {t("scegli", "move")}</span>
          <span>{t("Invio apre", "Enter opens")}</span>
          <span>E {t("copia l'email", "copies the email")}</span>
          <span>L {t("lingua", "language")}</span>
        </p>
      </dialog>

      {avviso ? (
        <div key={avviso.n} role="status" className="pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2" data-no-stampa>
          <p
            className="rounded-full bg-[#0a0a0a] px-5 py-3 text-sm font-medium text-white shadow-[0_12px_30px_-12px_rgb(0_0_0/0.5)]"
            style={{ animation: "avviso 2.6s cubic-bezier(0.16, 1, 0.3, 1) both" }}
          >
            {avviso.testo}
          </p>
        </div>
      ) : null}
    </>
  )
}
