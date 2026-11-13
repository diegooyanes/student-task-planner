import { useState } from 'react'
import { TaskContext } from './taskContextValue'

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  function addTask(task) {
    setTasks((currentTasks) => [
      ...currentTasks,
      { ...task, id: crypto.randomUUID(), completed: false },
    ])
  }

  function updateTask(taskId, changes) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, ...changes } : task
      )
    )
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}
