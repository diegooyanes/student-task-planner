import { useContext } from 'react'
import { TaskContext } from './taskContextValue'

export function useTaskContext() {
  return useContext(TaskContext)
}
