import { oak } from '../../dependencies.ts';
import { ApiPath, PostApiPath } from '../../common/enums/enums.ts';
import { IDataService } from '../../common/interfaces/interfaces.ts';
import { Post } from '../../common/types/types.ts';

type Args = {
  Router: typeof oak.Router;
  postsService: IDataService<Post>;
};

const initPosts = ({ Router, postsService }: Args): oak.Router => {
  const router = new Router({
    prefix: ApiPath.POSTS,
  });

  router.get(PostApiPath.ROOT, async (ctx: oak.RouterContext) => {
    ctx.response.body = await postsService.findAll();
  });

  router.post(PostApiPath.ROOT, async (ctx: oak.RouterContext) => {
    const post = ctx.request.body() as unknown as Post;
    ctx.response.body = await postsService.create(post);
  });

  router.get(`${PostApiPath.ROOT}:id`, async (ctx: oak.RouterContext) => {
    const postId = ctx.params.id ?? '';
    ctx.response.body = await postsService.findOne(postId);
  });

  router.put(PostApiPath.ROOT, async (ctx: oak.RouterContext) => {
    const post = ctx.request.body() as unknown as Post;
    ctx.response.body = await postsService.update(post);
  });

  router.delete(`${PostApiPath.ROOT}:id`, async (ctx: oak.RouterContext) => {
    const postId = ctx.params.id ?? '';
    ctx.response.body = await postsService.delete(postId);
  });

  return router;
};

export { initPosts };
