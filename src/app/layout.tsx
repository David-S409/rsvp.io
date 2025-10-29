import { AuthProvider } from '@/components/providers/SessionProvider'

export const metadata = {
  title: 'RSVP.io - Event Management',
  description: 'Modern RSVP management for weddings and events',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
