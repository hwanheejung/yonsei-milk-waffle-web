import { GameResultSender } from './game-result-sender';
import { useState } from 'react';
import type { Timestamp } from '@/entities/time/Timestamp';
import { GameEndCalculator } from './game-end-calculator';
import { GameMotionCheck } from './game-motion-check';

export const Game = () => {
  const [userBeatList, setUserBeatList] = useState<Timestamp[]>([]);
  const [gameEndTime, setGameEndTime] = useState<number | null>(null);

  return (
    <>
      <div>{gameEndTime}</div>
      <GameEndCalculator setGameEndTime={setGameEndTime} />
      <GameResultSender gameEndTime={gameEndTime} userBeatList={userBeatList} />
      <GameMotionCheck userBeatList={userBeatList} setUserBeatList={setUserBeatList} />
    </>
  );
};
