import type { Timestamp } from '@/entities/score/Timestamp';
import { getCurrentUnixTime } from '@/shared/lib/date';

export const getUpdatedTimstamp = ({
  userBeatList,
}: {
  userBeatList: Timestamp[];
}) => {
  return [...userBeatList, getCurrentUnixTime()];
};
