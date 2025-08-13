import AuthButton from '@/features/auth/components/auth-button';
import { createClient } from '@/lib/supabase/server';
import InfoMenu from '@/features/navbar/components/info-menu';
import Logo from '@/features/navbar/components/logo';
import UserMenu from '@/features/navbar/components/user-menu';
import { redirect } from 'next/navigation';


export default async function EuropaNavbar() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error){
    redirect('/error?issue="Failed to find your user..."')

  }
  return (
    <header className='border-b px-4 md:px-10 py-1'>
      <div className='flex h-10 items-center justify-between gap-4'>
        {/* Left side */}
        <div className='flex items-center gap-2'>
          {/* Main nav */}
          <div className='flex items-center gap-6'>
            <a href={`
              ${user ? `/dashboard` : `/`}
              `} className='text-primary hover:text-primary/90'>
              <Logo />
            </a>       
          </div>
        </div>
        {/* Right side */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <InfoMenu />
            {user ? (
              <UserMenu user={user} />
            ) : (
              <AuthButton/>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
