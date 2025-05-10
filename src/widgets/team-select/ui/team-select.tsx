import { TEAM_INFO, Team, useSelectTeamMutation } from '@/entities/team';
import { cn } from '@/shared/lib/utils';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui';
import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';

const TeamSelectForm = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team>(Team.SEOUL);
  const { mutate: selectTeam, isPending } = useSelectTeamMutation();

  const router = useRouter();

  const handleConfirm = () => {
    selectTeam(
      { team: selectedTeam },
      {
        onSuccess: () => {
          router.navigate({ to: '/game' });
        },
        onError: (error) => {
          console.error('Failed to select team:', error);
        },
      }
    );
  };

  return (
    <Card className="max-w-96">
      <CardHeader>
        <CardTitle className="text-center font-bold text-2xl">학교를 선택해주세요!</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {Object.entries(TEAM_INFO).map(([team, info]) => (
          <Button
            variant="outline"
            key={team}
            className={cn('h-32 opacity-30', selectedTeam === team && 'opacity-100')}
            onClick={() => setSelectedTeam(team as Team)}
          >
            <img src={info.image} alt={info.name} className="w-full h-24 object-contain" />
          </Button>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="default" disabled={isPending} onClick={handleConfirm}>
          {isPending ? '선택 중...' : '시작하기!'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export { TeamSelectForm };
