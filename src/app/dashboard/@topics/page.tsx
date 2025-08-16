import AddTopicButton from '@/features/topics/components/add-topic-btn';
import AddGoalButton from '@/features/topics/components/add-topic-btn';
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
import { PlusCircle } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function KnowledgeBase() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/');
  }
  const goals = []
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
        {goals.length === 0 && (
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
      </CardContent>
    </Card>
  );
}


