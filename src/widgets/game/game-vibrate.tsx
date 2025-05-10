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
    if (!isShacked || !resultBeatList || resultBeatList.length === 0) return;

    const now = Date.now();

    const timeDiffs = resultBeatList.map((beatTime) => Math.abs(now - beatTime));

    const minDiff = Math.min(...timeDiffs);

    if ('vibrate' in navigator) {
      if (minDiff <= PERFECT_THRESHOLD) {
        navigator.vibrate([100, 50, 100]); // Perfect
        setSignal('perfect');
        console.log('PERFECT');
      } else if (minDiff <= GOOD_THRESHOLD) {
        navigator.vibrate(100); // Good
        setSignal('good');
        console.log('GOOD');
      }
    }

    // 메시지는 잠깐만 보여줌
    const timer = setTimeout(() => setSignal(null), 800);
    return () => clearTimeout(timer);
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
