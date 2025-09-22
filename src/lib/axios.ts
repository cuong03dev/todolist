import Cookies from 'js-cookie'
import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/'

export const http = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
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
  (err) => {
    throw new Error(err)
  },
)

http.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = Cookies.get('refreshToken')

      if (refreshToken) {
        console.log(refreshToken)
        console.log(`${baseUrl}user/reissue`)

        try {
          const res = await axios.post(
            `${baseUrl}user/reissue`,
            {
              refreshToken: Cookies.get('refreshToken'),
            },
            {
              withCredentials: true,
            },
          )
          console.log(res)
          const newAccessToken = res?.data
          Cookies.set('accessToken', newAccessToken, { expires: 1 / 96 })

          console.log(newAccessToken)

          error.config.headers.Authorization = `Bearer ${newAccessToken}`
          return http.request(error.config)
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError)
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      } else {
        console.error('Unauthorized, logging out...')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)
