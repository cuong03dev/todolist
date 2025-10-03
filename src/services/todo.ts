import { API_ROUTES } from '@/config/apiRoutes'
import { http } from '@/lib/axios'

export const todoService = {
  getAlls: (page: number) =>
    http.get(API_ROUTES.TODO.ALL, { params: { page } }),
  addTask: (payload: {
    title: string
    content: string
    deadline: string
    is_finished: boolean
  }) => http.post(API_ROUTES.TODO.ADD_TASK, payload),
  deleteTask: (id: string) =>
    http.delete(`${API_ROUTES.TODO.DELETE_TASK}/${id}`),
  editTask: (payload: {
    _id: string
    title: string
    content: string
    deadline: string
    is_finished: boolean
  }) => http.patch(API_ROUTES.TODO.EDIT_TASK, payload),
}
