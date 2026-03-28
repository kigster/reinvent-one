import Script from 'next/script'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title:
    'ReinventONE — Applied AI & AI-First Engineering, ' +
    'Scalable Infrastructure, DevOps, Cloud Cost Optimization',
  description:
    'ReinventONE helps companies scale and integrate AI into their products and workflows. AI strategy, LLM integration, AI-powered product development, scalability, high-availability, fault-tolerance, infrastructure as code, DevOps, Cloud Cost optimization, PostgreSQL tuning, observability, and more.',
  keywords: [
    'AI strategy',
    'LLM integration',
    'AI-powered product development',
    'Scalability',
    'High-Availability',
    'Fault-Tolerance',
    'Infrastructure as Code',
    'DevOps',
    'Cloud Cost Optimization',
    'PostgreSQL tuning',
    'Observability'
  ],
  icons: {
    icon: '/images/re1/favicon/favicon-32x32.png',
    apple: '/images/re1/favicon/apple-icon-180x180.png'
  }
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Abel&family=Open+Sans:wght@300;400;600;700&family=Teko:wght@300;400;500;600;700&display=swap'
        />
      </head>
      <body className='bg-brand-dark text-white antialiased'>
        {children}

        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-SBSJZBV4E9'
          strategy='afterInteractive'
        />
        <Script id='ga-init' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SBSJZBV4E9');
          `}
        </Script>
      </body>
    </html>
  )
}
