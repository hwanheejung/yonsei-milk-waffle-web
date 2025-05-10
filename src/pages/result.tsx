import { createFileRoute } from '@tanstack/react-router';
import { getStorage } from '@/shared/lib/sessionStorage';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const Route = createFileRoute('/result')({
  component: RouteComponent,
});

function RouteComponent() {
  const data = getStorage({ key: 'BEAT_LIST' });

  return (
    <div className="min-h-screen w-full gap-8 flex flex-col justify-center items-center px-4 py-6 bg-white bg-[url('/images/result_bg.png')] bg-no-repeat bg-top bg-cover">
      <h1 className="text-xl text-white font-semibold mb-4 text-center">
        당신은 얼마나 열심히 응원했나요?
      </h1>

      {data !== null && data.length > 0 ? (
        <div className="w-full max-w-md h-64 pr-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#ccc" />
              <XAxis
                dataKey="time"
                unit="ms"
                tick={{ fontSize: 10 }}
                label={{
                  value: '시간(ms)',
                  position: 'insideBottom',
                  fontSize: 12,
                }}
              />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ fontSize: 10 }}
                labelStyle={{ fontSize: 10 }}
                itemStyle={{ fontSize: 10 }}
              />
              <Line
                type="monotone"
                dataKey="x"
                stroke="#1E90FF" // DodgerBlue
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-500 text-sm text-center">데이터가 없습니다.</p>
      )}
    </div>
  );
}
