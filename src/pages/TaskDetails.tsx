import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTaskContext } from '../context/useTaskContext'
import TaskForm from '../components/TaskForm'
import type { TaskInput } from '../types'

function TaskDetails() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { tasks, updateTask, toggleTask, deleteTask } = useTaskContext()
  const [editing, setEditing] = useState(false)
  const task = tasks.find((item) => item.id === taskId)

  if (!task) {
    return <div className="page-heading"><h1>Task not found</h1><Link to="/tasks">Back to Tasks</Link></div>
  }
  const selectedTaskId = task.id

  function saveTask(changes: TaskInput) {
    updateTask(selectedTaskId, changes)
    setEditing(false)
  }

  function removeTask() {
    deleteTask(selectedTaskId)
    navigate('/tasks')
  }

  return (
    <section className="details-panel panel">
      <Link to="/tasks">← Back to Tasks</Link>
      <h1>{task.title}</h1>
      {editing ? (
        <TaskForm initialTask={task} onSubmit={saveTask} onCancel={() => setEditing(false)} />
      ) : (
        <>
          <p>{task.description || 'No description.'}</p>
          <p><strong>Due date:</strong> {task.dueDate}</p>
          <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</p>
          <div className="form-actions">
            <button type="button" onClick={() => setEditing(true)}>Edit task</button>
            <button type="button" onClick={() => toggleTask(selectedTaskId)}>
              {task.completed ? 'Mark pending' : 'Mark completed'}
            </button>
            <button type="button" className="danger-button" onClick={removeTask}>Delete task</button>
          </div>
        </>
      )}
    </section>
  )
}

export default TaskDetails
