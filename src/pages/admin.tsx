import { AdminGame } from '@/widgets/admin-game';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto p-4">
      <AdminGame />
    </div>
  );
}
