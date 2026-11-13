import { Link } from 'react-router-dom'

function Profile() {
  return (
    <section className="details-panel panel">
      <h1>Demo profile</h1>
      <p>Student Task Planner user</p>
      <p>Your tasks for Rize, Canvas, and other classes are on the Tasks page.</p>
      <Link to="/tasks">Go to Tasks</Link>
    </section>
  )
}

export default Profile
