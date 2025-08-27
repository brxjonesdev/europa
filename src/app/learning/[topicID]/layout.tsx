import React from 'react'
import TopicDetails from './components/topic-details'
import { getTopicById } from '@/features/knowledge-base/services';
import { redirect } from 'next/navigation';
import { Separator } from '@/shared/ui/separator';

export default async function LearningLayout({children, params}: {children: React.ReactNode, params: { topicID: string }}) {
    const { topicID } = await params;
      const result = await getTopicById(topicID);
      if (!result.ok) {
        redirect(`/dashboard`);
      }
      const topic = result.data;
  return (
    <main className='container mx-auto p-4 flex-1 flex flex-col'>
          <section className=' border rounded-lg flex-1 flex flex-col lg:flex-row '>
            <div className='lg:w-4/12 flex flex-col gap-2 p-2'>
              <TopicDetails data={topic} />
            </div>
            <Separator orientation='vertical' className='hidden lg:block' />
            {children}
          </section>
        </main>
  )
}
