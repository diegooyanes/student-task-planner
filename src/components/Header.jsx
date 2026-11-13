import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <NavLink className="brand" to="/">Student Task Planner</NavLink>
        <nav aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/tasks">Tasks</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
