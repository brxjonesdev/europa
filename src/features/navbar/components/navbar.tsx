import AuthButton from '@/features/auth/components/auth-button';
import { createClient } from '@/lib/supabase/server';
import Logo from '@/features/navbar/components/logo';
import UserMenu from '@/features/navbar/components/user-menu';
import Link from 'next/link';

export default async function EuropaNavbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
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
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              {user ? (
                <div className='flex items-center gap-2'>
                  <UserMenu user={user} />
                </div>
              ) : (
                <AuthButton />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
