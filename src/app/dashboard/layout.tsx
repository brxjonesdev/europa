import React from 'react'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <main className='flex-1 p-4 md:px-10 '>
      {children}
    </main>
  )
}
