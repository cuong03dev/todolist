'use client'
import { routes } from '@/config/routes'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import LoadingOverlay from './LoadingOverlay'

import {
  useFloating,
  useHover,
  FloatingPortal,
  safePolygon,
} from '@floating-ui/react'
import Menu from './Menu'
import Button from '../ui/Button'
import { LogoutIcon } from '../ui/Icon'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export default function Header() {
  const router = useRouter()
  const t = useTranslations('Todo')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen, // Tự động gọi setIsOpen(true/false) khi cần
  })
  // context chứa thông tin về vị trí, trạng thái, lifecycle của tooltip
  useHover(context, {
    handleClose: safePolygon(),
  })

  const handleLogout = () => {
    setIsLoading(true)
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')

    router.push(routes.login)
  }
  const user = useCurrentUser()
  const MENU_ITEMS = [
    {
      label: user?.user.email || '',
      onClick: () => {},
    },
    {
      label: t('logout'),
      onClick: handleLogout,
    },
  ]
  return (
    <>
      <LoadingOverlay isLoading={isLoading} message={t('loading')} />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold">Todo App</div>
            <Button
              ref={refs.setReference}
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 font-medium rounded-lg text-sm px-2 py-2 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              <LogoutIcon />
            </Button>

            {isOpen && (
              <FloatingPortal>
                <div
                  ref={refs.setFloating}
                  style={floatingStyles}
                  className="bg-white min-w-[200px] text-gray-700 rounded-lg text-sm shadow-2xl border border-gray-200 z-50"
                >
                  <Menu data={MENU_ITEMS} />
                </div>
              </FloatingPortal>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
