'use client'
import Button from '@/components/ui/Button'
import { routes } from '@/config/routes'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')

    router.push(routes.login)
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-bold">Todo App</div>
          <Button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
