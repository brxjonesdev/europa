'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Topic } from '@/features/knowledge-base/types';
import MultiCard from './tabs/multi-card';

export default function ViewSelect({ data }: { data: Topic }) {
  return (
    <Tabs defaultValue='objectives' className='w-full h-full flex flex-col'>
      <TabsList className='w-full grid grid-cols-2 bg-black/10'>
        <TabsTrigger
          value='objectives'
          className='items-center border data-[state=active]:shadow-lg'
        >
          Objectives
        </TabsTrigger>
        <TabsTrigger
          value='resources'
          className='items-center border data-[state=active]:shadow-lg'
        >
          Resources
        </TabsTrigger>
      </TabsList>

      <div className='flex-1  p-4 border rounded-md overflow-auto '>
        <TabsContent value='objectives' className='h-full'>
          <MultiCard
            type='objectives'
            content={data.learningObjectives ?? []}
          />
        </TabsContent>
        <TabsContent value='resources' className='h-full '>
          <MultiCard type='resources' content={data.resources ?? []} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
