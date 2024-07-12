import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'policies',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
