import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/app';
import { globalStore } from './app/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@appname/service';
import { AuthProvider } from './app/context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={globalStore}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
