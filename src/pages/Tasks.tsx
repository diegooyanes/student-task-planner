import { useState } from 'react'
import { useTaskContext } from '../context/useTaskContext'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'

function Tasks() {
  const { tasks, addTask } = useTaskContext()
  const [filter, setFilter] = useState('all')
  const visibleTasks = tasks.filter((task) =>
    filter === 'all' || (filter === 'completed' ? task.completed : !task.completed)
  )

  return (
    <div>
      <div className="page-heading">
        <h1>Tasks</h1>
        <p>Add assignments and keep track of their progress.</p>
      </div>
      <div className="tasks-layout">
        <section className="panel" aria-labelledby="add-task-heading">
          <h2 id="add-task-heading">Add a task</h2>
          <TaskForm onSubmit={addTask} />
        </section>
        <section aria-labelledby="task-list-heading">
          <div className="list-heading">
            <h2 id="task-list-heading">Your tasks</h2>
            <label htmlFor="status-filter">Status</label>
            <select id="status-filter" value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {visibleTasks.length > 0 ? (
            <div className="task-list">{visibleTasks.map((task) => <TaskCard key={task.id} task={task} />)}</div>
          ) : <p>No tasks to show.</p>}
        </section>
      </div>
    </div>
  )
}

export default Tasks
