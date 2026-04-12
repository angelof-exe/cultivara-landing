import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'

import { Toaster } from 'sonner'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cultivara.it'),
  title: {
    default: 'Quaderno di Campagna Digitale | Cultivara',
    template: '%s | Cultivara — Quaderno di Campagna Digitale',
  },
  description:
    'Quaderno di Campagna digitale conforme al Regolamento UE 2023/564. Registra trattamenti fitosanitari, fertilizzazioni, irrigazioni, operazioni colturali. Magazzino prodotti, costi colturali, 15 controlli automatici.',
  keywords: [
    'quaderno di campagna',
    'quaderno di campagna digitale',
    'quaderno di campagna online',
    'quaderno di campagna elettronico',
    'registro trattamenti fitosanitari',
    'registro trattamenti digitale',
    'registro trattamenti online',
    'QDCA digitale',
    'quaderno campagna AGEA',
    'quaderno campagna SIAN',
    'obbligo quaderno di campagna 2027',
    'agricoltura digitale',
    'registro fitosanitario',
    'software agricoltura',
    'gestione azienda agricola',
    'Regolamento UE 2023/564',
    'D.Lgs. 150/2012',
    'magazzino prodotti fitosanitari',
    'costi colturali',
    'ecoschemi PAC',
    'produzione integrata',
    'export QDCA PDF JSON XML',
    'conformità agricola',
    'Direttiva Nitrati',
    'controllo rame',
  ],
  authors: [{ name: 'Cultivara' }],
  creator: 'Cultivara',
  publisher: 'Cultivara',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Quaderno di Campagna Digitale | Cultivara',
    description:
      'Il quaderno di campagna digitale più semplice d\u2019Italia. 10 sezioni AGEA, 15 controlli automatici, magazzino e costi.',
    type: 'website',
    locale: 'it_IT',
    siteName: 'Cultivara',
    url: 'https://cultivara.it',
    images: [
      {
        url: '/logo.svg',
        alt: 'Cultivara \u2014 Quaderno di Campagna Digitale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quaderno di Campagna Digitale | Cultivara',
    description:
      'Il quaderno di campagna digitale pi\u00f9 semplice d\u2019Italia. Conforme AGEA, SIAN e Regolamento UE 2023/564.',
    images: ['/logo.svg'],
  },
  alternates: {
    canonical: 'https://cultivara.it',
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#4a7a3b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
