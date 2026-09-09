import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AmbientBackground } from '@/components/ambient-background'
import { Cursor } from '@/components/cursor'
import { ScrollProgress } from '@/components/scroll-progress'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Matteo Iazzolino — Full-Stack Engineer',
  description:
    'Portfolio di Matteo Iazzolino, full-stack engineer di Cosenza. Sistemi backend solidi e interfacce curate, dal database al frontend.',
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
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
      </body>
    </html>
  )
}
