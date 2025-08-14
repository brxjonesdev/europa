import EuropaNavbar from '@/features/navbar/components/navbar';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/shared/ui/badge';
import { Check, BookOpen, Compass, Repeat } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect('/dashboard');
  }
  const mvpFeatures = [
    {
      title: 'Learning Goal & Outcome Tracker',
      description: 'Define personal goals and desired outcomes.',
    },
    {
      title: 'Custom Learning Paths',
      description: 'Create and organize modules by topic or skill.',
    },
    {
      title: 'Daily Learning Journal',
      description: 'Log daily progress, reflections, and questions.',
    },
    {
      title: 'Resource Organizer',
      description: 'Save and tag videos, articles, PDFs, and notes.',
    },
    {
      title: 'Learning Strategy Templates',
      description: 'Use or create strategies linked to your goals.',
    },
    {
      title: 'Weekly Review Ritual',
      description: 'Reflect on progress and plan the next steps.',
    },
  ];

  return (
    <>
      <EuropaNavbar />
      <main>
        {/* Hero */}
        <section className='max-w-6xl mx-auto flex flex-col items-center justify-center space-y-16'>
          <div className='w-full'>
            <div className='container mx-auto'>
              <div className='flex gap-8 py-20 items-center justify-center flex-col'>
                <div className='flex gap-4 flex-col'>
                  <h1 className='text-5xl md:text-7xl max-w-2xl tracking-tight text-center font-bold'>
                    {'Learn freely. Think deeply. Master anything.'}
                  </h1>
                  <p className='text-md leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center px-2'>
                    {
                      'Whether you’re mastering a new skill, exploring a passion, or reinventing yourself, Europa helps you become the teacher of your own journey.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* About Autodidacts */}
          <div id='autodidacts' className='w-full px-4'>
            <div className='container mx-auto'>
              <div className='flex flex-col gap-4 items-start'>
                <Badge>About autodidacts</Badge>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-3xl md:text-5xl tracking-tighter lg:max-w-3xl font-semibold'>
                    Built for autodidacts. Self-directed learners who thrive
                    learning their own way.
                  </h2>
                  <p className='text-md max-w-2xl leading-relaxed tracking-tight text-muted-foreground'>
                    Autodidacts learn by doing. They set their own goals, curate
                    resources, reflect daily, and refine their approach over
                    time. Europa gives you structure without friction: clear
                    outcomes, flexible paths, and lightweight rituals that make
                    progress visible.
                  </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 w-full'>
                  <div className='flex items-start gap-4'>
                    <div className='mt-1 rounded-md p-2 border'>
                      <Compass
                        className='w-4 h-4 text-primary'
                        aria-hidden='true'
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='font-medium'>Own your direction</p>
                      <p className='text-sm text-muted-foreground'>
                        Set outcomes that matter and chart a path that fits your
                        motivation and time.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='mt-1 rounded-md p-2 border'>
                      <BookOpen
                        className='w-4 h-4 text-primary'
                        aria-hidden='true'
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='font-medium'>Curate your knowledge</p>
                      <p className='text-sm text-muted-foreground'>
                        Collect videos, articles, and notes; connect them to
                        skills and modules.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='mt-1 rounded-md p-2 border'>
                      <Repeat
                        className='w-4 h-4 text-primary'
                        aria-hidden='true'
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='font-medium'>Learn in tight loops</p>
                      <p className='text-sm text-muted-foreground'>
                        Reflect daily, review weekly, and iterate your strategy
                        to sustain momentum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div id='features' className='w-full px-4'>
            <div className='container mx-auto'>
              <div className='flex gap-4 flex-col items-start'>
                <div>
                  <Badge>{'What can Europa do for you?'}</Badge>
                </div>
                <div className='flex gap-2 flex-col'>
                  <h2 className='text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-semibold'>
                    {'Features'}
                  </h2>
                  <p className='text-md max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground'>
                    {
                      'Europa offers features that allow autodidacts to take control of their learning journey.'
                    }
                  </p>
                </div>
                <div className='flex gap-10 pt-6 flex-col w-full'>
                  <div className='grid grid-cols-1 items-start lg:grid-cols-3 gap-8'>
                    {mvpFeatures.map(({ title, description }) => (
                      <div
                        key={title}
                        className='flex flex-row gap-6 w-full items-start'
                      >
                        <Check
                          className='w-4 h-4 mt-2 text-primary'
                          aria-hidden='true'
                        />
                        <div className='flex flex-col gap-1'>
                          <p className='font-medium'>{title}</p>
                          <p className='text-muted-foreground text-sm'>
                            {description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className='mt-16 border-t'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto py-10 flex flex-col gap-8'>
              <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
                <div className='flex flex-col gap-1'>
                  <p className='text-lg font-semibold'>Europa</p>
                  <p className='text-sm text-muted-foreground'>
                    Tools for self-directed learning. Structure when you want
                    it, freedom when you need it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
