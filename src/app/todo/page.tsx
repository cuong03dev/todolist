import Tasks from '@/components/ui-parts/Tasks'
import TodoInput from '@/components/ui-parts/TodoInput'

export default function Todo() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <TodoInput />
      <Tasks />
    </div>
  )
}
