import { localeConfig } from '@/config/locale'

export const convertTime = (time: string) => {
  const date = new Date(time)
  return date.toLocaleDateString(localeConfig.localeRegion, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
