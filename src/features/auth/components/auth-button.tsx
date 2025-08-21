'use client';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/shared/ui/button';
import React from 'react';

export default function AuthButton() {
  const supabase = createClient();
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          prompt: 'consent',
          access_type: 'offline',
        },
        redirectTo: `${window.location.origin}/api/callback`,
      },
    });
  };

  return (
    <Button variant='outline' className='shadow-none' onClick={handleSignIn}>
      Login into Europa
    </Button>
  );
}
