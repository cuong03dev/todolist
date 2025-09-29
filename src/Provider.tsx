'use client'
import { NextIntlClientProvider } from 'next-intl'
import commonMessages from './messages/vi/common.json'
import loginMessages from './messages/vi/login.json'
import registerMessages from './messages/vi/register.json'
import todoMessages from './messages/vi/todo.json'
import { Toaster } from 'sonner'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = {
    ...commonMessages,
    ...loginMessages,
    ...registerMessages,
    ...todoMessages,
  }

  return (
    <NextIntlClientProvider messages={messages} locale="vi">
      <Toaster richColors />
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </NextIntlClientProvider>
  )
}
