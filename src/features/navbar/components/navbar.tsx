'use client';
import AuthButton from '@/features/auth/components/auth-button';
import { createClient } from '@/lib/supabase/client';
import Logo from '@/features/navbar/components/logo';
import UserMenu from '@/features/navbar/components/user-menu';
import Link from 'next/link';
import React from 'react';
import { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
export default function EuropaNavbar() {
  const [user, setUser] = React.useState<User | null | 'signin'>(null);

  React.useEffect(() => {
    async function fetchUser() {
      const supabase = await createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        setUser('signin');
      } else {
        setUser(user);
      }
    }
    fetchUser();
  }, []);
  return (
    <header className='sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4  '>
        <div className='flex h-16 items-center justify-between border-b'>
          {/* Left side */}
          <div className='flex items-center gap-8'>
            {/* Logo */}
            <Link
              href={user ? `/dashboard` : `/`}
              className='flex items-center gap-2 text-primary hover:text-primary/90 transition-colors'
            >
              <Logo />
            </Link>
          </div>

          {/* Right side */}
          <motion.div
            className='flex items-center gap-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='flex items-center gap-2'>
              {user && user !== 'signin' && (
                <div className='flex items-center gap-2'>
                  <UserMenu user={user} onSignOut={() => setUser('signin')} />
                </div>
              )}
              {user === null && null}
              {user === 'signin' && <AuthButton />}
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
