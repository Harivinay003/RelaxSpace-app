import SoundscapePlayer from './soundscape-player';
import { Waves, Wind, CloudRain, Bird } from 'lucide-react';
import type { Soundscape } from '@/lib/types';

const soundscapes: Soundscape[] = [
  {
    id: '1',
    name: 'Gentle Rain',
    audioUrl: '/sounds/rain.mp3', // Placeholder URL
    icon: CloudRain,
  },
  {
    id: '2',
    name: 'Ocean Waves',
    audioUrl: '/sounds/waves.mp3', // Placeholder URL
    icon: Waves,
  },
  {
    id: '3',
    name: 'Forest Ambience',
    audioUrl: '/sounds/forest.mp3', // Placeholder URL
    icon: Bird,
  },
  {
    id: '4',
    name: 'Calming Wind',
    audioUrl: '/sounds/wind.mp3', // Placeholder URL
    icon: Wind,
  },
];

export default function SoundsPage() {
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
          <SoundscapePlayer key={sound.id} soundscape={sound} />
        ))}
      </div>
    </div>
  );
}
