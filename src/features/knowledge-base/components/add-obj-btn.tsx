import { motion } from 'motion/react';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import Objectives from '@/app/learning/[topicID]/components/tabs/objectives';
import { PlusCircleIcon } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function AddObjectiveButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          key='add'
          className=' rounded-2xl  min-h-18 lg:h-full flex flex-col items-center justify-center text-center transition-colors hover:border-muted-foreground/60 hover:bg-muted/20 bg-muted/10 cursor-pointer'
        >
          <motion.div
            className='bg-transparent shadow-lg  rounded-lg flex items-center justify-center '
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircleIcon />
          </motion.div>
        </div>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className='p-0'
      >
        <VisuallyHidden>
          <DialogHeader className='space-y-0 gap-1'>
            <DialogTitle>Add a new objective</DialogTitle>
            <DialogDescription>
              Please fill in the details for the new objective.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <div className='max-w-lg mx-auto w-full'>
          <Objectives />
        </div>
      </DialogContent>
    </Dialog>
  );
}
