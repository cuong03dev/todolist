import { localeConfig } from '@/config/locale'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  const locale = localeConfig.locale

  // Import all message files for the current locale
  const [common, login, register, todo] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/login.json`),
    import(`../messages/${locale}/register.json`),
    import(`../messages/${locale}/todo.json`),
  ])

  // Merge all messages into a single object
  return {
    locale,
    messages: {
      ...common.default,
      ...login.default,
      ...register.default,
      ...todo.default,
    },
  }
})
