import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'timesheet',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
