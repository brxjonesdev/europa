import React from 'react'

export default function TopicLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <h1>Topic Layout</h1>
      {children}
    </div>
  )
}
