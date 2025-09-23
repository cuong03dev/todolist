import { todoService } from '@/services/todo'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getAll = createAsyncThunk('todo/getAll', async () => {
  const res = await todoService.getAlls()
  return res.data
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
export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id: string) => {
    const res = await todoService.deleteTask(id)
    return res
  },
)
const initialState: [] = []

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodo.fulfilled, (state, action) => {
      return [...state, action.payload]
    })
    builder.addCase(getAll.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      return state.filter((todo: any) => todo._id !== action.meta.arg)
    })
  },
})

export const {} = todoSlice.actions

export default todoSlice.reducer
