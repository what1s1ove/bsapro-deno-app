import * as dotenv from 'https://deno.land/x/dotenv/mod.ts';
import { denon } from './src/dependencies.ts';

const Permission = {
  ENV: 'env',
  NET: 'net',
  READ: 'read',
} as const;

const config: denon.DenonConfig = {
  scripts: {
    dev: {
      cmd: 'deno run src/server.ts',
      allow: [Permission.NET, Permission.ENV, Permission.READ],
      env: dotenv.config(),
      unstable: true,
    },
    test: {
      cmd: 'deno test',
      allow: [Permission.NET, Permission.ENV],
      env: dotenv.config(),
      unstable: true,
    },
  },
};

export default config;
