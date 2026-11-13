import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTaskContext } from '../context/useTaskContext'
import TaskCard from '../components/TaskCard'
import { getPublicHolidays } from '../services/holidayService'
import type { Holiday } from '../types'

function Home() {
  const { tasks } = useTaskContext()
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    async function loadHolidays() {
      setLoading(true)
      setError('')
      try {
        const today = new Date().toISOString().slice(0, 10)
        const year = new Date().getFullYear()
        const currentYear = await getPublicHolidays(year)
        let upcoming = currentYear.filter((holiday) => holiday.date >= today)
        if (upcoming.length < 3) {
          const nextYear = await getPublicHolidays(year + 1)
          upcoming = [...upcoming, ...nextYear]
        }
        setHolidays(upcoming.slice(0, 3))
      } catch {
        setError('Unable to load holidays. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    loadHolidays()
  }, [retryCount])

  const completedCount = tasks.filter((task) => task.completed).length
  const upcomingTasks = tasks
    .filter((task) => !task.completed && task.dueDate >= new Date().toISOString().slice(0, 10))
    .sort((first, second) => first.dueDate.localeCompare(second.dueDate))
    .slice(0, 3)

  return (
    <div>
      <section className="page-heading">
        <h1>Stay on top of your classes</h1>
        <p>Keep tasks from Rize, Canvas, and your other classes in one place.</p>
        <Link className="button-link" to="/tasks">Manage tasks</Link>
      </section>
      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading">Task summary</h2>
        <div className="summary-grid">
          <div className="panel"><strong>{tasks.length}</strong><span>Total tasks</span></div>
          <div className="panel"><strong>{tasks.length - completedCount}</strong><span>Pending</span></div>
          <div className="panel"><strong>{completedCount}</strong><span>Completed</span></div>
        </div>
      </section>
      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading">Upcoming deadlines</h2>
        {upcomingTasks.length > 0 ? (
          <div className="task-list">{upcomingTasks.map((task) => <TaskCard key={task.id} task={task} />)}</div>
        ) : <p>No upcoming tasks. Add one from the Tasks page.</p>}
      </section>
      <section aria-labelledby="holidays-heading">
        <h2 id="holidays-heading">Upcoming U.S. holidays</h2>
        {loading ? <p>Loading holidays...</p> : error ? (
          <div role="alert">
            <p>{error}</p>
            <button type="button" onClick={() => setRetryCount((count) => count + 1)}>Retry</button>
          </div>
        ) : holidays.length > 0 ? (
          <ul className="holiday-list">
            {holidays.map((holiday) => (
              <li className="panel" key={holiday.date + holiday.name}>
                <strong>{holiday.name}</strong><span>{holiday.date}</span>
              </li>
            ))}
          </ul>
        ) : <p>No upcoming holidays found.</p>}
      </section>
    </div>
  )
}

export default Home
