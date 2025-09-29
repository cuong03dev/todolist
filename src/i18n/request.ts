import { getRequestConfig } from 'next-intl/server'
import { getMessages } from '@/utils/messages'
import { getLocale } from '@/utils/locale'

export default getRequestConfig(async () => {
  const locale = getLocale()
  const messages = getMessages()

  return {
    locale,
    messages,
  }
})
