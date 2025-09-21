import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Swadeshi Trails - Discover Incredible India",
  description: "Explore hidden gems, book authentic experiences, and discover the real India with Swadeshi Trails",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
