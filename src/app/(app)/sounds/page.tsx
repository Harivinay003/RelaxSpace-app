'use client';

import { useState } from 'react';
import SoundscapePlayer from './soundscape-player';
import type { Soundscape } from '@/lib/types';

const soundscapes: Omit<Soundscape, 'icon'>[] = [
  {
    id: '1',
    name: 'Gentle Rain',
    audioUrl: '/sounds/rain.mp3', // Placeholder URL
    iconName: 'CloudRain',
  },
  {
    id: '2',
    name: 'Ocean Waves',
    audioUrl: '/sounds/waves.mp3', // Placeholder URL
    iconName: 'Waves',
  },
  {
    id: '3',
    name: 'Forest Ambience',
    audioUrl: '/sounds/forest.mp3', // Placeholder URL
    iconName: 'Bird',
  },
  {
    id: '4',
    name: 'Calming Wind',
    audioUrl: '/sounds/wind.mp3', // Placeholder URL
    iconName: 'Wind',
  },
];

export default function SoundsPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    setPlayingId(currentId => (currentId === id ? null : id));
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Ambient Soundscapes</h2>
      </div>
      <p className="text-muted-foreground">
        Play these sounds on their own or layer them with your meditation for a deeper experience.
      </p>
      <div className="space-y-4 rounded-lg border p-4">
        {soundscapes.map((sound) => (
          <SoundscapePlayer
            key={sound.id}
            soundscape={sound as Soundscape}
            isPlaying={playingId === sound.id}
            onPlay={() => handlePlay(sound.id)}
          />
        ))}
      </div>
    </div>
  );
}
