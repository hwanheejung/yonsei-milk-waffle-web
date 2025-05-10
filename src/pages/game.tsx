import { createFileRoute } from '@tanstack/react-router';
import { Game } from '@/widgets/game/game';

export const Route = createFileRoute('/game')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen background-white-100">
      <div className="mt-">
        <h1 className="">게임 로직 테스트</h1>
        <Game />
      </div>
    </div>
  );
}
