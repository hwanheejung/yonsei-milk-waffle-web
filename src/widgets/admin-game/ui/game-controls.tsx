import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';
import { Play } from 'lucide-react';

interface GameControlsProps {
  isPlaying: boolean;
  onStart: () => void;
  remainingTime: number;
}

export function GameControls({ isPlaying, onStart, remainingTime }: GameControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button onClick={onStart} disabled={isPlaying}>
        <Play className={cn(isPlaying && 'opacity-30')} />
      </Button>

      <div className="text-lg">남은 시간: {remainingTime.toFixed(1)}초</div>
    </div>
  );
}
