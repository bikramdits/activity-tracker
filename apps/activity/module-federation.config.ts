import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'activity',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
