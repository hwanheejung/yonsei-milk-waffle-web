import type { Timestamp } from '@/entities/time/Timestamp';
import { getUpdatedTimstamp } from '@/feature/game/beat-calculator';
import { useState, useRef, useEffect, useCallback } from 'react';

interface DeviceMotionEventConstructor {
  new (type: string, eventInitDict?: DeviceMotionEventInit): DeviceMotionEvent;
  prototype: DeviceMotionEvent;
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

const isDeviceMotionEventWithPermission = (
  event: typeof DeviceMotionEvent
): event is DeviceMotionEventConstructor => {
  return 'requestPermission' in event;
};

export const GameMotionCheck = ({
  userBeatList,
  setUserBeatList,
}: {
  userBeatList: Timestamp[];
  setUserBeatList: (input: Timestamp[]) => void;
}) => {
  const [countNumber, setCountNumber] = useState(0);
  const startTime = useRef<number | null>(null);
  const userMovements = useRef<number[]>([]);
  const isIgnore = useRef(false);

  const handleMotion = useCallback(
    (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration || startTime.current === null) return;

      const currentTime = Date.now() - startTime.current;
      const x = acceleration.x ?? 0;

      const threshold = 60;

      if (isIgnore.current) {
        if (Math.abs(x) < threshold) {
          isIgnore.current = false;
        }
        return;
      }

      if (Math.abs(x) >= threshold) {
        const last = userMovements.current.at(-1);
        if (!last || currentTime - last > 200) {
          userMovements.current.push(currentTime);
          setUserBeatList(getUpdatedTimstamp({ userBeatList }));
          setCountNumber((prev) => prev + 1);
          isIgnore.current = true;
        }
      }
    },
    [setUserBeatList, userBeatList]
  );

  const startDetection = useCallback(() => {
    userMovements.current = [];
    setUserBeatList([]);
    startTime.current = Date.now();

    window.addEventListener('devicemotion', handleMotion);

    setTimeout(() => {
      window.removeEventListener('devicemotion', handleMotion);
    }, 10000);
  }, [handleMotion, setUserBeatList]);

  const checkSensorPermission = useCallback(() => {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      isDeviceMotionEventWithPermission(DeviceMotionEvent)
    ) {
      if (DeviceMotionEvent.requestPermission) {
        DeviceMotionEvent.requestPermission()
          .then((response) => {
            if (response === 'granted') {
              startDetection();
              console.log('접속 성공');
            } else {
              alert('센서 접근 권한이 필요합니다.');
            }
          })
          .catch(console.error);
      }
    } else {
      startDetection();
    }
  }, [startDetection]);

  useEffect(() => {
    checkSensorPermission();
  }, [checkSensorPermission]);

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">폰 흔들기 감지 테스트</h1>
      <p className="text-lg mb-2">측정 중입니다...</p>
      <p className="text-sm text-gray-600">폰을 좌우로 흔들어보세요!</p>
      <div className="mt-4 flex flex-col gap-2">
        <div>{countNumber} 회</div>
        {userBeatList.map((item) => (
          <div key={`game-${item}`}>{item}</div>
        ))}
      </div>
    </div>
  );
};
