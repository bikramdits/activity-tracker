import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';


import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@appname/service';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <QueryClientProvider client = {queryClient}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
