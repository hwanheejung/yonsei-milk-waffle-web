import { TEAM_INFO, Team } from '@/entities/team';
import { cn } from '@/shared/lib/utils';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui';
import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';

const TeamSelectForm = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(TEAM_INFO[Team.SEOUL].name);

  const router = useRouter();

  return (
    <Card className="max-w-96">
      <CardHeader>
        <CardTitle className="text-center font-bold text-2xl">학교를 선택해주세요!</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {Object.values(TEAM_INFO).map((team) => (
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
            // TODO: zustand 에 selectedTeam 저장
            router.navigate({ to: '/game' });
          }}
        >
          시작하기!
        </Button>
      </CardFooter>
    </Card>
  );
};

export { TeamSelectForm };
