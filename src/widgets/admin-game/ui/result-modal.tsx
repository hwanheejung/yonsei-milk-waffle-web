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

// 숫자 카운터 애니메이션을 위한 커스텀 훅
const useCounter = (target: number, duration = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
};

const ResultModal = () => {
  const [resultData] = useState<ResultData>(dummyData);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const maxScore = Math.max(...resultData.scores.map((s) => s.score));

  const scoreLevels = [
    0,
    ...Array.from(new Set(resultData.scores.map((s) => s.score))).sort((a, b) => a - b),
  ];

  // 각 팀의 현재 점수에 대한 카운터
  const seoulCounter = useCounter(
    Math.min(resultData.scores[0].score, scoreLevels[currentLevel]),
    1000
  );
  const koreaCounter = useCounter(
    Math.min(resultData.scores[1].score, scoreLevels[currentLevel]),
    1000
  );
  const yonseiCounter = useCounter(
    Math.min(resultData.scores[2].score, scoreLevels[currentLevel]),
    1000
  );
  const kaistCounter = useCounter(
    Math.min(resultData.scores[3].score, scoreLevels[currentLevel]),
    1000
  );

  useEffect(() => {
    const animate = async () => {
      for (let i = 0; i < scoreLevels.length; i++) {
        setCurrentLevel(i);
        // 애니메이션 시간 + 대기 시간
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    };
    animate();
  }, [scoreLevels.length]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col justify-between p-8 w-full h-[60%] text-center bg-[url('/images/result-background.png')] bg-cover bg-center">
        <h2 className="text-2xl font-bold mb-10 text-white">게임 종료!</h2>
        <div className="flex justify-center items-end gap-8 h-[300px] mb-10">
          {resultData.scores.map((teamScore, index) => {
            const currentMaxScore = scoreLevels[currentLevel];
            const displayScore = Math.min(teamScore.score, currentMaxScore);
            const height = (displayScore / maxScore) * 250;
            const animatedScore = [seoulCounter, koreaCounter, yonseiCounter, kaistCounter][index];

            return (
              <div key={teamScore.team} className="flex flex-col items-center">
                <div
                  className="w-16 bg-blue-500 rounded-t-lg transition-all duration-1000 ease-out"
                  style={{
                    height: `${height}px`,
                  }}
                />
                <span className="mt-2 text-lg font-bold text-white">{teamScore.team}</span>
                <span className="text-2xl text-white">{animatedScore}점</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { ResultModal };
