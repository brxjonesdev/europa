"use client"
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/shared/ui/button'
import { redirect } from 'next/navigation';
import React from 'react'

export default function LogoutButton({text}: {text?: string}) {
  const handleLogout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/');
  }
  return (
    <Button 
    className='p-0 m-0 text-xs font-mono shadow-none h-fit hover:underline hover:bg-transparent hover:cursor-pointer'
    variant={"ghost"} 
    onClick={handleLogout}>
      {text || "Logout"}
    </Button>
  )
}
