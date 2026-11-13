import { useState } from 'react'

function TaskForm({ initialTask, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialTask?.title || '')
  const [description, setDescription] = useState(initialTask?.description || '')
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || '')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({ title: title.trim(), description: description.trim(), dueDate })
    if (!initialTask) {
      setTitle('')
      setDescription('')
      setDueDate('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label htmlFor="task-title">Title</label>
      <input id="task-title" value={title} onChange={(event) => setTitle(event.target.value)} required />
      <label htmlFor="task-description">Description</label>
      <textarea id="task-description" value={description} onChange={(event) => setDescription(event.target.value)} />
      <label htmlFor="task-date">Due date</label>
      <input id="task-date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} required />
      <div className="form-actions">
        <button type="submit">{initialTask ? 'Save changes' : 'Add task'}</button>
        {onCancel && <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}

export default TaskForm
