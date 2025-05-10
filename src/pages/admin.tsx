import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';
import { createFileRoute } from '@tanstack/react-router';
import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type TBeatData = {
  song_length: number;
  beat_list: number[];
};

// Dummy data
const dummyBeatData: TBeatData = {
  song_length: 30,
  beat_list: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0],
};

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [beatData] = useState<TBeatData>(dummyBeatData);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);

  const handleStartGame = () => {
    if (!audioRef.current) return;

    startTimeRef.current = Date.now();
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (audioRef.current) {
        const currentTime = (Date.now() - startTimeRef.current) / 1000;
        setCurrentTime(currentTime);

        if (currentTime >= beatData.song_length) {
          audioRef.current.pause();
          setIsPlaying(false);
          setCurrentTime(0);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, beatData.song_length]);

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button onClick={handleStartGame} disabled={isPlaying}>
            <Play className={cn(isPlaying && 'opacity-30')} />
          </Button>

          <div className="text-lg">
            남은 시간: {(beatData.song_length - currentTime).toFixed(1)}초
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">비트 정보</h2>
          <p>노래 길이: {beatData.song_length}초</p>
          <p>비트 개수: {beatData.beat_list.length}개</p>
        </div>

        <audio
          ref={audioRef}
          src="/audio/to_you.mp3"
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        >
          <track kind="captions" src="" label="English" />
        </audio>
      </div>
    </div>
  );
}
