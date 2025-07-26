'use client';

import { useState, useEffect } from 'react';
import type { Session } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { format, subDays, parseISO } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const MOCK_SESSIONS: Session[] = [
  { id: '1', date: subDays(new Date(), 1).toISOString(), duration: 10, type: 'guided', title: 'Morning Gratitude' },
  { id: '2', date: subDays(new Date(), 2).toISOString(), duration: 5, type: 'timer', title: 'Unguided Timer' },
  { id: '3', date: subDays(new Date(), 2).toISOString(), duration: 15, type: 'guided', title: 'Deep Sleep Relaxation' },
  { id: '4', date: subDays(new Date(), 4).toISOString(), duration: 20, type: 'soundscape', title: 'Ocean Waves' },
  { id: '5', date: subDays(new Date(), 6).toISOString(), duration: 10, type: 'guided', title: 'Focus and Concentration' },
];

const STORAGE_KEY = 'sereneScapeSessions';

interface SessionTrackerProps {
  isDashboard?: boolean;
  show?: 'time' | 'sessions' | 'all';
  showChart?: boolean;
}

export default function SessionTracker({ isDashboard = false, show = 'all', showChart = false }: SessionTrackerProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedSessions = localStorage.getItem(STORAGE_KEY);
      if (storedSessions) {
        setSessions(JSON.parse(storedSessions));
      } else {
        // First time load, populate with mock data
        setSessions(MOCK_SESSIONS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_SESSIONS));
      }
    } catch (error) {
        console.warn("Could not access local storage. Using mock data.");
        setSessions(MOCK_SESSIONS);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const totalTime = sessions.reduce((acc, session) => acc + session.duration, 0);
  const totalSessions = sessions.length;

  if (isLoading) {
      if (isDashboard) {
          return <Skeleton className="h-8 w-24" />
      }
      if (showChart) {
          return <Skeleton className="h-[350px] w-full" />
      }
      return <Skeleton className="h-40 w-full" />;
  }
  
  if (isDashboard) {
    if (show === 'time') {
      return <div className="text-2xl font-bold">{totalTime} min</div>;
    }
    if (show === 'sessions') {
      return <div className="text-2xl font-bold">{totalSessions}</div>;
    }
    return null;
  }
  
  if(showChart) {
    const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse();
    const chartData = last7Days.map(day => {
        const dayString = format(day, 'yyyy-MM-dd');
        const totalDuration = sessions
            .filter(s => format(parseISO(s.date), 'yyyy-MM-dd') === dayString)
            .reduce((sum, s) => sum + s.duration, 0);
        return {
            name: format(day, 'EEE'),
            total: totalDuration
        }
    });

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
                <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}m`}
                />
                <Tooltip
                  cursor={{fill: 'hsl(var(--secondary))'}}
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
  }

  return sessions.length > 0 ? (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Duration</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.title}</TableCell>
              <TableCell>
                <Badge variant={session.type === 'guided' ? 'default' : 'secondary'}>{session.type}</Badge>
              </TableCell>
              <TableCell className="text-right">{session.duration} min</TableCell>
              <TableCell className="text-right">{format(parseISO(session.date), 'MMM d, yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ) : (
    <Card className="flex items-center justify-center p-6">
      <p className="text-muted-foreground">No sessions logged yet. Complete a meditation to get started!</p>
    </Card>
  );
}
