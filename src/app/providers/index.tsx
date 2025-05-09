import type { PropsWithChildren } from 'react';

import { TanstackQueryProvider } from './tanstack-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <TanstackQueryProvider>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </TanstackQueryProvider>
  );
};

export { Providers };
