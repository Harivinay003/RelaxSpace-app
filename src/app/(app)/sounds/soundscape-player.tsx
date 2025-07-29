'use client';

import type { Soundscape } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX, Waves, Wind, CloudRain, Bird } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const iconMap = {
  Waves,
  Wind,
  CloudRain,
  Bird,
};

interface SoundscapePlayerProps {
  soundscape: Soundscape;
  isPlaying: boolean;
  onPlay: () => void;
}

export default function SoundscapePlayer({ soundscape, isPlaying, onPlay }: SoundscapePlayerProps) {
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const Icon = iconMap[soundscape.iconName as keyof typeof iconMap] || Waves;

  useEffect(() => {
    const audio = new Audio(soundscape.audioUrl);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [soundscape.audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between rounded-lg border p-4 transition-colors hover:bg-secondary/50">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <Icon className="h-8 w-8 text-primary" />
        <span className="font-medium">{soundscape.name}</span>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Button onClick={onPlay} variant="ghost" size="icon">
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
