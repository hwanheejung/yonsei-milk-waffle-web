import { usePostGameMutation } from '@/entities/game/api/mutations';
import { Team } from '@/entities/team';
import type { Timestamp } from '@/entities/time/Timestamp';

import { Button } from '@/shared/ui';
import { setStorage } from '@/shared/lib/sessionStorage';
import { useNavigate } from '@tanstack/react-router';

export const GameResultSender = ({
  userBeatList,
  userBeatHistory,
}: {
  gameEndTime: number | null;
  userBeatList: Timestamp[];
  userBeatHistory: { time: number; x: number }[];
}) => {
  const { mutateAsync: sendGameResult } = usePostGameMutation();
  const navigate = useNavigate();

  const handleCloseSubmit = () => {
    setStorage({ key: 'BEAT_LIST', value: userBeatHistory });

    sendGameResult({
      body: { timestamp: userBeatList, team: Team.KOREA },
    }).then(() => {});
    navigate({ to: '/result' });
  };

  return <Button onClick={handleCloseSubmit}>종료하기</Button>;
};
