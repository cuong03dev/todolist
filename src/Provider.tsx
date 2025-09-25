'use client'
import { NextIntlClientProvider } from 'next-intl'
import viMessages from './messages/vi.json'
import { Toaster } from 'sonner'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextIntlClientProvider messages={viMessages} locale="vi">
      <Toaster richColors />
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </NextIntlClientProvider>
  )
}
