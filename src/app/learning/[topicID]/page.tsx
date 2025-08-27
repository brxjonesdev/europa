import React from 'react';
import { getTopicById } from '@/features/knowledge-base/services';
import { redirect } from 'next/navigation';
import MultiCard from './components/tabs/multi-card';


export default async function LearningPage({
  params,
}: {
  params: { topicID: string };
}) {
  const { topicID } = await params;
  const result = await getTopicById(topicID);
  if (!result.ok) {
    redirect(`/dashboard`);
  }
  const topic = result.data;

  return (
    <div className='lg:w-8/12 flex-1 p-2 flex flex-col gap-4'>
      <div className='border-b w-full pb-2 flex gap-2'>
        <p className='font-sans text-xl font-semibold'>Learning Objectives</p>
      </div>
      <MultiCard
                  type='objectives'
                  content={topic.objectives ?? []}
                  id={topic.id}
                />
    </div>
  );
}
