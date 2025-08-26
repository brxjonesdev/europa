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
import Resources from '@/app/learning/[topicID]/components/tabs/resources';
import { PlusCircleIcon } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function AddAssetButton({
  type,
}: {
  type: 'objectives' | 'resources' | 'notes';
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          key='add'
          className=' rounded-2xl  h-full flex flex-col items-center justify-center text-center transition-colors hover:border-muted-foreground/60 hover:bg-muted/20 bg-muted/10 cursor-pointer'
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
            <DialogTitle>Add a new {type.slice(0, -1)}</DialogTitle>
            <DialogDescription>
              Please fill in the details for the new {type.slice(0, -1)}.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <div className='max-w-lg mx-auto w-full'>
          {(() => {
            switch (type) {
              case 'objectives':
                return <Objectives />;
              case 'resources':
                return <Resources />;
              default:
                return null;
            }
          })()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
