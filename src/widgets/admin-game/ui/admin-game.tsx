import { useGetGameSuspenseQuery } from '@/entities/admin/api/queries';
import { useGameStore } from '@/feature/game-control';
import { Suspense, useEffect, useRef } from 'react';
import { AudioPlayer } from './audio-player';
import { BeatTrack } from './beat-track';
import { Characters } from './characters';

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
  const { data: beatData } = useGetGameSuspenseQuery();

  // zustand
  const isPlaying = useGameStore((s) => s.isPlaying);
  const setIsPlaying = useGameStore((s) => s.setIsPlaying);
  const currentTime = useGameStore((s) => s.currentTime);
  const setCurrentTime = useGameStore((s) => s.setCurrentTime);
  const gameStarted = useGameStore((s) => s.gameStarted);
  const startTime = useGameStore((s) => s.startTime);
  const resetGame = useGameStore((s) => s.resetGame);

  // 게임 시작 신호가 오면 오디오 재생 및 타이머 시작
  useEffect(() => {
    if (!gameStarted || !audioRef.current || !startTime || !beatData) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
    const interval = setInterval(() => {
      const now = (Date.now() - startTime) / 1000;
      setCurrentTime(now);
      if (now >= beatData.song_length) {
        audioRef.current?.pause();
        setIsPlaying(false);
        setCurrentTime(0);
        resetGame();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [gameStarted, startTime, beatData, setIsPlaying, setCurrentTime, resetGame]);

  return (
    <>
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
