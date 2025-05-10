import { useEffect, useState } from 'react';

export const GameVibrate = ({
  isShacked,
  resultBeatList,
}: {
  isShacked: boolean;
  resultBeatList: number[] | null;
}) => {
  const PERFECT_THRESHOLD = 500; // ms
  const GOOD_THRESHOLD = 1500; // ms

  const [signal, setSignal] = useState<'perfect' | 'good' | null>(null);

  useEffect(() => {
    if (!isShacked || !resultBeatList?.length) return;

    const handleUserAction = () => {
      const now = Date.now();
      const minDiff = Math.min(...resultBeatList.map((t) => Math.abs(now - t)));

      if ('vibrate' in navigator) {
        if (minDiff <= PERFECT_THRESHOLD) {
          navigator.vibrate([100, 50, 100]);
          setSignal('perfect');
        } else if (minDiff <= GOOD_THRESHOLD) {
          navigator.vibrate(100);
          setSignal('good');
        }
      }

      window.removeEventListener('touchstart', handleUserAction); // 한번만 실행
    };

    window.addEventListener('touchstart', handleUserAction);
    return () => window.removeEventListener('touchstart', handleUserAction);
  }, [isShacked, resultBeatList]);

  return (
    <>
      <div className="absolute top-1/3 w-full flex justify-center z-50 pointer-events-none">
        {signal === 'perfect' && (
          <div className="text-3xl font-bold text-green-500 animate-bounce">PERFECT!</div>
        )}
        {signal === 'good' && (
          <div className="text-3xl font-bold text-yellow-500 animate-bounce">GOOD!</div>
        )}
      </div>
      <button type="button" onClick={() => navigator.vibrate(100)}>
        진동 테스트
      </button>
    </>
  );
};
