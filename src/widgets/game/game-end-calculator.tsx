import { API_BASE_URL } from '@/shared/constants/env';
import { calculateGameEndTime } from '@/feature/game/game-time-calculator';
import { useEffect } from 'react';

export const GameEndCalculator = ({
  setGameEndTime,
}: {
  setGameEndTime: (input: number | null) => void;
}) => {
  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}api/game/status`);
    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setGameEndTime(
        calculateGameEndTime({
          gameStartTime: Number(parsedData.game_started_at),
          songLength: Number(parsedData.song_length),
        })
      );
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [setGameEndTime]);

  return null;
};
