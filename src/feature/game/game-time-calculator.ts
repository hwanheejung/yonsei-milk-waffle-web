import { getCurrentUnixTime } from '@/shared/lib/date';

export const isGameEnd = ({
  gameStartTime,
  songLength,
}: {
  gameStartTime: number;
  songLength: number;
}) => {
  const currentTime = getCurrentUnixTime();
  const songLengthMs = songLength * 1000;
  const gameEndTime = gameStartTime + songLengthMs;

  return currentTime > gameEndTime;
};
