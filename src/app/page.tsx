import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, PlayCircle, Timer } from 'lucide-react';
import Link from 'next/link';
import SessionTracker from './(app)/tracker/session-tracker';

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <SessionTracker isDashboard={true} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Welcome to SereneScape</CardTitle>
            <CardDescription>
              Your personal space for peace and mindfulness. Start your journey below.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Link href="/meditations" passHref>
              <Button size="lg" className="w-full">
                <PlayCircle className="mr-2 h-5 w-5" />
                Start Guided Meditation
              </Button>
            </Link>
            <Link href="/timer" passHref>
              <Button size="lg" variant="secondary" className="w-full">
                <Timer className="mr-2 h-5 w-5" />
                Start Timer
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A log of your recent meditation sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            <SessionTracker />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
