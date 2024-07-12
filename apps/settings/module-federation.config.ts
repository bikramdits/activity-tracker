import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'settings',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
