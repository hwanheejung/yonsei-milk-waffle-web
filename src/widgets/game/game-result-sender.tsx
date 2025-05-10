import { usePostGameMutation } from '@/entities/game/api/mutations';
import { Team } from '@/entities/team';
import type { Timestamp } from '@/entities/time/Timestamp';
import { getCurrentUnixTime } from '@/shared/lib/date';
import { useEffect, useRef } from 'react';

export const GameResultSender = ({
  gameEndTime,
  userBeatList,
}: {
  gameEndTime: number | null;
  userBeatList: Timestamp[];
}) => {
  const { mutateAsync: sendGameResult } = usePostGameMutation();
  const hasSentResult = useRef(false);

  useEffect(() => {
    if (gameEndTime === null) {
      return;
    }

    const interval = setInterval(() => {
      const now = getCurrentUnixTime();
      console.log(!hasSentResult.current && now > gameEndTime);
      if (!hasSentResult.current && now > gameEndTime) {
        sendGameResult({
          body: { timestamp: userBeatList, team: Team.KOREA },
        });
        hasSentResult.current = true;
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [gameEndTime, userBeatList, sendGameResult]);

  return null;
};
