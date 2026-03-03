import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Finanzas al Mando | Daniela Giraldo',
  description: 'Método práctico para construir libertad financiera con estrategia y propósito',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Finanzas al Mando | Daniela Giraldo',
    description: 'Método práctico para construir libertad financiera con estrategia y propósito.',
    url: 'https://finanzasalmando.com',
    siteName: 'Finanzas al Mando',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finanzas al Mando | Daniela Giraldo',
    description: 'Asesoría financiera personalizada. Toma el control de tus finanzas.',
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
