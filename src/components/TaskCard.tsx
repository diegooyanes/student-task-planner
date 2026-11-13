import { Link } from 'react-router-dom'
import type { Task } from '../types'

function TaskCard({ task }: { task: Task }) {
  return (
    <article className="task-card">
      <div className="task-card-top">
        <h3>{task.title}</h3>
        <span className={task.completed ? 'status completed' : 'status pending'}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
      <p>Due {task.dueDate}</p>
      <Link to={`/tasks/${task.id}`}>View details</Link>
    </article>
  )
}

export default TaskCard
