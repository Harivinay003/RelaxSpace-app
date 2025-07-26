export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  audioUrl: string;
  imageUrl: string;
  tags: string[];
}

export interface Soundscape {
  id: string;
  name: string;
  audioUrl: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconName?: string;
}

export interface Session {
  id: string;
  date: string; // ISO string
  duration: number; // in minutes
  type: 'guided' | 'timer' | 'soundscape';
  title: string;
  userId?: string; // Add userId to associate session with a user
}
