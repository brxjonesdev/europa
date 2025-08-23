import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import React from 'react';

export default function TopicStats() {
  return (
    <Card className='h-fit shadow-none'>
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
