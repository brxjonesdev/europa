import { createClient } from '@/lib/supabase/server';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent
} from '@/shared/ui/card';
import React from 'react';
import Avatar from 'boring-avatars';
import LogoutButton from '@/features/auth/components/logout-btn';

export default async function User() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  

  const hour = new Date().getHours();
  let greeting = '';

  switch (true) {
    case hour < 12:
      greeting = 'Good Morning';
      break;
    case hour < 18:
      greeting = 'Good Afternoon';
      break;
    case hour < 21:
      greeting = 'Good Evening';
      break;
    case hour >= 21:
      greeting = 'Good Night';
      break;
    default:
      greeting = 'Hello';
  }

  return (
    <Card className='shadow-none flex-1 px-0 h-full w-full'>
      <CardHeader className='border-b'>
        <CardTitle>{greeting}, {user?.user_metadata.full_name} </CardTitle>
        <CardDescription className='text-[0.65rem] max-w-xs font-mono'>
          <LogoutButton/>
        </CardDescription>
        <CardAction>
          <Avatar
            size={35}
            name={user?.email as string}
            variant='bauhaus'
            colors={['#393d3f', '#fdfdff', '#c6c5b9', '#62929e', '#546a7b']}
            className='hover:cursor-pointer hover:scale-105'
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <section>
          {/* Streaks go here */}
        </section>
        <section>
          {/* Progress on goals goes here */}
        </section>
        <section>
          {/* Milestones go here */}
        </section>
      </CardContent>
    </Card>
  );
}
