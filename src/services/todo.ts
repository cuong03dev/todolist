import { http } from '@/lib/axios'

export const todoService = {
  getAlls: () => http.get('todo'),
  addTask: (payload: {
    title: string
    content: string
    deadline: string
    is_finished: boolean
  }) => http.post('todo', payload),
  deleteTask: (id: string) => http.delete(`todo/${id}`),
  editTask: (payload: {
    _id: string
    title: string
    content: string
    deadline: string
    is_finished: boolean
  }) => http.patch(`todo`, payload),
}
