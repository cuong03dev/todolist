import common from '../messages/vi/common.json'
import login from '../messages/vi/login.json'
import register from '../messages/vi/register.json'
import todo from '../messages/vi/todo.json'

export function getMessages() {
  return {
    ...common,
    ...login,
    ...register,
    ...todo,
  }
}
