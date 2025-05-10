import { cn } from '@/shared/lib/utils';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui';
import { useState } from 'react';

const TeamSelectForm = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(TEAMS[0].name);

  return (
    <Card className="max-w-96">
      <CardHeader>
        <CardTitle className="text-center font-bold text-2xl">학교를 선택해주세요!</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {TEAMS.map((team) => (
          <Button
            variant="outline"
            key={team.name}
            className={cn('h-32 opacity-30', selectedTeam === team.name && 'opacity-100')}
            onClick={() => setSelectedTeam(team.name)}
          >
            <img src={team.image} alt={team.name} className="w-full h-24 object-contain" />
          </Button>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="default"
          disabled={!selectedTeam}
          onClick={() => {
            // TODO: 게임 시작 로직
            console.log('Selected team:', selectedTeam);
          }}
        >
          시작하기!
        </Button>
      </CardFooter>
    </Card>
  );
};

export { TeamSelectForm };

const TEAMS = [
  {
    name: '서울대',
    image: '/images/seoul.png',
  },
  {
    name: '연세대',
    image: '/images/yonsei.svg',
  },
  {
    name: '고려대',
    image: '/images/korea.png',
  },
  {
    name: '카이스트',
    image: '/images/kaist.png',
  },
];
