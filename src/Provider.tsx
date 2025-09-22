import { NextIntlClientProvider } from 'next-intl'
import viMessages from './messages/vi.json'
import { Toaster } from 'sonner'
export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextIntlClientProvider messages={viMessages}>
      <Toaster richColors />
      {children}
    </NextIntlClientProvider>
  )
}
