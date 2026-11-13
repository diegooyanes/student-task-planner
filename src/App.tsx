import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TaskProvider } from './context/TaskContext'
import Header from './components/Header'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import TaskDetails from './pages/TaskDetails'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Header />
        <main className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:taskId" element={<TaskDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TaskProvider>
  )
}

export default App
