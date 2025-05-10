import type { Timestamp } from '@/entities/time/Timestamp';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { Dispatch } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

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
  setUserBeatList: Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [countNumber, setCountNumber] = useState(0);
  const [number, setNumber] = useState(0);
  const [graphData, setGraphData] = useState<{ time: number; x: number }[]>([]);
  const startTime = useRef<number | null>(null);
  const userMovements = useRef<number[]>([]);
  const isIgnore = useRef(false);

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration || startTime.current === null) return;

    const currentTime = Date.now() - startTime.current;
    const x = acceleration.x ?? 0;

    const threshold = 40;
    setGraphData((prev) => [...prev, { time: currentTime, x }]);

    // ignore 중이면 감지하지 않음
    if (isIgnore.current) {
      // 다시 threshold 아래로 떨어졌는지 확인
      if (Math.abs(x) < threshold) {
        isIgnore.current = false; // 감지 다시 허용
      }
      return;
    }

    // threshold 초과시 감지 + ignore 활성화
    if (Math.abs(x) >= threshold) {
      const last = userMovements.current.at(-1);
      if (!last || currentTime - last > 200) {
        userMovements.current.push(currentTime);
        setCountNumber((prev) => prev + 1);
        isIgnore.current = true; // 감지 일시 정지
      }
    }
  }, []);

  const startDetection = useCallback(() => {
    userMovements.current = [];
    setUserBeatList([]);
    startTime.current = Date.now();

    window.addEventListener('devicemotion', handleMotion);
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
      <div>{number}</div>
      <button
        type="button"
        onClick={() => {
          setNumber((prev) => prev + 1);
        }}
      >
        클릭해요
      </button>
      <div className="w-full h-64 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="time" unit="ms" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="x" stroke="#ff7300" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
