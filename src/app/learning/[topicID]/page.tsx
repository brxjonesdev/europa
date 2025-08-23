import React from 'react'

export default async function LearningPage({ params }: { params: { topicID: string } }) {
    const {topicID} = await params
  return (
    <main className='container mx-auto p-4 flex-1 flex flex-col'>
      <section className=' border rounded-lg flex-1 flex flex-col md:flex-row'>
        <div className='md:w-4/12'>
        {/* Details */}
        {/* Stats */}
        </div>
        <div className='md:w-8/12 flex-1'>
        {/* Tabs for objectives, resources and notes */}
        </div>

      </section>
    </main>
  )
}
