'use client'
import { NextIntlClientProvider } from 'next-intl'
import { Toaster } from 'sonner'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { getMessages } from './utils/messages'
import { getLocale } from './utils/locale'
import Loading from './components/ui-parts/Loading'
import { Suspense } from 'react'
import LoadingProvider from './contexts/LoadingContext'
export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = getMessages()
  const locale = getLocale()
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Toaster richColors />
      <ReduxProvider store={store}>
        <LoadingProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </LoadingProvider>
      </ReduxProvider>
    </NextIntlClientProvider>
  )
}
