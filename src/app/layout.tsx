import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: 'WordSearch.diy - AI Word Search Generator Tool',
  description: 'Generate custom word search puzzles using AI. Choose your category, complexity, and download as PDF.',
  metadataBase: new URL('https://wordsearch.diy'),
  twitter: {
    card: 'summary_large_image',
    title: 'WordSearch.diy - AI Word Search Generator Tool',
    description: 'Generate custom word search puzzles using AI. Choose your category, complexity, and download as PDF.',
    images: '/images/wordsearch-diy-share-image.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* place background here if needed*/}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
