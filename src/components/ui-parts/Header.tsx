'use client'
import { routes } from '@/config/routes'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import Menu from './Menu'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useLoading } from '@/contexts/LoadingContext'
import Popover from './Popover'
import Avatar from './Avatar'

export default function Header() {
  const router = useRouter()
  const t = useTranslations('Todo')
  const { setLoading } = useLoading()

  const handleLogout = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    setLoading(false)
    router.push(routes.login)
  }
  const user = useCurrentUser()
  const MENU_ITEMS = [
    {
      label: user?.user.email || '',
      onClick: () => {},
      separator: true,
    },
    {
      label: t('logout'),
      onClick: handleLogout,
    },
  ]
  return (
    <>
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold">Todo App</div>
            <Popover
              content={
                <div className="bg-white min-w-[200px] text-gray-700 rounded-lg text-sm shadow-2xl border border-gray-200 z-50">
                  <Menu data={MENU_ITEMS} />
                </div>
              }
            >
              <Avatar character={user?.user.email?.[0]} />
            </Popover>
          </div>
        </div>
      </header>
    </>
  )
}
