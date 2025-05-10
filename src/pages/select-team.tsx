import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/select-team')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/select-team"!</div>;
}
