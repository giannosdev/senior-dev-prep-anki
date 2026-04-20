import { useEffect, type ReactNode } from 'react'

type StudyLayoutProps = {
  sidebar: ReactNode
  sidebarOpen: boolean
  onSidebarClose: () => void
  children: ReactNode
}

export function StudyLayout({ sidebar, sidebarOpen, onSidebarClose, children }: StudyLayoutProps) {
  useEffect(() => {
    if (!sidebarOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onSidebarClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onSidebarClose, sidebarOpen])

  return (
    <div className={`app-shell ${sidebarOpen ? 'sidebar-open' : ''}`} data-sidebar-open={sidebarOpen ? 'true' : 'false'}>
      {sidebarOpen ? (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close filters overlay"
          data-testid="sidebar-overlay"
          onClick={onSidebarClose}
        />
      ) : null}
      <aside className="sidebar" id="study-sidebar">
        <div className="sidebar-mobile-bar">
          <strong>Filters</strong>
          <button type="button" className="ghost sidebar-close" onClick={onSidebarClose}>
            Close
          </button>
        </div>
        {sidebar}
      </aside>
      <main className="study-area">{children}</main>
    </div>
  )
}
