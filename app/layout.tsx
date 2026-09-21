import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AmbientBackground } from '@/components/ambient-background'
import { Cursor } from '@/components/cursor'
import { Luce } from '@/components/luce'
import { ScrollProgress } from '@/components/scroll-progress'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const descrizione =
  'Portfolio di Matteo Iazzolino, software engineer e studente di Informatica all’Università della Calabria. Progetti web, mobile e architetture enterprise.'

export const metadata: Metadata = {
  // Serve a rendere assoluti gli URL delle anteprime: senza, i link condivisi
  // su WhatsApp o LinkedIn non mostrano l'immagine.
  metadataBase: new URL('https://matteoiazz.vercel.app'),
  title: 'Matteo Iazzolino — Software Engineer',
  description: descrizione,
  // Monogramma "MI": prima c'era ancora il logo del template v0.
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
    title: 'Matteo Iazzolino — Software Engineer',
    description: descrizione,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matteo Iazzolino — Software Engineer',
    description: descrizione,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f0f0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      className={`dark scroll-smooth bg-background ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased font-sans">
        <AmbientBackground />
        <ScrollProgress />
        {children}
        <Cursor />
        <Luce />
      </body>
    </html>
  )
}
