import { useStartGameMutation } from '@/entities/admin/api/mutations';
import { useGetGameSuspenseQuery } from '@/entities/admin/api/queries';
import { useGameStore } from '@/feature/game-control';
import { Suspense, useEffect, useRef } from 'react';
import { AudioPlayer } from './audio-player';
import { BeatTrack } from './beat-track';
import { Characters } from './characters';
import { GameControls } from './game-controls';

const AdminGame = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AdminGameContent />
    </Suspense>
  );
};

export { AdminGame };

const AdminGameContent = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);

  const { data: beatData } = useGetGameSuspenseQuery();
  const { mutateAsync: startGame } = useStartGameMutation();

  const {
    isPlaying,
    currentTime,
    setIsPlaying,
    setCurrentTime,
    startGame: startGameState,
    resetGame,
  } = useGameStore();

  const handleStartGame = async () => {
    if (!audioRef.current || !beatData) return;
    await startGame({ game_started_at: Date.now() });
    startTimeRef.current = Date.now();
    audioRef.current.play();
    startGameState();
  };

  useEffect(() => {
    if (!isPlaying || !beatData) return;
    const interval = setInterval(() => {
      if (audioRef.current) {
        const now = (Date.now() - startTimeRef.current) / 1000;
        setCurrentTime(now);
        if (now >= beatData.song_length) {
          audioRef.current.pause();
          setIsPlaying(false);
          setCurrentTime(0);
          resetGame();
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, beatData, setCurrentTime, setIsPlaying, resetGame]);

  return (
    <>
      <GameControls
        isPlaying={isPlaying}
        onStart={handleStartGame}
        remainingTime={beatData.song_length - currentTime}
      />

      <BeatTrack currentTime={currentTime} beatList={beatData.beat_list} isPlaying={isPlaying} />

      <AudioPlayer audioRef={audioRef} onEnded={() => setIsPlaying(false)} />

      <Characters
        currentTime={currentTime}
        beatList={beatData.beat_list}
        isPlaying={isPlaying}
        className="mt-auto"
      />
    </>
  );
};

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-64 text-lg">게임 정보를 불러오는 중...</div>
);
