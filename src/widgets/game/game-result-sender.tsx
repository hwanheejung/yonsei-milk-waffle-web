import { usePostGameMutation } from '@/entities/game/api/mutations';
import { Team } from '@/entities/team';
import type { Timestamp } from '@/entities/time/Timestamp';
import { getCurrentUnixTime } from '@/shared/lib/date';
import { useEffect, useRef, useState } from 'react';

export const GameResultSender = ({
  gameEndTime,
  userBeatList,
}: {
  gameEndTime: number | null;
  userBeatList: Timestamp[];
}) => {
  const [error, setError] = useState('');
  const [check, setChecked] = useState(false);
  const { mutateAsync: sendGameResult } = usePostGameMutation();
  const hasSentResult = useRef(false);

  useEffect(() => {
    if (gameEndTime === null) {
      return;
    }

    const interval = setInterval(() => {
      const now = getCurrentUnixTime();
      setChecked(!hasSentResult.current && now > gameEndTime);
      console.log(!hasSentResult.current && now > gameEndTime);
      if (!hasSentResult.current && now > gameEndTime) {
        sendGameResult({
          body: { timestamp: userBeatList, team: Team.KOREA },
        })
          .then(() => {
            setError('submitted');
          })
          .catch((err) => {
            setError(err);
          });
        hasSentResult.current = true;
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [gameEndTime, userBeatList, sendGameResult]);

  return (
    <div>
      {check}
      {error.trim().length !== 0 ? <div>Game Result: {error}</div> : null}
    </div>
  );
};
