import { cn } from '@/shared/lib/utils';

const BeatTrack = ({ currentTime, beatList, isPlaying }: TProps) => {
  // Calculate visible beats (current time ± 2 seconds)
  const visibleBeats = beatList.filter(
    (beat) => beat >= currentTime - 2 && beat <= currentTime + 2
  );

  return (
    <div className="relative h-16 w-full overflow-hidden bg-gray-100 rounded-lg">
      {/* Center line */}
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-blue-500" />

      {/* Moving track */}
      <div
        className="absolute top-0 h-full w-full"
        style={{
          transform: `translateX(${50 - currentTime * 100}%)`,
          transition: isPlaying ? 'none' : 'transform 0.1s linear',
        }}
      >
        {/* Beat markers */}
        {visibleBeats.map((beat, index) => (
          <div
            key={index.toString()}
            className={cn(
              'absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full',
              'border-2 border-blue-500 bg-white',
              'transition-transform duration-100',
              Math.abs(beat - currentTime) < 0.1 && 'scale-125'
            )}
            style={{
              left: `${beat * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { BeatTrack };

type TProps = {
  currentTime: number;
  beatList: number[];
  isPlaying: boolean;
};
