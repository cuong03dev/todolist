import { NextIntlClientProvider } from 'next-intl'
import viMessages from './messages/vi.json'
import { Toaster } from 'sonner'
import { store } from './store'
import { Provider as ReduxProvider } from 'react-redux'
export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextIntlClientProvider messages={viMessages}>
      <Toaster richColors />
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </NextIntlClientProvider>
  )
}
