import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'organization',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
