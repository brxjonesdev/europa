import { Card } from '@/shared/ui/card';
import React from 'react';

export default function DashboardLayout({
  goals,
  tasks,
  user,
  weekly
}: {
  goals: React.ReactNode;
  tasks: React.ReactNode;
  user: React.ReactNode;
  weekly: React.ReactNode;
}) {
  return (
    <main className='flex-1 p-2 md:px-4 flex flex-col '>
      <section className='flex flex-col gap-6 w-full flex-1'>
        <Card className='shadow-none flex-1 p-0'>
          <div className='grid grid-cols-1 md:grid-cols-12 grid-rows-8 md:grid-rows-8 gap-4 rounded-xl flex-1 p-4'>
            <div className='md:col-span-5 md:row-span-3'>{user}</div>
            <div className='md:col-span-2 md:row-span-3 md:col-start-6'>{tasks}</div>
            <div className='md:col-span-5 md:row-span-3 md:col-start-8'>{weekly}</div>
            <div className='md:col-span-12 md:row-span-5 md:row-start-4'>{goals}</div>
          </div>
        </Card>
      </section>
    </main>
  );
}
