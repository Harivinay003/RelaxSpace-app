'use client';

import type { Soundscape } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function SoundscapePlayer({ soundscape }: { soundscape: Soundscape }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(soundscape.audioUrl);
      audioRef.current.loop = true;
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [soundscape.audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between rounded-lg border p-4 transition-colors hover:bg-secondary/50">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <soundscape.icon className="h-8 w-8 text-primary" />
        <span className="font-medium">{soundscape.name}</span>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Button onClick={togglePlayPause} variant="ghost" size="icon">
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
        </Button>
        <div className="flex w-full max-w-[150px] items-center gap-2">
          <Button onClick={toggleMute} variant="ghost" size="icon" className="h-8 w-8">
            {isMuted || volume[0] === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Slider
            value={isMuted ? [0] : volume}
            onValueChange={(newVolume) => {
              setVolume(newVolume);
              if (isMuted && newVolume[0] > 0) {
                setIsMuted(false);
              }
            }}
            max={100}
            step={1}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
