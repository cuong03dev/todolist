import { NextIntlClientProvider } from 'next-intl'
import viMessages from './messages/vi.json'
export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextIntlClientProvider messages={viMessages}>
      {children}
    </NextIntlClientProvider>
  )
}
