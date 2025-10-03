import { API_ROUTES } from '@/config/apiRoutes'
import { http } from '@/lib/axios'
// type LoginPayload = {
//   username: string
//   password: string
// }
export const authService = {
  // login: (payload: LoginPayload) => http.post('user/sign-in', payload),
  register: (payload: { username: string; password: string }) =>
    http.post(API_ROUTES.AUTH.REGISTER, payload),
}
