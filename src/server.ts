import { oak } from './dependencies.ts';
import { ENV } from './common/enums/enums.ts';
import { initApis } from './api/api.ts';

const apiRouter = initApis(oak.Router);

new oak.Application().use(apiRouter.routes()).listen({
  port: ENV.APP.SERVER_PORT,
});

console.log(`Listening to connections on port — ${ENV.APP.SERVER_PORT}`);
