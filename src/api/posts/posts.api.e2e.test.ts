import { ApiPath, HttpCode } from '../../common/enums/enums.ts';
import { oak, superoak } from '../../dependencies.ts';
import { initPosts as initPostsApi } from './posts.api.ts';
import {
  posts as postsService
} from '../../services/services.ts';

const setUp = () => {
  const postsApiRouter = initPostsApi({
    Router: oak.Router,
    postsService,
  });

  return new oak.Application()
    .use(postsApiRouter.routes())
    .use(postsApiRouter.allowedMethods());
};

Deno.test({
  name: 'Posts api: should get posts from /posts correctly',
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
    const app = setUp();
    const request = await superoak.superoak(app);
    const response = request.get(ApiPath.posts);
    await response.expect(HttpCode.OK);
  },
});

Deno.test({
  name: 'Posts api: should get post by id = 1 from /posts/:id correctly',
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
    const app = setUp();
    const request = await superoak.superoak(app);
    const response = request.get(`${ApiPath.posts}/1`);
    await response.expect(HttpCode.OK);
  },
});

