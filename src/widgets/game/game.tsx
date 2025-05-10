import { GameResultSender } from './game-result-sender';
import { useState } from 'react';
import type { Timestamp } from '@/entities/time/Timestamp';
import { GameEndCalculator } from './game-end-calculator';
import { GameMotionCheck } from './game-motion-check';

export const Game = () => {
  const [userBeatList, setUserBeatList] = useState<Timestamp[]>([]);
  const [gameEndTime, setGameEndTime] = useState<number | null>(null);
  const [userBeatHistory, setUserBeatHistory] = useState<{ time: number; x: number }[]>([]);

  return (
    <>
      <div>{gameEndTime}</div>
      <GameEndCalculator setGameEndTime={setGameEndTime} />
      <GameResultSender
        gameEndTime={gameEndTime}
        userBeatList={userBeatList}
        userBeatHistory={userBeatHistory}
      />
      <GameMotionCheck setUserBeatList={setUserBeatList} setUserBeatHistory={setUserBeatHistory} />
    </>
  );
};
