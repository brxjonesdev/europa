import React from 'react';
import { LearningObjective} from '@/features/knowledge-base/types';
import { MultiStepForm } from '@/shared/ui/multi-step-form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';


const initialData: LearningObjective = {
  id: '',
  topicId: '',
  title: '',
  description: '',
  tasks: [],
  reasoning: '',
  // Add any other fields as necessary
};

export default function Objectives() {
  return (
    <MultiStepForm<LearningObjective>
      title='Create a New Learning Objective'
      description='Please fill out the details for your new learning objective.'
      initialData={initialData}
      onSubmit={(data) => console.log(data)}
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
          validate: (data) => !!data.title && !!data.description,
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
          validate: (data) => !!data.title && !!data.description && !!data.reasoning,
        }
      ]}
    />
  );
}
