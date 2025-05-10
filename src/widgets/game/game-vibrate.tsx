import { useEffect, useRef, useState } from 'react';

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
  const vibrateButtonRef = useRef<HTMLButtonElement>(null);
  const goodVibrateButtonRef = useRef<HTMLButtonElement>(null);
  const perfectVibrateButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isShacked || !resultBeatList?.length) return;

    const now = Date.now();
    const minDiff = Math.min(...resultBeatList.map((t) => Math.abs(now - t)));

    if (minDiff <= PERFECT_THRESHOLD) {
      setSignal('perfect');
      perfectVibrateButtonRef.current?.click();
    } else if (minDiff <= GOOD_THRESHOLD) {
      setSignal('good');
      goodVibrateButtonRef.current?.click();
    }

    const timer = setTimeout(() => setSignal(null), 300);
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
      <button ref={vibrateButtonRef} type="button" onClick={() => navigator.vibrate(300)}>
        진동 모드 켜기
      </button>
      <button
        ref={goodVibrateButtonRef}
        type="button"
        onClick={() => navigator.vibrate(150)}
        className="hidden"
      >
        GOOD 진동
      </button>
      <button
        ref={perfectVibrateButtonRef}
        type="button"
        onClick={() => navigator.vibrate([300, 100, 300])}
        className="hidden"
      >
        PERFECT 진동
      </button>
    </>
  );
};
