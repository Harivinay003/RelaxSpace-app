import type { Meditation } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlayCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const meditations: Meditation[] = [
  {
    id: '1',
    title: 'Morning Gratitude',
    description: 'Start your day with a heart full of gratitude and positivity.',
    duration: 10,
    audioUrl: '',
    imageUrl: '/images/morning-gratitude.jpg',
    tags: ['Morning', 'Gratitude'],
  },
  {
    id: '2',
    title: 'Stress Relief Breathing',
    description: 'A quick session to calm your mind and release tension.',
    duration: 5,
    audioUrl: '',
    imageUrl: '/images/stress-relief.jpg',
    tags: ['Stress', 'Breathing'],
  },
  {
    id: '3',
    title: 'Deep Sleep Relaxation',
    description: 'Drift into a peaceful sleep with this guided relaxation.',
    duration: 15,
    audioUrl: '',
    imageUrl: '/images/deep-sleep.jpg',
    tags: ['Sleep', 'Relaxation'],
  },
    {
    id: '4',
    title: 'Mindful Walking',
    description: 'Connect with your body and surroundings on a mindful walk.',
    duration: 20,
    audioUrl: '',
    imageUrl: '/images/mindful-walking.jpg',
    tags: ['Mindfulness', 'Active'],
  },
  {
    id: '5',
    title: 'Focus and Concentration',
    description: 'Enhance your focus for a productive day ahead.',
    duration: 10,
    audioUrl: '',
    imageUrl: '/images/focus-concentration.jpg',
    tags: ['Focus', 'Productivity'],
  },
  {
    id: '6',
    title: 'Loving-Kindness Meditation',
    description: 'Cultivate compassion for yourself and others.',
    duration: 12,
    audioUrl: '',
    imageUrl: '/images/loving-kindness.jpg',
    tags: ['Compassion', 'Kindness'],
  },
];


export default function MeditationsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Meditation Library</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meditations.map((meditation) => (
          <Card key={meditation.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
            <div className="relative h-48 w-full">
              <Image
                src={meditation.imageUrl}
                alt={meditation.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={`${meditation.tags[0]} ${meditation.tags[1]}`}
              />
            </div>
            <CardHeader>
              <CardTitle>{meditation.title}</CardTitle>
              <CardDescription>{meditation.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
               <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {meditation.duration} min
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {meditation.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <PlayCircle className="mr-2 h-4 w-4" /> Play
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
