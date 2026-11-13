export interface TaskInput {
  title: string
  description: string
  dueDate: string
}

export interface Task extends TaskInput {
  id: string
  completed: boolean
}

export interface Holiday {
  date: string
  name: string
}
