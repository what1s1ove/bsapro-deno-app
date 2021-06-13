import * as dotenv from 'https://deno.land/x/dotenv@v2.0.0/mod.ts';
import { denon } from './src/dependencies.ts';

const Permission = {
  ENV: 'env',
  NET: 'net',
  READ: 'read',
  WRITE: 'write',
} as const;

const config: denon.DenonConfig = {
  scripts: {
    dev: {
      cmd: 'deno run src/server.ts',
      allow: [Permission.NET, Permission.ENV, Permission.READ, Permission.WRITE],
      env: dotenv.config(),
      unstable: true,
    },
    test: {
      cmd: 'deno test',
      allow: [Permission.NET, Permission.ENV, Permission.READ],
      env: dotenv.config(),
      unstable: true,
    },
  },
};

export default config;
