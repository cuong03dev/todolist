import { useEffect } from 'react'
import Cookies from 'js-cookie'
import jwtDecode from 'jsonwebtoken'

interface JwtPayload {
  _doc?: {
    username?: string
  }
}

export const useCurrentUser = () => {
  useEffect(() => {
    const token = Cookies.get('accessToken')
    if (token) {
      try {
        const decoded = jwtDecode.decode(token) as JwtPayload
        const email = decoded?._doc?.username ?? null
        if (email) {
          Cookies.set('email', email)
        }
      } catch {}
    }
  }, [])
}
