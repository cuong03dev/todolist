import { todoService } from '@/services/todo'
import type { Todo } from '@/types/todo.types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getAll = createAsyncThunk('todo/getAll', async (page?: number) => {
  const res = await todoService.getAlls(page ?? 1)

  return res
})

export const addTodo = createAsyncThunk(
  'todo/addTodo',
  async (data: {
    title: string
    content: string
    deadline: string
    is_finished: boolean
  }) => {
    const res = await todoService.addTask({
      title: data?.title,
      content: data?.content ?? '',
      deadline: data?.deadline,
      is_finished: data?.is_finished ?? false,
    })
    return res
  },
)

export const editTodo = createAsyncThunk(
  'todo/editTodo',
  async (data: {
    _id: string
    title: string
    content: string
    deadline: string
    is_finished: boolean
  }) => {
    const res = await todoService.editTask({
      _id: data._id,
      title: data?.title,
      content: data?.content ?? '',
      deadline: data?.deadline,
      is_finished: data?.is_finished ?? false,
    })
    return res
  },
)
export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id: string) => {
    const res = await todoService.deleteTask(id)
    return res
  },
)
interface TodoState {
  value: Todo[]
  editingValue: Todo | null
  initialLoading: boolean
  totalPages: number
  currentPage: number
}

const initialState: TodoState = {
  value: [],
  editingValue: null,
  initialLoading: true,
  totalPages: 0,
  currentPage: 1,
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setEditingValue: (state, action) => {
      state.editingValue = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.value.push(action.payload)
    })
    builder.addCase(getAll.pending, (state, action) => {
      state.initialLoading = true
    })

    builder.addCase(getAll.fulfilled, (state, action) => {
      state.value = action.payload.data
      state.totalPages = Math.ceil(action.payload.count / 10)
      state.initialLoading = false
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.value = state.value.filter(
        (todo: any) => todo._id !== action.meta.arg,
      )
    })
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.value = state.value.map((todo: any) =>
        todo._id === action.payload._id ? action.payload : todo,
      )
    })
  },
})

export const { setEditingValue } = todoSlice.actions

export default todoSlice.reducer
