import AddTopicButton from '@/features/knowledge-base/components/add-topic-btn';
import { getUserTopics } from '@/features/knowledge-base/services';
import { Topic } from '@/features/knowledge-base/types';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

export default async function KnowledgeBase() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user?.id) {
    redirect('/');
  }
  
  // const result = await getUserTopics(user.id);
  // if(!result.ok) {
  //   redirect('/');
  // }
  // const topics: Topic[] = result.data;

  const topics = []
  return (
    <Card className='shadow-none flex-1 px-0 h-full w-full'>
      <CardHeader className='border-b'>
        <CardTitle>Knowledge Base</CardTitle>
        <CardDescription className='text-xs'>
          Manage your knowledge base and resources.
        </CardDescription>
        <CardAction>
          <AddTopicButton/>
        </CardAction>
      </CardHeader>
      <CardContent className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  w-full bg-white relative'>
       <div
    className="absolute inset-0 z-0"
    style={{
      background: "#ffffff",
      backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
      backgroundSize: "24px 24px",
    }}
  />
        <Suspense fallback={<div>Loading topics...</div>}>
          {topics.map((topic) => (
            <Card key={topic.id} className='z-10 shadow-xs col-span-full'>
              <CardHeader className='text-center space-y-2'>
                <CardTitle className='lg:text-2xl'>{topic.title}</CardTitle>
                <CardDescription className='mb-4 text-center'>
                  {topic.description}
                </CardDescription>
                <CardAction>
                  <Button asChild>
                  <Link href={`/topics/${topic.id}`}>
                    View Topic
                  </Link>
                  </Button>
                </CardAction>
              </CardHeader>
            </Card>
          ))}
          {topics.length === 0 && (
          <Card className='z-10 shadow-xs col-span-full items-center justify-center'>
            <CardContent className='text-center space-y-2'>
              <CardTitle className='lg:text-2xl'>No Topics Yet</CardTitle>
              <CardDescription className='mb-4 text-center'>
                You haven&apos;t added any topics yet. Click the button above to add
                your first topic.
              </CardDescription>
            </CardContent>
          </Card>
        )}
        </Suspense>
      </CardContent>
    </Card>
  );
}


