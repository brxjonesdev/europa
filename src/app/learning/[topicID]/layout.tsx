import React from 'react'

export default function LearningLayout({children}: {children: React.ReactNode}) {
  return (
    <main className='flex-1 '>
      {children}
    </main>
  )
}
