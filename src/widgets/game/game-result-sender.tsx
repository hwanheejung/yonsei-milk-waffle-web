import { usePostGameMutation } from '@/entities/game/api/mutations';
import type { Timestamp } from '@/entities/time/Timestamp';
import { getCurrentUnixTime } from '@/shared/lib/date';
import { useEffect, useState, useRef } from 'react';

export const GameResultSender = ({
  gameEndTime,
  userBeatList,
}: {
  gameEndTime: number | null;
  userBeatList: Timestamp[];
}) => {
  const [error, setError] = useState('');
  const { mutateAsync: sendGameResult } = usePostGameMutation();
  const hasSentResult = useRef(false);

  useEffect(() => {
    if (gameEndTime === null) {
      return;
    }

    const interval = setInterval(() => {
      const now = getCurrentUnixTime();
      if (!hasSentResult.current && now > gameEndTime) {
        sendGameResult({
          body: { timestamp: userBeatList, team: 'KOREA' },
        })
          .then(() => {})
          .catch((err) => {
            setError(err);
          });
        hasSentResult.current = true;
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [gameEndTime, userBeatList, sendGameResult]);

  return error.trim().length !== 0 ? <div>Game Result: {error}</div> : null;
};
