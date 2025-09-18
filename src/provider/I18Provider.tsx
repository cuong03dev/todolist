import { NextIntlClientProvider } from 'next-intl'
import viMessages from '../messages/vi.json'
export default function I18Provider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        <NextIntlClientProvider messages={viMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
