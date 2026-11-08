import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Mona_Sans } from 'next/font/google'
import './globals.css'
import { Lingua } from '@/components/foglio/lingua'
import { Segreti } from '@/components/foglio/segreti'
import { Comandi } from '@/components/foglio/comandi'
import { Etichetta } from '@/components/foglio/etichetta'

// Un solo carattere per tutto il sito: Mona Sans, quello di GitHub, dove vive
// il codice dei progetti. Variabile anche in larghezza: serve al nome in fondo
// e ai titoli dell'indice. Geist Mono resta solo per il codice.
const mona = Mona_Sans({ subsets: ['latin'], axes: ['wdth'], variable: '--font-mona', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const descrizione =
  'Portfolio di Matteo Iazzolino, junior full-stack developer e studente di Informatica all’Università della Calabria, con la magistrale in AI. Progetti web, mobile, desktop e microservizi, con il codice vero.'

export const metadata: Metadata = {
  metadataBase: new URL('https://matteoiazz.vercel.app'),
  title: 'Matteo Iazzolino — Junior Full-Stack Developer',
  description: descrizione,
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://matteoiazz.vercel.app',
    siteName: 'Matteo Iazzolino',
    title: 'Matteo Iazzolino — Junior Full-Stack Developer',
    description: descrizione,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matteo Iazzolino — Junior Full-Stack Developer',
    description: descrizione,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${mona.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Lingua>
          {children}
          <Comandi />
        </Lingua>
        <Etichetta />
        <Segreti />
        {/* Modalità progettista (codice Konami o tasto G): la griglia a 12 colonne. */}
        <div className="griglia-progettista" aria-hidden>
          <div className="contenitore grid h-full grid-cols-4 gap-x-[var(--passo)] md:grid-cols-12">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className={i >= 4 ? 'hidden md:block' : ''} />
            ))}
          </div>
        </div>
      </body>
    </html>
  )
}
