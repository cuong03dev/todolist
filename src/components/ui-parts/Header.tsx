'use client'
import Button from '@/components/ui/Button'
import { routes } from '@/config/routes'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import LoadingOverlay from './LoadingOverlay'

export default function Header() {
  const router = useRouter()
  const t = useTranslations('Todo')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    setIsLoading(true)
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')

    router.push(routes.login)
  }

  return (
    <>
      <LoadingOverlay isLoading={isLoading} message={t('loading')} />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold">Todo App</div>
            <Button
              onClick={handleLogout}
              disabled={isLoading}
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {t('logout')}
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
