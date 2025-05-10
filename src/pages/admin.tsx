import { AdminGame } from '@/widgets/admin-game';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative mx-auto p-4 min-h-dvh flex flex-col">
      <img
        src="/images/toyou_bg.gif"
        alt="toyou_bg"
        className="absolute inset-0 w-full h-full object-cover opacity-80 -z-10"
      />
      <AdminGame />
    </div>
  );
}
