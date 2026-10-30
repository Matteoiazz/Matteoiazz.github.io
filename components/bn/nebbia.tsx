/**
 * Il vetro che si appanna: due lastre fisse ai bordi dello schermo con una
 * sfocatura progressiva (tre livelli sovrapposti, globals.css). Il
 * contenuto che sale sotto la barra si appanna per gradi; in basso entra
 * da una nebbia più leggera. Niente animazioni: lo fa lo scorrimento.
 */
export function Nebbia() {
  return (
    <>
      <div aria-hidden className="nebbia nebbia-su" data-no-stampa>
        <i />
        <i />
        <i />
      </div>
      <div aria-hidden className="nebbia nebbia-giu" data-no-stampa>
        <i />
        <i />
      </div>
    </>
  )
}
