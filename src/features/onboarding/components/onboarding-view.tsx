/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { TransitionPanel } from '@/shared/ui/transition-panel';
import React, { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/ui/dialog";
import pages from './onboarding-pages';
import { VisuallyHidden } from "radix-ui";
import { DialogTitle } from '@radix-ui/react-dialog';

function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      type='button'
      className='relative flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800'
    >
      {children}
    </button>
  );
}
export function OnboardingView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();


  const handleSetActiveIndex = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (activeIndex < 0) setActiveIndex(0);
    if (activeIndex >= pages.length) setActiveIndex(pages.length - 1);
  }, [activeIndex]);


  return ( 
    <Dialog open={true}>
        <VisuallyHidden.Root><DialogTitle>{pages[activeIndex].title}</DialogTitle></VisuallyHidden.Root>
        <DialogContent className='p-0 w-fit rounded-xl' showCloseButton={false}>
      <div className='w-[364px] overflow-hidden rounded-xl border border-zinc-950/10 bg-white dark:bg-zinc-700'>
        <TransitionPanel
        activeIndex={activeIndex}
        variants={{
          enter: (direction) => ({
          x: direction > 0 ? 364 : -364,
          opacity: 0,
          height: bounds.height > 0 ? bounds.height : 'auto',
          position: 'initial',
          }),
          center: {
          zIndex: 1,
          x: 0,
          opacity: 1,
          height: bounds.height > 0 ? bounds.height : 'auto',
          },
          exit: (direction) => ({
          zIndex: 0,
          x: direction < 0 ? 364 : -364,
          opacity: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          }),
        }}
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        custom={direction}
        >
        {pages.map((page, index) => (
          <div key={index} className='px-4 pt-4 space-y-2' ref={ref}>
            <div>
              {page.image}
            </div>
          <h3 className='mb-0.5 font-medium text-zinc-800 dark:text-zinc-100'>
            {page.title}
          </h3>
          <p className='text-zinc-600 dark:text-zinc-400 text-sm'>
            {page.description}
          </p>
          {page.content}
          </div>
        ))}
        </TransitionPanel>
        <div className='flex justify-between p-4'>
        {activeIndex > 0 ? (
          <Button onClick={() => handleSetActiveIndex(activeIndex - 1)}>
          Previous
          </Button>
        ) : (
          <div />
        )}
        {activeIndex < pages.length - 1 ? (
          <Button onClick={() => handleSetActiveIndex(activeIndex + 1)}>
          Next
          </Button>
        ) : (
          <div />
        )}
        </div>
      </div>
        </DialogContent>
    </Dialog>
    
  );
}
