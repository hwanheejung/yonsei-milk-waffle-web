import { createFileRoute } from '@tanstack/react-router';
import { Game } from '@/widget/game/game';
export const Route = createFileRoute('/')({
  component: RouteComponent,
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
