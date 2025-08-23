"use client";

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
import Placeholder from '@/shared/ui/placeholder';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useForm } from "react-hook-form";
import { updateTopic } from '@/features/knowledge-base/services';

type TopicFormValues = {
  title: string;
  description: string;
};

export default function TopicDetails({ data }: { data: Topic }) {
  const [details, setDetails] = React.useState<Partial<Topic>>({
    title: data.title,
    description: data.description,
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<TopicFormValues>({
    defaultValues: {
      title: data.title,
      description: data.description,
    },
  });

  async function onSubmit(values: TopicFormValues) {
    setDetails({
      title: values.title,
      description: values.description,
    });
    const result = await updateTopic(data.id, {
      title: values.title,
      description: values.description,
    });
    if (!result.ok) {
      console.error('Failed to update topic:', result.error);
      return;
    }
    setIsOpen(false);
  }

  return (
    <Card className="h-fit shadow-none">
      <CardHeader>
        <CardTitle>{details.title}</CardTitle>
        <CardDescription className="text-xs">
          {details.description}
        </CardDescription>
        <CardAction>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Edit2 className="mr-2 h-4 w-4" />
                <span>Edit Topic</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Topic Details</DialogTitle>
                <DialogDescription>
                  Change the title and description of this topic.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <FormControl>
                          <input id="title" {...field} className="w-full border rounded p-2" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <FormControl>
                          <textarea
                            id="description"
                            {...field}
                            className="w-full border rounded p-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Save</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>

      <Separator />

      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription className="text-xs">
          Insight into the topic&apos;s learning objectives.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Placeholder message="An overview of the topic's learning objectives like progress tracking and such will be displayed here." />
      </CardContent>
    </Card>
  );
}
