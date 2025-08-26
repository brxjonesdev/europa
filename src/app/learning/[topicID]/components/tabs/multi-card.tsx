import AddAssetButton from '@/features/knowledge-base/components/add-asset-btn';
import {
  LearningObjective,
  Resource,
} from '@/features/knowledge-base/types';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

interface MultiCardProps {
  type: 'objectives' | 'resources';
  content: LearningObjective[] | Resource[] | null;
}

export default function MultiCard({ type, content }: MultiCardProps) {
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

  const renderCard = (item: LearningObjective | Resource) => {
    switch (type) {
      case 'objectives': {
        const obj = item as LearningObjective;
        return (
          <>
            <span className='block text-sm font-semibold'>{obj.title}</span>
            {obj.description && (
              <p className='text-xs text-muted-foreground'>{obj.description}</p>
            )}
            {obj.tasks && (
              <div>
                <span className='text-[10px] text-muted-foreground'>
                  {obj.tasks.length} tasks
                </span>
                
              </div>
            )}
            {!obj.tasks && (
              <div>
                <span className='text-[10px] text-muted-foreground'>
                  No tasks yet
                </span>
              </div>
            )}
          </>
        );
      }
      case 'resources': {
        const res = item as Resource;
        return (
          <>
            <span className='block text-sm font-semibold'>{res.title}</span>
            {res.description && (
              <p className='text-xs text-muted-foreground'>{res.description}</p>
            )}
            <a
              href={res.link}
              target='_blank'
              rel='noopener noreferrer'
              className='text-[10px] text-blue-500 underline'
            >
              Visit
            </a>
          </>
        );
      }
    }
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
        <AddAssetButton type={type} />
        {content &&
          content.map((item) => (
            <motion.div
              key={item.id}
              className='border p-3 rounded-lg shadow-sm bg-card h-full overflow-y-scroll'
              variants={itemVariants}
              transition={{ type: 'tween' }}
            >
              {renderCard(item)}
            </motion.div>
          ))}
      </motion.div>
    </AnimatePresence>
  );
}
