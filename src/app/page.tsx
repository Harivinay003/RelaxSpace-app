'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, PlayCircle, Timer, Users, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import SessionTracker from './(app)/tracker/session-tracker';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { UsernamePrompt } from '@/components/username-prompt';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();

  const AccountCard = () => {
    if (loading) {
      return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24" />
          </CardContent>
        </Card>
      );
    }

    return (
       <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account</CardTitle>
            { user ? <Users className="h-4 w-4 text-muted-foreground" /> : <LogIn className="h-4 w-4 text-muted-foreground" />}
          </CardHeader>
          <CardContent>
            { user ? (
                <div className="space-y-2">
                    <div className="font-semibold text-lg">{user.displayName || 'Welcome!'}</div>
                    <Button size="sm" variant="outline" onClick={logout} className="mt-2">
                      <LogOut className="mr-2 h-4 w-4"/>
                      Logout
                    </Button>
                </div>
            ) : (
              <Link href="/login" passHref>
                  <Button size="sm" variant="outline">
                    <LogIn className="mr-2 h-4 w-4"/>
                    Login or Sign up
                  </Button>
              </Link>
            )}
          </CardContent>
        </Card>
    )
  }

  return (
    <>
      {user && !user.displayName && <UsernamePrompt />}
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Time</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <SessionTracker isDashboard={true} show="time"/>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <SessionTracker isDashboard={true} show="sessions"/>
            </CardContent>
          </Card>
          <AccountCard />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Welcome to SereneScape{user?.displayName ? `, ${user.displayName}` : ''}</CardTitle>
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
    </>
  );
}
