import { getLearningObjectiveById } from '@/features/knowledge-base/services';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { ArrowLeft,} from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import ObjectiveDisplay from './components/objective-display';

export default async function ObjectivePage({params}: {params: { topicID: string, asset: string }}) {
  const { topicID, asset } = await params;
  const result = await getLearningObjectiveById(asset);
  if (!result.ok) {
    return (
      <section className='p-2 flex-1 '>
        <div className='border-b w-full pb-2'>
          <Badge>
            Error: {result.error}
          </Badge>
        </div>
      </section>
    );
  }
  const data = result.data;
  return (
    <section className='p-2 flex-1 flex flex-col gap-4'>
      <div className='border-b w-full pb-2 flex gap-2'>
        <Link href={`/learning/${topicID}`} className='flex items-center'>
          <Button variant={"outline"}>
            <ArrowLeft />
            Back to topic.
          </Button>
        </Link>
        <Badge className='flex-1'>
          {data.title}
        </Badge>
      </div>
      <ObjectiveDisplay objective={data} />
    </section>
  )
}
