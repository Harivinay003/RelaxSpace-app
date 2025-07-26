'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';
import { addSession } from '@/lib/firestore';

const DURATION_OPTIONS = [1, 5, 10, 15, 20, 30, 45, 60];

export default function TimerPage() {
  const [duration, setDuration] = useState(10 * 60); // default 10 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
      setIsMounted(true);
  }, []);

  const logSession = useCallback(async () => {
    if (user) {
      try {
        await addSession(user.uid, {
          date: new Date().toISOString(),
          duration: duration / 60,
          type: 'timer',
          title: 'Unguided Timer',
        });
        toast({
            title: 'Session Complete!',
            description: 'Your meditation session has been logged.',
        });
      } catch (error) {
        toast({
            title: 'Error logging session',
            description: 'Could not save your session to the database.',
            variant: 'destructive',
        });
      }
    } else {
        toast({
            title: 'Session Complete!',
            description: 'Log in to save your progress.',
        });
    }
  }, [duration, user, toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      logSession();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, toast, logSession]);

  const handleDurationChange = (value: string) => {
    const newDuration = parseInt(value, 10) * 60;
    if (!isActive) {
      setDuration(newDuration);
      setTimeLeft(newDuration);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(duration);
  }, [duration]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Reset timer if duration changes
  useEffect(() => {
      resetTimer();
  }, [duration, resetTimer]);

  if (!isMounted) {
      return (
        <div className="flex flex-1 items-center justify-center p-4">
            <Skeleton className="h-[450px] w-full max-w-md" />
        </div>
      )
  }

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Meditation Timer</CardTitle>
          <CardDescription className="text-center">
            Focus on your breath. We'll keep track of the time.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="font-mono text-8xl font-bold tracking-tighter text-primary"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {formatTime(timeLeft)}
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <label htmlFor="duration-select" className="text-sm font-medium text-muted-foreground">
              Set Duration (minutes)
            </label>
            <Select
              onValueChange={handleDurationChange}
              defaultValue={String(duration / 60)}
              disabled={isActive}
            >
              <SelectTrigger id="duration-select" className="w-[180px]">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                {DURATION_OPTIONS.map((min) => (
                  <SelectItem key={min} value={String(min)}>
                    {min} minutes
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4">
          <Button onClick={toggleTimer} size="lg">
            {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
