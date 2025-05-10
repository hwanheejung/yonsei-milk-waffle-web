import { useEffect, useState } from 'react';

type TeamScore = {
  team: string;
  score: number;
};

type ResultData = {
  scores: TeamScore[];
};

const dummyData: ResultData = {
  scores: [
    { team: 'SEOUL', score: 130 },
    { team: 'KOREA', score: 100 },
    { team: 'YONSEI', score: 120 },
    { team: 'KAIST', score: 110 },
  ],
};

const ResultModal = () => {
  const [resultData] = useState<ResultData>(dummyData);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const maxScore = Math.max(...resultData.scores.map((s) => s.score));

  // 점수 레벨을 오름차순으로 정렬하고 0을 추가
  const scoreLevels = [
    0,
    ...Array.from(new Set(resultData.scores.map((s) => s.score))).sort((a, b) => a - b),
  ];

  useEffect(() => {
    const animate = async () => {
      for (let i = 0; i < scoreLevels.length; i++) {
        setCurrentLevel(i);
        // 각 레벨에서 1초 대기
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
    animate();
  }, [scoreLevels.length]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col justify-between p-8 w-full h-[60%] text-center bg-[url('/images/result-background.png')] bg-cover bg-center">
        <h2 className="text-2xl font-bold mb-10 text-white">게임 종료!</h2>
        <div className="flex justify-center items-end gap-8 h-[300px] mb-10">
          {resultData.scores.map((teamScore) => {
            const currentMaxScore = scoreLevels[currentLevel];
            const displayScore = Math.min(teamScore.score, currentMaxScore);
            const height = (displayScore / maxScore) * 250;

            return (
              <div key={teamScore.team} className="flex flex-col items-center">
                <div
                  className="w-16 bg-blue-500 rounded-t-lg transition-all duration-1000 ease-out"
                  style={{
                    height: `${height}px`,
                  }}
                />
                <span className="mt-2 text-lg font-bold text-white">{teamScore.team}</span>
                <span className="text-sm text-white">{teamScore.score}점</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { ResultModal };
