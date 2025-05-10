import { cn } from '@/shared/lib/utils';
import { useEffect, useState } from 'react';

const Metronome = ({ currentTime, beatList, isPlaying }: TProps) => {
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);

  // Find current beat
  useEffect(() => {
    if (!isPlaying) return;

    const currentBeat = beatList.findIndex((beat) => beat > currentTime);
    if (currentBeat !== -1) {
      setCurrentBeatIndex(currentBeat);
    }
  }, [currentTime, beatList, isPlaying]);

  const getSwingAngle = () => {
    if (!isPlaying || currentBeatIndex >= beatList.length) return 0;

    const currentBeat = beatList[currentBeatIndex];
    const prevBeat = currentBeatIndex > 0 ? beatList[currentBeatIndex - 1] : 0;
    const beatInterval = currentBeat - prevBeat;
    const timeInCurrentBeat = currentTime - prevBeat;
    const progress = timeInCurrentBeat / beatInterval;

    const maxAngle = 30;
    const angle = progress * maxAngle;
    return angle;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-32 w-32">
        <div
          className={cn(
            'absolute left-1/2 top-0 h-24 w-1 -translate-x-1/2 origin-bottom bg-blue-500 transition-transform duration-100',
            !isPlaying && 'opacity-50'
          )}
          style={{
            transform: `rotate(${getSwingAngle()}deg)`,
          }}
        />
        <div
          className={cn(
            'absolute left-1/2 top-0 h-24 w-1 -translate-x-1/2 origin-bottom bg-blue-500 transition-transform duration-100',
            !isPlaying && 'opacity-50'
          )}
          style={{
            transform: `rotate(${getSwingAngle()}deg)`,
          }}
        />
      </div>
    </div>
  );
};

export { Metronome };

type TProps = {
  currentTime: number;
  beatList: number[];
  isPlaying: boolean;
};
