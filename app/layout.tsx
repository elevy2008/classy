import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Classy - Student-Teacher Communication Platform',
  description: 'AI-powered office hours scheduling and student-teacher communication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
