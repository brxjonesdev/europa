import { createClient } from '@/lib/supabase/server';
import { Card } from '@/shared/ui/card';
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
  return <Card className='shadow-none flex-1 p-0 h-full w-full'>Gaols</Card>;
}
