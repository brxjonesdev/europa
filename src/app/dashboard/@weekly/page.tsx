import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import React from 'react';

export default function Weekly() {
  return (
    <Card className='shadow-none flex-1 px-0 h-full w-full'>
      <CardHeader>
        <CardTitle>Weekly Overview</CardTitle>
        <CardDescription className='text-xs'>
          A summary of your weekly progress and activities.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
