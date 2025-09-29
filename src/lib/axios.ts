import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'sonner'
import { routes } from '@/config/routes'
import messages from '@/messages/vi/common.json'

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/'

export const http = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

http.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

const handleTokenRefresh = async (error) => {
  const refreshToken = Cookies.get('refreshToken')
  if (refreshToken) {
    try {
      const res = await axios.post(
        `${baseUrl}user/reissue`,
        { refreshToken },
        { withCredentials: true },
      )

      const newAccessToken = res?.data
      Cookies.set('accessToken', newAccessToken, { expires: 1 / 96 })

      error.config.headers.Authorization = `Bearer ${newAccessToken}`
      return http.request(error.config)
    } catch {
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      window.location.href = routes.login
      return Promise.reject(toast.error(messages.System.errors.session_expired))
    }
  } else {
    window.location.href = routes.login
    return Promise.reject(toast.error(messages.System.errors.unauthorized))
  }
}

const getErrorMessage = (status: number, data: { message?: string }) => {
  switch (status) {
    case 400:
      return data?.message || messages.System.errors.bad_request
    case 403:
      return messages.System.errors.forbidden
    case 404:
      return messages.System.errors.not_found
    case 409:
      return data?.message || messages.System.errors.conflict
    case 422:
      return data?.message || messages.System.errors.invalid_data
    case 500:
    case 501:
    case 502:
    case 503:
      return messages.System.errors.server_error
    default:
      return data?.message || messages.System.errors.unknown_error
  }
}

http.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    if (error.response) {
      const { status, data } = error.response

      if (status === 401) {
        return handleTokenRefresh(error)
      }

      const errorMessage = getErrorMessage(status, data)
      return Promise.reject(toast.error(errorMessage))
    }

    return Promise.reject(toast.error(messages.System.errors.network_error))
  },
)
