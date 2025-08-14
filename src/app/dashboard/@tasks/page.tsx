'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Calendar, Flag, Target } from 'lucide-react';
import TaskCard from './_components/task-card';

interface Task {
  id: string;
  name: string;
  details: string;
  parentGoal: string;
  dueDay: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completed: boolean;
}

const sampleTasks: Task[] = [
  {
    id: '1',
    name: 'Complete project proposal',
    details:
      'Draft and finalize the Q1 marketing campaign proposal with budget breakdown and timeline',
    parentGoal: 'Q1 Marketing Campaign',
    dueDay: 'Friday',
    priority: 'high',
    completed: false,
  },
  {
    id: '2',
    name: 'Review team feedback',
    details:
      'Go through all team member feedback on the new product features and compile summary',
    parentGoal: 'Product Development',
    dueDay: 'Wednesday',
    priority: 'medium',
    completed: false,
  },
  {
    id: '3',
    name: 'Update documentation',
    details:
      'Update API documentation with new endpoints and authentication methods',
    parentGoal: 'Technical Documentation',
    dueDay: 'Monday',
    priority: 'low',
    completed: false,
  },
  {
    id: '4',
    name: 'Client presentation prep',
    details: 'Prepare slides and demo for the client presentation next week',
    parentGoal: 'Client Relations',
    dueDay: 'Thursday',
    priority: 'urgent',
    completed: false,
  },
  {
    id: '5',
    name: 'Database optimization',
    details:
      'Optimize database queries and improve performance for user dashboard',
    parentGoal: 'Technical Improvements',
    dueDay: 'Tuesday',
    priority: 'medium',
    completed: false,
  },
  {
    id: '6',
    name: 'User testing session',
    details: 'Conduct user testing sessions for the new onboarding flow',
    parentGoal: 'User Experience',
    dueDay: 'Friday',
    priority: 'high',
    completed: false,
  },
  {
    id: '7',
    name: 'Security audit',
    details:
      'Complete security audit of authentication system and API endpoints',
    parentGoal: 'Security & Compliance',
    dueDay: 'Monday',
    priority: 'urgent',
    completed: false,
  },
  {
    id: '8',
    name: 'Team standup preparation',
    details: 'Prepare agenda and updates for weekly team standup meeting',
    parentGoal: 'Team Management',
    dueDay: 'Wednesday',
    priority: 'low',
    completed: false,
  },
];

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPriorityIcon = (priority: Task['priority']) => {
  switch (priority) {
    case 'urgent':
      return <Flag className='w-3 h-3 text-red-600' />;
    case 'high':
      return <Flag className='w-3 h-3 text-orange-600' />;
    case 'medium':
      return <Flag className='w-3 h-3 text-yellow-600' />;
    case 'low':
      return <Flag className='w-3 h-3 text-green-600' />;
    default:
      return <Flag className='w-3 h-3 text-gray-600' />;
  }
};

export default function Tasks() {
  return (
    <Card className='shadow-none flex flex-col h-full w-full gap-2 pb-0'>
      <CardHeader className='flex-shrink-0 border-b'>
        <CardTitle>Tasks</CardTitle>
        <CardDescription className='text-xs'>
          Manage your tasks and to-do items.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 flex flex-col  space-y-4 overflow-y-scroll pb-4 w-full '>
        <section className='flex-1 gap-4 flex flex-col w-full'>
          {sampleTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
      </CardContent>
    </Card>
  );
}
