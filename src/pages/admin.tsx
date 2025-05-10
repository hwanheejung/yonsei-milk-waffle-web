import { AdminGame } from '@/widgets/admin-game';
import { AdminReady } from '@/widgets/admin-ready';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-dvh flex flex-col max-w-[1400px] mx-auto">
      <AdminReady />
      <GamePage />
    </div>
  );
}

const GamePage = () => (
  <>
    <header className="flex items-center justify-start bg-transparent">
      <img src="/images/logo.png" alt="쉐킷투유 로고" className="w-60 object-center" />
    </header>
    <div className="p-4 h-full flex flex-col">
      <img
        src="/images/toyou_bg.gif"
        alt="toyou_bg"
        className="fixed inset-0 w-full h-full object-cover opacity-80 -z-10"
      />
      <AdminGame />
    </div>
  </>
);
