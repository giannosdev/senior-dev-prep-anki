import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { StudyLayout } from './StudyLayout'

function StudyLayoutHarness() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setSidebarOpen(true)}>
        Open filters
      </button>
      <StudyLayout
        sidebarOpen={sidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
        sidebar={<div>Sidebar body</div>}
      >
        <div>Study area</div>
      </StudyLayout>
    </>
  )
}

describe('StudyLayout', () => {
  it('opens and closes the drawer overlay state', () => {
    render(<StudyLayoutHarness />)

    fireEvent.click(screen.getByRole('button', { name: 'Open filters' }))
    expect(screen.getByTestId('sidebar-overlay')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('sidebar-overlay'))
    expect(screen.queryByTestId('sidebar-overlay')).not.toBeInTheDocument()
  })
})
