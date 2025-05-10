import { useState, useRef } from 'react';

interface DeviceMotionEventConstructor {
  new (type: string, eventInitDict?: DeviceMotionEventInit): DeviceMotionEvent;
  prototype: DeviceMotionEvent;
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export default function MotionCheck() {
  const [status, setStatus] = useState<'WAITING' | 'PLAYING' | 'COMPLETE'>('WAITING');
  const [movementCount, setMovementCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const userMovements = useRef<number[]>([]);

  console.log(movementCount);

  const isDeviceMotionEventWithPermission = (
    event: typeof DeviceMotionEvent
  ): event is DeviceMotionEventConstructor => {
    return 'requestPermission' in event;
  };

  const checkSensorPermission = () => {
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
      // Android 등은 권한 요청 없이 바로 사용 가능
      startDetection();
    }
  };

  const startDetection = () => {
    setStatus('PLAYING');
    userMovements.current = [];
    setMovementCount(0);
    startTime.current = Date.now();

    window.addEventListener('devicemotion', handleMotion);

    // 10초 후 자동 종료
    setTimeout(() => {
      window.removeEventListener('devicemotion', handleMotion);
      setStatus('COMPLETE');
    }, 10000);
  };

  const handleMotion = (event: DeviceMotionEvent) => {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration || startTime.current === null) return;

    const currentTime = Date.now() - startTime.current;
    const threshold = 10;

    if (Math.abs(acceleration.x ?? 0) > threshold) {
      const last = userMovements.current.at(-1);
      if (!last || currentTime - last > 200) {
        userMovements.current.push(currentTime);
        setMovementCount((prev) => prev + 1);
      }
    }
  };

  const reset = () => {
    setStatus('WAITING');
    setMovementCount(0);
    userMovements.current = [];
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">폰 흔들기 감지 테스트</h1>

      {status === 'WAITING' && (
        <>
          <p className="mb-4 text-center">
            10초 동안 핸드폰을 얼마나 많이 흔들었는지 측정해보세요.
          </p>
          <button
            type="button"
            onClick={checkSensorPermission}
            className="bg-blue-500 text-white px-6 py-3 rounded font-medium"
          >
            시작하기
          </button>
        </>
      )}

      {status === 'PLAYING' && (
        <>
          <p className="text-lg mb-2">측정 중입니다...</p>
          <p className="text-sm text-gray-600">폰을 좌우로 흔들어보세요!</p>
          <p className="mt-4 text-3xl font-bold">{movementCount}회</p>
        </>
      )}

      {status === 'COMPLETE' && (
        <>
          <p className="text-lg mb-2">측정이 COMPLETE되었습니다!</p>
          <p className="text-xl font-bold text-blue-600">총 {movementCount}회 흔들림 감지됨</p>
          <button
            type="button"
            onClick={reset}
            className="bg-blue-500 text-white px-6 py-2 mt-4 rounded font-medium"
          >
            다시 측정하기
          </button>
        </>
      )}
    </div>
  );
}
