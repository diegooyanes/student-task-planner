import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page-heading">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Back to Home</Link>
    </section>
  )
}

export default NotFound
