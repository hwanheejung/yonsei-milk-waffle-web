import { useState } from 'react';
import type { Timestamp } from '@/entities/time/Timestamp';
import { cn } from '@/shared/lib/utils';
import { getUpdatedTimstamp } from '@/feature/game/beat-calculator';

export const GameButton = ({
  userBeatList,
  setUserBeatList,
}: {
  userBeatList: Timestamp[];
  setUserBeatList: (input: Timestamp[]) => void;
}) => {
  const [clicked, setClicked] = useState(false);

  const popUpButton = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 100);
  };

  return (
    <button
      type="button"
      onClick={() => {
        popUpButton();
        setUserBeatList(getUpdatedTimstamp({ userBeatList }));
      }}
      className={cn(
        'w-40 h-40 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center transform transition-transform duration-150 ease-out',
        clicked ? 'scale-110' : 'scale-100'
      )}
    />
  );
};
