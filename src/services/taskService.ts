import { supabase } from './supabase'
import type { Task, TaskInput } from '../types'

interface TaskRow {
  id: string
  user_id: string
  title: string
  description: string
  due_date: string
  completed: boolean
}

function client() {
  if (!supabase) throw new Error('Set up Supabase in .env first.')
  return supabase
}

function toTask(row: TaskRow): Task {
  return { id: row.id, userId: row.user_id, title: row.title,
    description: row.description, dueDate: row.due_date, completed: row.completed }
}

export async function getTasks(userId: string): Promise<Task[]> {
  const { data, error } = await client().from('tasks').select('*').eq('user_id', userId).order('due_date')
  if (error) throw error
  return (data as TaskRow[]).map(toTask)
}

export async function createTask(userId: string, task: TaskInput): Promise<Task> {
  const { data, error } = await client().from('tasks').insert({
    user_id: userId, title: task.title, description: task.description,
    due_date: task.dueDate, completed: false,
  }).select().single()
  if (error) throw error
  return toTask(data as TaskRow)
}

export async function editTask(taskId: string, changes: Partial<TaskInput> & { completed?: boolean }): Promise<Task> {
  const values: Record<string, string | boolean> = {}
  if (changes.title !== undefined) values.title = changes.title
  if (changes.description !== undefined) values.description = changes.description
  if (changes.dueDate !== undefined) values.due_date = changes.dueDate
  if (changes.completed !== undefined) values.completed = changes.completed
  const { data, error } = await client().from('tasks').update(values).eq('id', taskId).select().single()
  if (error) throw error
  return toTask(data as TaskRow)
}

export async function removeTask(taskId: string): Promise<void> {
  const { error } = await client().from('tasks').delete().eq('id', taskId)
  if (error) throw error
}

export async function getAllTasks(): Promise<Task[]> {
  const { data, error } = await client().from('tasks').select('*').order('due_date')
  if (error) throw error
  return (data as TaskRow[]).map(toTask)
}
