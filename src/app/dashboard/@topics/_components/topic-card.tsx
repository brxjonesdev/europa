import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  Calendar,
  Target,
  CheckCircle2,
  Clock,
  BookOpen,
  Plus,
} from 'lucide-react';
import { Topic } from '@/features/knowledge-base/types';
import { keysToSnake } from '@/shared/util';

function formatDate(dateString: string) {
  console.log('Formatting date:', dateString);
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function calculateProgress(topic: Topic): {
  completed: number;
  total: number;
  percentage: number;
} {
  if (!topic.learningObjectives)
    return { completed: 0, total: 0, percentage: 0 };

  let completed = 0;
  let total = 0;

  topic.learningObjectives.forEach((objective) => {
    if (objective.milestones) {
      objective.milestones.forEach((milestone) => {
        if (milestone.tasks) {
          milestone.tasks.forEach((task) => {
            total++;
            if (task.completed) completed++;
          });
        }
      });
    }
  });

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export default function TopicCard({ topic }: { topic: Topic }) {
  const progress = calculateProgress(topic);
  const objectiveCount = topic.learningObjectives?.length || 0;
  const isEmpty = objectiveCount === 0;

  return (
    <Card className='group hover:shadow-md transition-all duration-200 border-border/50 hover:border-border z-10 h-fit'>
      <Link href={`/learning/${topic.id}`} className='block'>
        <CardHeader className='pb-2 gap-2 '>
          <div className='flex flex-col 2xl:flex-row 2xl:items-center justify-between lg:gap-4'>
            <CardTitle className='text-xl font-bold  transition-colors line-clamp-2 font-epilogue'>
              {topic.title}
            </CardTitle>
            {isEmpty ? (
              <div className='flex flex-col items-center justify-center py-6 text-center bg-black/10 rounded-xl flex-1'>
                <div className='rounded-full bg-muted p-3 mb-3'>
                  <BookOpen className='h-5 w-5 text-muted-foreground' />
                </div>
                <p className='text-sm text-muted-foreground mb-2'>
                  No learning objectives yet
                </p>
                <div className='flex items-center gap-1 text-xs text-muted-foreground/80'>
                  <Plus className='h-3 w-3' />
                  <span>Click to add objectives</span>
                </div>
              </div>
            ) : (
              <>
                <div className='flex items-center justify-between text-xs text-muted-foreground flex-1'>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='h-3 w-3' />
                      <span>{formatDate(keysToSnake(topic).created_at)}</span>
                    </div>

                    {objectiveCount > 0 && (
                      <div className='flex items-center gap-1'>
                        <Target className='h-3 w-3' />
                        <span>
                          {objectiveCount} objective
                          {objectiveCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>

                  {progress.total > 0 && (
                    <div className='flex items-center gap-1'>
                      {progress.percentage === 100 ? (
                        <CheckCircle2 className='h-3 w-3 text-green-600' />
                      ) : (
                        <Clock className='h-3 w-3' />
                      )}
                      <span>
                        {progress.completed}/{progress.total} tasks
                      </span>
                    </div>
                  )}
                </div>

                {progress.total > 0 && (
                  <div className='mt-3'>
                    <div className='w-full bg-secondary rounded-full h-1.5'>
                      <div
                        className='bg-primary h-1.5 rounded-full transition-all duration-300'
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {isEmpty && (
              <div className='flex items-center justify-center gap-1 text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50'>
                <Calendar className='h-3 w-3' />
                <span>Created {formatDate(keysToSnake(topic).created_at)}</span>
              </div>
            )}
          </div>
          <CardDescription className='text-xs text-muted-foreground line-clamp-2 mt-1'>
            {topic.description || 'No description provided'}
          </CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}
