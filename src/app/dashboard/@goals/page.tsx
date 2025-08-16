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

export default async function Goals() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/');
  }
  return (
    <Card className='shadow-none flex-1 px-0 h-full w-full'>
      <CardHeader className='border-b'>
        <CardTitle>Goals</CardTitle>
        <CardDescription className='text-xs'>
          Manage your goals and objectives.
        </CardDescription>
        <CardAction>
          <Button>
            <PlusCircle />
            Add Goal
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        
      </CardContent>
    </Card>
  );
}
