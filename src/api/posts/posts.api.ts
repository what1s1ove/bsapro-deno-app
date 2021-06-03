import { oak } from '../../dependencies.ts';
import { ApiPath, PostApiPath } from '../../common/enums/enums.ts';
import { IDataService } from '../../common/interfaces/interfaces.ts';
import { Post } from '../../common/types/types.ts';

type Args = {
  Router: typeof oak.Router;
  postsService: Partial<IDataService<Post>>;
};

const initPosts = ({ Router, postsService }: Args): oak.Router => {
  const router = new Router({
    prefix: ApiPath.POSTS,
  });

  router.get(PostApiPath.ROOT, async (ctx: oak.RouterContext) => {
    ctx.response.body = await postsService.findAll?.();
  });

  return router;
};

export { initPosts };
