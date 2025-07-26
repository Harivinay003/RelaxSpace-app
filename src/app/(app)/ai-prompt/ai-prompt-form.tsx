'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePersonalizedMeditationPromptAction } from './actions';
import { Loader2, Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}

const formSchema = z.object({
  mood: z.string().min(3, { message: 'Please describe your mood a little more.' }).max(100),
  goals: z.string().min(3, { message: 'Please describe your goals a little more.' }).max(200),
});

export default function AIPromptForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isClient = useIsClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: '',
      goals: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedPrompt('');
    setError(null);
    try {
      const result = await generatePersonalizedMeditationPromptAction(values);
      if (result.prompt) {
        setGeneratedPrompt(result.prompt);
      } else {
        throw new Error('Failed to generate prompt. Please try again.');
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!isClient) {
    return (
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Create Your Prompt</CardTitle>
              <CardDescription>Fill in the details below to get a personalized prompt.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How are you feeling right now?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Stressed, anxious, calm, happy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your goals for this session?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., To relax, improve focus, be present" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Prompt
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Your Personalized Prompt</CardTitle>
          <CardDescription>Use this prompt to guide your meditation session.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          {isLoading && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
          {error && <p className="text-destructive text-center">{error}</p>}
          {!isLoading && !error && generatedPrompt && (
            <p className="text-lg italic text-center text-foreground/80">"{generatedPrompt}"</p>
          )}
          {!isLoading && !error && !generatedPrompt && (
            <p className="text-muted-foreground text-center">Your prompt will appear here once generated.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
