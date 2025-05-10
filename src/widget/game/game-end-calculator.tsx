import { useEffect, useRef } from 'react';
import { calculateGameEndTime } from '@/feature/game/game-time-calculator';
import { useGetGameStatus } from '@/entities/game/api/queries';

export const GameEndCalculator = ({
  setGameEndTime,
}: {
  setGameEndTime: (input: number | null) => void;
}) => {
  const { data: gameStatus, refetch: refetchGameStatus, isSuccess } = useGetGameStatus();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      refetchGameStatus();
    }, 30000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refetchGameStatus]);

  useEffect(() => {
    if (isSuccess) {
      setGameEndTime(
        calculateGameEndTime({
          gameStartTime: gameStatus.game_start_at,
          songLength: gameStatus.song_length,
        })
      );
    }
  }, [gameStatus, isSuccess, setGameEndTime]);

  return null;
};
