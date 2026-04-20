import type { ReactNode } from 'react'

type StudyLayoutProps = {
  sidebar: ReactNode
  children: ReactNode
}

export function StudyLayout({ sidebar, children }: StudyLayoutProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">{sidebar}</aside>
      <main className="study-area">{children}</main>
    </div>
  )
}
