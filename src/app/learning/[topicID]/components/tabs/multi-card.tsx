"use client"
import AddObjectiveButton from '@/features/knowledge-base/components/add-obj-btn';
import {
  Objective,
} from '@/features/knowledge-base/types';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import React from 'react';

interface MultiCardProps {
  content: Objective[] | null;
  id: string;
}

export default function MultiCard({ content, id }: MultiCardProps) {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderCard = (item: Objective) => {
    return (
      <>
        <span className='block text-sm font-semibold'>{item.title}</span>
        {item.description && (
          <p className='text-xs text-muted-foreground'>{item.description}</p>
        )}
        {item.tasks && (
          <div>
            <span className='text-[10px] text-muted-foreground'>
              {item.tasks.length} tasks
            </span>
          </div>
        )}
        {!item.tasks && (
          <div>
            <span className='text-[10px] text-muted-foreground'>
              No tasks yet
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className='space-y-4 flex flex-col lg:grid lg:grid-cols-3 lg:gap-4 grid-rows-[repeat(auto-fill,minmax(200px,1fr))]'
        initial='hidden'
        animate='visible'
        exit='hidden'
        variants={listVariants}
      >
        <AddObjectiveButton />
        {content &&
          content.map((item) => (
            <Link href={`/learning/${id}/${item.id}`} key={item.id} className='h-full'>
              <motion.div
                key={item.id}
                className='border p-3 rounded-lg shadow-sm bg-card h-full overflow-y-scroll'
                variants={itemVariants}
                transition={{ type: 'tween' }}
              >
                {renderCard(item)}
              </motion.div>
            </Link>
          ))}
      </motion.div>
    </AnimatePresence>
  );
}
