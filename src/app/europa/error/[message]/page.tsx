import React from 'react'

export default function page({ params }: { params: { message: string } }) {
  return (
    <div>{params.message}</div>
  )
}
