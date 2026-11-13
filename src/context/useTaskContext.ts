import { useContext } from 'react'
import { TaskContext } from './taskContextValue'

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('TaskProvider is required.')
  }
  return context
}
