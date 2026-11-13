import { createContext } from 'react'
import type { Task, TaskInput } from '../types'

export interface TaskContextValue {
  tasks: Task[]
  addTask: (task: TaskInput) => void
  updateTask: (taskId: string, changes: TaskInput) => void
  toggleTask: (taskId: string) => void
  deleteTask: (taskId: string) => void
}

export const TaskContext = createContext<TaskContextValue | null>(null)
