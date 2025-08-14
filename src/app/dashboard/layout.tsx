import { Card } from '@/shared/ui/card';
import type React from 'react';

export default function DashboardLayout({
  goals,
  tasks,
  user,
  weekly,
}: {
  goals: React.ReactNode;
  tasks: React.ReactNode;
  user: React.ReactNode;
  weekly: React.ReactNode;
}) {
  return (
    <main className=' flex flex-col p-4 max-h-screen flex-1'>
      <section className='flex-1 flex-col md:flex-row flex gap-4'>
        <div className='flex gap-4 flex-col md:w-3/12 '>
          <div className='w-full'>{user}</div>
          <div className='w-full'>{weekly}</div>
          <div className='w-full'>{tasks}</div>
          
        </div>
        <div className='flex flex-col flex-1'>{goals}</div>
      </section>
    </main>
  );
}
