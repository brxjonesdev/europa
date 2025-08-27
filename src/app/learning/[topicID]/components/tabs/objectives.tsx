"use client"
import React from 'react';
import { Objective} from '@/features/knowledge-base/types';
import { MultiStepForm } from '@/shared/ui/multi-step-form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import { addLearningObjective } from '@/features/knowledge-base/services';
import { useRouter } from 'next/navigation';
import {nanoid} from 'nanoid';
import { useParams } from 'next/navigation';



const initialData: Objective = {
  id: '',
  topicId: '',
  title: '',
  description: '',
  tasks: [],
  reasoning: '',
};

export default function Objectives() {
  const router = useRouter();
  const params = useParams<{topicID: string}>();

  return (
    <MultiStepForm<Objective>
      title='Create a New Learning Objective'
      description='Please fill out the details for your new learning objective.'
      initialData={initialData}
      onSubmit={async (data) => {
        const objID = `obj0-${nanoid(12)}`
        const objective : Objective = {
          id: objID,
          topicId: params.topicID,
          title: data.title,
          description: data.description,
          reasoning: data.reasoning,
        }
        const result = await addLearningObjective(objective);
        if (!result.ok){
          console.error('Error adding learning objective:', result.error);
          return;
        }
        router.push(`/learning/${params.topicID}/${objID}`);
      }}
      type='Objective'
      successContent={
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold text-center'>Objective Created!</h2>
          <p className='text-center text-muted-foreground'>
            Your new learning objective has been successfully created.
          </p>
        </div>
      }
      steps={[
        {
          title: `What's your new objective?`,
          content: (data, update) => (
            <>
              <div className='space-y-2'>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  value={data.title}
                  onChange={(e) => update('title', e.target.value)}
                  placeholder='Title'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  className='resize-none h-36'
                  value={data.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder='Description'
                />
              </div>
            </>
          ),
          validate: (data) => !!data.title,
        },
        {
          title: 'What is your reasoning?',
          content: (data, update) => (
            <div className='space-y-2'>
              <Label htmlFor='reasoning'>Reasoning</Label>
              <Textarea
                id='reasoning'
                className='resize-none h-36'
                value={data.reasoning}
                onChange={(e) => update('reasoning', e.target.value)}
                placeholder='Reasoning'
              />
            </div>
          ),
          validate: (data) => !!data.reasoning,
        },
        {
          title: "Summary",
          content: (data) => (
            <div className='space-y-2'>
              <Label>Summary</Label>
              <p>{data.title}</p>
              <p>{data.description}</p>
              <p>{data.reasoning}</p>
            </div>
          ),
          validate: (data) => !!data.title && !!data.reasoning,
        }
      ]}
    />
  );
}
