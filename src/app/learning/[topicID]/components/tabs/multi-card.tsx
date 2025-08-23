import { LearningObjective, Note, Resource } from '@/features/knowledge-base/types';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react'
interface MultiCardProps {
    type: 'objectives' | 'resources' | 'notes';
    content: LearningObjective[] | Resource[] | Note[];
}
export default function MultiCard({ type, content }: MultiCardProps) {

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
  return (
    <AnimatePresence>
    <motion.div
      className='space-y-4'
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={listVariants}
    >
      {content.map((item) => (
        <motion.div
          key={item.id}
          className='flex items-center gap-2 justify-between'
          variants={itemVariants}
          transition={{ type: 'tween' }}
        >
          <div className='flex items-center gap-4'>
            <div className='h-10 w-10 rounded-full bg-secondary' />
            <div>
              <span className='block text-sm leading-none font-semibold'>
                {item.title}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </AnimatePresence>
  )
}

