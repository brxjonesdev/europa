import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/')
  }
  return (
    <div>Dashboard</div>
  )
}
