import { Game } from '@/widget/game/game';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: async () => {
    throw redirect({ to: '/select-team' });
  },
});

function RouteComponent() {
  return (
    <div className="min-h-screen background-white-100">
      <div className="flex flex-col items-center">
        <h1 className="">게임 로직 테스트</h1>
        <Game />
      </div>
    </div>
  );
}
