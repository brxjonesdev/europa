import { Button } from '@/shared/ui/button';
import { PlusCircle } from 'lucide-react';
import React from 'react';
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/shared/ui/modal';
import { AddTopicForm } from './add-topic-form';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function AddTopicButton() {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button
          variant={'outline'}
          className='hover:text-white hover:inset-1.5'
        >
          <PlusCircle />
          Add Topic
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className='w-full '>
        <VisuallyHidden>
          <CredenzaHeader className=''>
            <CredenzaTitle>Start learning a new topic!</CredenzaTitle>
            <CredenzaDescription className='text-xs md:text-sm'>
              Create a new space for adding resources and research material.
            </CredenzaDescription>
          </CredenzaHeader>
        </VisuallyHidden>
        <CredenzaBody className='text-sm  md:pb-0 w-full'>
          <AddTopicForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
