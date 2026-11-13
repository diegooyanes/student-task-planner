import { useState } from 'react'
import type { ReactNode } from 'react'
import { TaskContext } from './taskContextValue'
import type { Task, TaskInput } from '../types'

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])

  function addTask(task: TaskInput) {
    setTasks((currentTasks) => [
      ...currentTasks,
      { ...task, id: crypto.randomUUID(), completed: false },
    ])
  }

  function updateTask(taskId: string, changes: TaskInput) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, ...changes } : task
      )
    )
  }

  function toggleTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function deleteTask(taskId: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}
