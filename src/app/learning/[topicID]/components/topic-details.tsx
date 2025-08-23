import { Topic } from '@/features/knowledge-base/types';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Edit2 } from 'lucide-react';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Separator } from '@/shared/ui/separator';

export default function TopicDetails({ data }: { data: Topic }) {
  return (
    <Card className='h-fit shadow-none'>
      <CardHeader className=''>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription className='text-xs'>
          {data.description}
        </CardDescription>
        <CardAction>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} className='ml-auto'>
                <Edit2 />
                <span>Edit Topic</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <Separator />
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription className='text-xs'>
          Insight into the topic&apos;s learning objectives.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
