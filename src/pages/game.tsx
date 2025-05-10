import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/game')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>게임 진행되는 페이지 (클릭 or 흔들기)</div>;
}
