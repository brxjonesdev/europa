
import { OnboardingView } from '@/features/onboarding/components/onboarding-view';
import type React from 'react';

export default function DashboardLayout({
  goals,
  user,
}: {
  goals: React.ReactNode;
  user: React.ReactNode;
}) {
  return (
    <main className=' flex flex-col p-4 max-h-screen flex-1'>
      <OnboardingView/>
      <section className='flex-1 flex-col md:flex-row flex gap-4'>
        <div className='flex gap-4 flex-col md:w-3/12 '>
          <div className='w-full'>{user}</div>
        </div>
        <div className='flex flex-col flex-1'>{goals}</div>
      </section>
    </main>
  );
}
