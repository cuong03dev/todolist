import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import jwtDecode from 'jsonwebtoken'

interface JwtPayload {
  _doc?: {
    username?: string
  }
}

interface User {
  email: string | null
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<User>({ email: null })
  useEffect(() => {
    const token = Cookies.get('accessToken')
    if (token) {
      try {
        const decoded = jwtDecode.decode(token) as JwtPayload
        setUser({ email: decoded?._doc?.username ?? null })
      } catch {
        setUser({ email: null })
      }
    }
  }, [])

  return { user }
}
