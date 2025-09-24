import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'sonner'
import { routes } from '@/config/routes'
import messages from '@/messages/vi.json'

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

http.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    if (error.response) {
      const { status, data } = error.response
      let errorMessage = data?.message
      switch (status) {
        case 400:
          errorMessage = data?.message || messages.System.errors.bad_request
          break
        case 401:
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
              return Promise.reject(
                toast.error(messages.System.errors.session_expired),
              )
            }
          } else {
            window.location.href = routes.login
            return Promise.reject(
              toast.error(messages.System.errors.unauthorized),
            )
          }
        case 403:
          errorMessage = messages.System.errors.forbidden
          break
        case 404:
          errorMessage = messages.System.errors.not_found
          break
        case 409:
          errorMessage = data?.message || messages.System.errors.conflict
          break
        case 422:
          errorMessage = data?.message || messages.System.errors.invalid_data
          break
        case 500:
        case 501:
        case 502:
        case 503:
          errorMessage = messages.System.errors.server_error
          break
        default:
          errorMessage = data?.message || messages.System.errors.unknown_error
      }

      return Promise.reject(toast.error(errorMessage))
    }

    return Promise.reject(toast.error(messages.System.errors.network_error))
  },
)
