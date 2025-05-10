import { usePostGameMutation } from '@/entities/game/api/mutations';
import { Team } from '@/entities/team';
import type { Timestamp } from '@/entities/time/Timestamp';
import { getCurrentUnixTime } from '@/shared/lib/date';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { setStorage } from '@/shared/lib/sessionStorage';

export const GameResultSender = ({
  gameEndTime,
  userBeatList,
  userBeatHistory,
}: {
  gameEndTime: number | null;
  userBeatList: Timestamp[];
  userBeatHistory: { time: number; x: number }[];
}) => {
  const [error, setError] = useState('');
  const { mutateAsync: sendGameResult } = usePostGameMutation();
  const hasSentResult = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameEndTime === null) {
      return;
    }

    const interval = setInterval(() => {
      const now = getCurrentUnixTime();
      console.log(!hasSentResult.current && now > gameEndTime);

      if (!hasSentResult.current && now > gameEndTime) {
        setStorage({ key: 'BEAT_LIST', value: userBeatHistory });
        setError('test');

        sendGameResult({
          body: { timestamp: userBeatList, team: Team.KOREA },
        })
          .then(() => {
            setError('통과');
            navigate({ to: '/result' });
          })
          .catch((err) => {
            setError(JSON.stringify(err, null, 2));
          });

        hasSentResult.current = true;
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [gameEndTime, userBeatList, sendGameResult, navigate, userBeatHistory]);

  return <div>{error}</div>;
};
