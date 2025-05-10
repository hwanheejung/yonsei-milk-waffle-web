import { useGetGameSuspenseQuery } from '@/entities/admin/api/queries';
import { useGameStore } from '@/feature/game-control';
import { Suspense, useEffect, useRef, useState } from 'react';
import { AudioPlayer } from './audio-player';
import { BeatTrack } from './beat-track';
import { Characters } from './characters';
import { ResultModal } from './result-modal';

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
  const [showResult, setShowResult] = useState(false);

  // zustand
  const isPlaying = useGameStore((s) => s.isPlaying);
  const setIsPlaying = useGameStore((s) => s.setIsPlaying);
  const currentTime = useGameStore((s) => s.currentTime);
  const setCurrentTime = useGameStore((s) => s.setCurrentTime);
  const gameStarted = useGameStore((s) => s.gameStarted);
  const startTime = useGameStore((s) => s.startTime);
  const resetGame = useGameStore((s) => s.resetGame);

  // 남은 시간 계산
  const remainingTime = Math.max(0, Math.floor(beatData.song_length - currentTime));
  const remainingTimeStr = String(remainingTime).padStart(2, '0');

  // // 게임 시작 신호가 오면 오디오 재생 및 타이머 시작
  // useEffect(() => {
  //   if (!gameStarted || !audioRef.current || !startTime || !beatData) return;
  //   audioRef.current.currentTime = 0;
  //   audioRef.current.play();
  //   setIsPlaying(true);
  //   const interval = setInterval(() => {
  //     const now = (Date.now() - startTime) / 1000;
  //     setCurrentTime(now);
  //     if (now >= beatData.song_length) {
  //       audioRef.current?.pause();
  //       setIsPlaying(false);
  //       setCurrentTime(0);
  //       resetGame();
  //       setShowResult(true);
  //     }
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, [gameStarted, startTime, beatData, setIsPlaying, setCurrentTime, resetGame]);

  // setInterval 대신 requestAnimationFrame 사용
  useEffect(() => {
    if (!gameStarted || !audioRef.current || !beatData) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      let animationFrameId: number;

      const tick = () => {
        const now = audioRef.current?.currentTime ?? 0;
        setCurrentTime(now);

        if (now >= beatData.song_length) {
          audioRef.current?.pause();
          setIsPlaying(false);
          setCurrentTime(0);
          resetGame();
          setShowResult(true);
          return;
        }

        animationFrameId = requestAnimationFrame(tick);
      };

      animationFrameId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animationFrameId);
    });
  }, [gameStarted, beatData, resetGame, setIsPlaying, setCurrentTime]);

  return (
    <>
      {showResult && <ResultModal />}
      <header className="flex items-center justify-between bg-transparent px-14">
        <img src="/images/logo.png" alt="쉐킷투유 로고" className="w-60 object-center" />
        <span className="text-4xl font-bold text-white">{remainingTimeStr}</span>
      </header>
      <div className="p-4 h-full flex flex-col">
        <img
          src="/images/toyou_bg.gif"
          alt="toyou_bg"
          className="fixed inset-0 w-full h-full object-cover opacity-80 -z-10"
        />

        <BeatTrack currentTime={currentTime} beatList={beatData.beat_list} isPlaying={isPlaying} />
        <AudioPlayer audioRef={audioRef} onEnded={() => setIsPlaying(false)} />
        <Characters
          currentTime={currentTime}
          beatList={beatData.beat_list}
          isPlaying={isPlaying}
          className="mt-auto"
        />
      </div>
    </>
  );
};

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-64 text-lg">게임 정보를 불러오는 중...</div>
);
