import { StrictMode } from 'react';

import './styles/index.css';
import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { router } from './routes/router';
import { Providers } from './providers';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
