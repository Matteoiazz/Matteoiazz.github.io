import type { Metadata, Viewport } from 'next'
import { Archivo, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Cursore } from '@/components/bn/cursore'
import { Lingua } from '@/components/bn/lingua'
import { Comandi } from '@/components/bn/comandi'
import { Segreti } from '@/components/bn/segreti'
import { Luce } from '@/components/luce'

// Archivo variabile (larghezza e peso) per i nomi giganti e i titoli: le
// lettere si allargano sotto il puntatore. Geist per il testo, come nel
// primo sito; Geist Mono solo per i dati.
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo' })
const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const descrizione =
  'Portfolio di Matteo Iazzolino, junior full-stack developer e studente di Informatica all’Università della Calabria, verso la magistrale in AI. Progetti web, mobile, desktop e microservizi.'

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
  colorScheme: 'dark',
  themeColor: '#0b0b0c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${archivo.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Lingua>
          {children}
          <Comandi />
        </Lingua>
        <Cursore />
        <Luce />
        <Segreti />
      </body>
    </html>
  )
}
