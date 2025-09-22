'use client'
import Tasks from '@/components/ui-parts/Tasks'
import TodoInput from '@/components/ui-parts/TodoInput'
import { http } from '@/lib/axios'
import { useEffect } from 'react'

export default function Todo() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get('/todo')
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <TodoInput />
      <Tasks />
    </div>
  )
}
