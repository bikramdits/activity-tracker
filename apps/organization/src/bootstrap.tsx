import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@appname/service';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient} >
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);