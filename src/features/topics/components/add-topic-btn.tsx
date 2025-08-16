import { Button } from '@/shared/ui/button'
import { PlusCircle } from 'lucide-react'
import React from 'react'
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/shared/ui/modal"
import AddGoalForm from './add-topic-form'

export default function AddTopicButton() {
  return (
    <Credenza>
  <CredenzaTrigger asChild>
    <Button variant={"outline"} className='hover:text-white hover:inset-1.5'>
      <PlusCircle />
      Add Topic
    </Button>
  </CredenzaTrigger>
  <CredenzaContent>
    <CredenzaHeader className='border-b '>
      <CredenzaTitle>Start learning a new topic!</CredenzaTitle>
      <CredenzaDescription className='text-xs md:text-sm'>
        Create a new space for adding resources and research material.
      </CredenzaDescription>
    </CredenzaHeader>
    <CredenzaBody className='text-sm pb-4 md:pb-0'>
      <AddGoalForm/>
    </CredenzaBody>
  </CredenzaContent>
</Credenza>
  )
}
