import React from 'react'

export function Layout({ children }: { children: React.ReactNode }) {
  return <div className='relative max-w-2xl mx-auto py-8 px-4'>{children}</div>
}

export default Layout
