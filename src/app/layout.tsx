import "@/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { type Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { PostHogProvider } from "./_providers/providers"

export const metadata: Metadata = {
  title: "Drive",
  description: "Drive clone, app",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <PostHogProvider>{children}</PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
