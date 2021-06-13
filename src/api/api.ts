import { oak } from '../dependencies.ts';
import {
  books as booksService,
  posts as postsService,
} from '../services/services.ts';
import { ENV } from '../common/enums/enums.ts';
import { initBooks as initBooksApi } from './books/books.api.ts';
import { initPosts as initPostsApi } from './posts/posts.api.ts';

const initApis = (Router: typeof oak.Router): oak.Router => {
  const apiRouter = new Router({
    prefix: ENV.API.V1_PATH,
  });

  const booksApi = initBooksApi({
    Router,
    booksService,
  });

  const postsApi = initPostsApi({
    Router,
    postsService,
  });

  const routes = [booksApi, postsApi];

  routes.forEach((router) => {
    apiRouter.use(router.routes(), router.allowedMethods());
  });

  return apiRouter;
};

export { initApis };
