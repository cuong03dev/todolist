import Cookies from 'js-cookie'
import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'sonner'
import { routes } from '@/config/routes'
import messages from '@/messages/vi/common.json'

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/'
const baseUrlServer = process.env.NEXT_PUBLIC_API_URL_SERVER || 'http://localhost:3000/'
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

const createAxiosInstance = (isServer: boolean = false, isServerUrl: boolean = false): AxiosInstance => {
  const instance = axios.create({
    baseURL: isServerUrl ? baseUrlServer : baseUrl,
    headers: { 'Content-Type': 'application/json' },
    ...(isServer ? { timeout: 10000 } : { withCredentials: true }),
  })

  instance.interceptors.request.use(
    (config) => {
      if (!isServer && typeof window !== 'undefined') {
        const token = Cookies.get('accessToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  if (isServer) {
    instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const { status, data } = error.response
          const errorMessage = getErrorMessage(status, data as { message?: string })
          
          return Promise.reject({
            status,
            message: errorMessage,
            data,
          })
        } else if (error.request) {
          return Promise.reject({
            status: 500,
            message: messages.System.errors.network_error,
          })
        } else {
          return Promise.reject({
            status: 500,
            message: messages.System.errors.unknown_error,
          })
        }
      },
    )
  } else {
    const handleTokenRefresh = async (error: AxiosError) => {
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

          if (error.config) {
            error.config.headers.Authorization = `Bearer ${newAccessToken}`
            return instance.request(error.config)
          }
          return Promise.reject(error)
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

    instance.interceptors.response.use(
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
  }

  return instance
}

export const http = createAxiosInstance(false, false) // Client-side
export const httpServer = createAxiosInstance(true, false) // Server-side
export const httpServerUrl = createAxiosInstance(true, true) // Server-side

export default http
