"use client"
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/shared/ui/button'
import React from 'react'

export default function AuthButton() {
    const supabase = createClient();
    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                redirectTo: `${window.location.origin}/dashboard`,
            },
            
        })
    }

    return (
        <Button variant='outline' className='shadow-none' onClick={handleSignIn}>
            Login into Europa
        </Button>
    )
}

