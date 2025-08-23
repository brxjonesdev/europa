import React from 'react';
import ViewSelect from './components/main-tabs';
import TopicDetails from './components/topic-details';
import { getTopicById } from '@/features/knowledge-base/services';

export default async function LearningPage({
  params,
}: {
  params: { topicID: string };
}) {
  const { topicID } = await params;
  const result = await getTopicById(topicID);
  if (!result.ok) {
    throw new Error('Failed to fetch topic details');
  }
  const topic = result.data;
  console.log('Fetched topic:', topic);

  return (
    <main className='container mx-auto p-4 flex-1 flex flex-col'>
      <section className=' border rounded-lg flex-1 flex flex-col md:flex-row'>
        <div className='md:w-4/12 flex flex-col gap-2 p-2'>
          <TopicDetails data={topic} />
        </div>
        <div className='md:w-8/12 flex-1 p-2'>
          <ViewSelect />
        </div>
      </section>
    </main>
  );
}
