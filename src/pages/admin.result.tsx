import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/result')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>게임 결과 페이지</div>;
}
