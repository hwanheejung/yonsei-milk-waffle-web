import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div>
      <div>Hello "__root"!</div>
      <Outlet />
    </div>
  );
}
