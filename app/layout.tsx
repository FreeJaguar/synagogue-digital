import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
