
'use client';

import { useParams } from 'next/navigation';
import { meditations } from '../meditation-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { addSession } from '@/lib/firestore';
import { Progress } from '@/components/ui/progress';

export default function MeditationPlayerPage() {
  const params = useParams();
  const meditation = meditations.find(m => m.id === params.id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const hasLoggedSession = useRef(false);

  const logSession = useCallback(async () => {
    if (user && meditation && !hasLoggedSession.current) {
        hasLoggedSession.current = true; // Prevent multiple logs for one session
        try {
            await addSession(user.uid, {
                date: new Date().toISOString(),
                duration: meditation.duration,
                type: 'guided',
                title: meditation.title,
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
    } else if (!user && !hasLoggedSession.current) {
        hasLoggedSession.current = true;
        toast({
            title: 'Session Complete!',
            description: 'Log in to save your progress.',
        });
    }
  }, [meditation, user, toast]);

  useEffect(() => {
    if (meditation) {
      const audio = new Audio(meditation.audioUrl);
      audioRef.current = audio;
      
      const updateProgress = () => {
        if(audio.duration){
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        }
      };
      
      const onEnded = () => {
        setIsPlaying(false);
        logSession();
      }

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', onEnded);

      return () => {
        audio.pause();
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', onEnded);
        audioRef.current = null;
      };
    }
  }, [meditation, logSession]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if(audioRef.current?.ended){
        // If ended, reset and play
        audioRef.current.currentTime = 0;
        setIsPlaying(true);
        hasLoggedSession.current = false; // Allow logging again
    } else {
        setIsPlaying(!isPlaying);
    }
  };

  const resetPlayer = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!meditation) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <p>Meditation not found.</p>
      </div>
    );
  }

  const totalDuration = audioRef.current?.duration || meditation.duration * 60;

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-lg overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={meditation.imageUrl}
            alt={meditation.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            data-ai-hint={`${meditation.tags[0]} ${meditation.tags[1]}`}
          />
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">{meditation.title}</CardTitle>
          <CardDescription>{meditation.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalDuration)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Button onClick={resetPlayer} variant="ghost" size="icon">
              <RotateCcw className="h-6 w-6" />
            </Button>
            <Button onClick={togglePlayPause} size="lg" className="h-16 w-16 rounded-full">
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>
            <div className="flex items-center gap-2 w-32">
              <Button onClick={toggleMute} variant="ghost" size="icon">
                {isMuted || volume[0] === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <Slider
                value={isMuted ? [0] : volume}
                onValueChange={(newVolume) => {
                    setVolume(newVolume);
                    if (isMuted && newVolume[0] > 0) setIsMuted(false);
                }}
                max={100}
                step={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
