
import type { Meditation } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlayCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { meditations } from './meditation-data';


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
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              <Button asChild className="w-full">
                <Link href={`/meditations/${meditation.id}`}>
                  <PlayCircle className="mr-2 h-4 w-4" /> Play
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
