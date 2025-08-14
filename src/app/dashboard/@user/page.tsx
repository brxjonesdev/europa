import { createClient } from '@/lib/supabase/server';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { redirect } from 'next/navigation';
import React from 'react';
import Avatar from 'boring-avatars';

export default async function User() {
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
      <CardHeader>
        <CardTitle>Good Evening, Weiss Velvenhart.</CardTitle>
        <CardDescription className='text-xs max-w-sm font-mono'>
          “To educate myself, I had to understand everything. Starting with
          myself.” — Marjane Satrapi
        </CardDescription>
        <CardAction>
          <Avatar
            size={30}
            name={user.email as string}
            variant='bauhaus'
            colors={['#393d3f', '#fdfdff', '#c6c5b9', '#62929e', '#546a7b']}
            className='hover:cursor-pointer hover:scale-105'
          />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
