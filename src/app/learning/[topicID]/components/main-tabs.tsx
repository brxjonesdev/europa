'use client';

import { Button } from '@/shared/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { BanIcon, MoreHorizontalIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Objectives from './tabs/objectives';
import Resources from './tabs/resources';
import Notes from './tabs/notes';
import { Topic } from '@/features/knowledge-base/types';
import MultiCard from './tabs/multi-card';

export default function ViewSelect({ data }: { data: Topic }) {
  return (
    <Tabs defaultValue='objectives' className='w-full h-full flex flex-col'>
      <TabsList className='w-full grid grid-cols-3 bg-black/10'>
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
        <TabsTrigger
          value='notes'
          className='items-center border data-[state=active]:shadow-lg'
        >
          Notes
        </TabsTrigger>
      </TabsList>

      <div className='flex-1  p-4 border rounded-md overflow-auto'>
        <TabsContent value='objectives' className='h-full'>
          {data.learningObjectives && data.learningObjectives.length > 0 ? (
            <MultiCard type='objectives' content={data.learningObjectives} />
          ) : (
            <p>No learning objectives found.</p>
          )}
        </TabsContent>
        <TabsContent value='resources' className='h-full'>
          {data.resources && data.resources.length > 0 ? (
            <MultiCard type='resources' content={data.resources} />
          ) : (
            <p>No resources found.</p>
          )}
        </TabsContent>
        <TabsContent value='notes' className='h-full'>
          {data.notes && data.notes.length > 0 ? (
            <MultiCard type='notes' content={data.notes} />
          ) : (
            <p>No notes found.</p>
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
}
