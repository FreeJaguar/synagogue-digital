import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'לוח מידע דיגיטלי - בית כנסת',
  description: 'מערכת תצוגה דיגיטלית לבית כנסת',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
