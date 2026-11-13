import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import App from '../App'
import { getPublicHolidays } from '../services/holidayService'

vi.mock('../services/holidayService', () => ({ getPublicHolidays: vi.fn() }))

describe('Student Task Planner', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const nextYear = new Date().getFullYear() + 1
    getPublicHolidays.mockImplementation((year) =>
      Promise.resolve(year === nextYear ? [
        { date: `${nextYear}-01-01`, name: "New Year's Day" },
        { date: `${nextYear}-07-04`, name: 'Independence Day' },
        { date: `${nextYear}-12-25`, name: 'Christmas Day' },
      ] : [])
    )
    window.history.pushState({}, '', '/')
  })

  test('renders the Home page and holidays', async () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Task summary' })).toBeInTheDocument()
    expect(await screen.findByText("New Year's Day")).toBeInTheDocument()
  })

  test('creates, edits, completes, filters, and deletes a task through Context', async () => {
    window.history.pushState({}, '', '/tasks')
    render(<App />)

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Read chapter 4' } })
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'For Rize' } })
    fireEvent.change(screen.getByLabelText('Due date'), { target: { value: '2026-11-20' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add task' }))

    expect(screen.getByText('Read chapter 4')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: 'View details' }))
    expect(screen.getByText('For Rize')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Edit task' }))
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Read chapter 5' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(screen.getByRole('heading', { name: 'Read chapter 5' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Mark completed' }))
    expect(screen.getByText('Completed')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: /Back to Tasks/ }))
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'pending' } })
    expect(screen.queryByText('Read chapter 5')).not.toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'completed' } })
    expect(screen.getByText('Read chapter 5')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'View details' }))
    fireEvent.click(screen.getByRole('button', { name: 'Delete task' }))
    expect(screen.getByText('No tasks to show.')).toBeInTheDocument()
  })

  test('shows an API error and retries successfully', async () => {
    getPublicHolidays.mockRejectedValueOnce(new Error('Network error'))
    render(<App />)
    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load holidays')
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    await waitFor(() => expect(screen.getByText("New Year's Day")).toBeInTheDocument())
  })

  test('shows an empty message when the API returns no upcoming holidays', async () => {
    getPublicHolidays.mockResolvedValue([])
    render(<App />)
    expect(await screen.findByText('No upcoming holidays found.')).toBeInTheDocument()
  })

  test('shows Task not found for an unknown task ID', () => {
    window.history.pushState({}, '', '/tasks/missing')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Task not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to Tasks' })).toBeInTheDocument()
  })

  test('shows the 404 page for an unknown route', () => {
    window.history.pushState({}, '', '/unknown')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to Home' })).toBeInTheDocument()
  })
})
