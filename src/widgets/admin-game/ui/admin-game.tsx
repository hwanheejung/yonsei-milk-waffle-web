import { useEffect, useRef, useState } from 'react';
import { AudioPlayer } from './audio-player';
import { BeatInfo } from './beat-info';
import { GameControls } from './game-controls';
// import { useGetGameQuery, useStartGameMutation } from '@/entities/admin/api/queries';

type TBeatData = {
  song_length: number;
  beat_list: number[];
};

// Dummy data
const dummyBeatData: TBeatData = {
  song_length: 30,
  beat_list: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0],
};

export function AdminGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [beatData] = useState<TBeatData>(dummyBeatData);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);

  // TODO: Uncomment when backend is ready
  // const { data: gameData } = useGetGameQuery();
  // const { mutate: startGame } = useStartGameMutation();

  const handleStartGame = () => {
    if (!audioRef.current) return;

    // TODO: Uncomment when backend is ready
    // startGame({ game_start_at: Date.now() });

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
    <div className="space-y-4">
      <GameControls
        isPlaying={isPlaying}
        onStart={handleStartGame}
        remainingTime={beatData.song_length - currentTime}
      />

      <BeatInfo songLength={beatData.song_length} beatCount={beatData.beat_list.length} />

      <AudioPlayer audioRef={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}
