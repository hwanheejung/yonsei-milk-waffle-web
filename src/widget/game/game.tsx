import { GameButton } from './game-button';
import { GameResultSender } from './game-result-sender';
import { useState } from 'react';
import type { Timestamp } from '@/entities/time/Timestamp';
import { GameEndCalculator } from './game-end-calculator';

export const Game = () => {
  const [userBeatList, setUserBeatList] = useState<Timestamp[]>([]);
  const [gameEndTime, setGameEndTime] = useState<number | null>(null);

  return (
    <>
      <GameButton userBeatList={userBeatList} setUserBeatList={setUserBeatList} />
      <GameEndCalculator setGameEndTime={setGameEndTime} />
      <GameResultSender gameEndTime={gameEndTime} userBeatList={userBeatList} />
    </>
  );
};
