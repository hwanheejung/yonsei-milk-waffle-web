import type { Timestamp } from '@/entities/score/Timestamp';
import { getUpdatedTimstamp } from '@/feature/game/beat-calculator';
import { cn } from '@/shared/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [clicked, setClicked] = useState(false);
  const [userBeatList, setUserBeatList] = useState<Timestamp[]>([]);

  const popUpButton = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 100);
  };

  return (
    <div className="min-h-screen background-white-100">
      <div className="flex flex-col items-center">
        <h1 className="">게임 로직 테스트</h1>
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
      </div>
    </div>
  );
}
