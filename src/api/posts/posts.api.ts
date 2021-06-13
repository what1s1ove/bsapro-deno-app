import { oak } from '../../dependencies.ts';
import { ApiPath, HttpCode } from '../../common/enums/enums.ts';
import { IDataService } from '../../common/interfaces/interfaces.ts';
import { Post } from '../../common/models/models.ts';

interface Args {
  Router: typeof oak.Router;
  postsService: IDataService<Post>;
}

export const initPosts = ({ Router, postsService }: Args): oak.Router => {
  const router = new Router({
    prefix: ApiPath.posts,
  });

  router.get(ApiPath.root, async (ctx: oak.RouterContext) => {
    try {
      ctx.response.body = await postsService.findAll();
    } catch (err) {
      ctx.response.status = HttpCode.INTERNAL_SERVER_ERROR;
      ctx.response.body = { msg: err.message };
    }
  });

  router.get(ApiPath.rootById, async (ctx: oak.RouterContext) => {
    const id = ctx.params.id as string;
    ctx.response.body = await postsService.findOne(id);
  });

  router.post(ApiPath.root, async (ctx: oak.RouterContext) => {
    const payload = await ctx.request.body().value;
    ctx.response.body = await postsService.create(payload);
  });

  router.put(ApiPath.root, async (ctx: oak.RouterContext) => {
    const id = ctx.params.id as string;
    const payload = await ctx.request.body().value;
    ctx.response.body = await postsService.update(id, payload);
  });

  router.delete(ApiPath.root, async (ctx: oak.RouterContext) => {
    const id = ctx.params.id as string;
    ctx.response.body = await postsService.delete(id);
  });

  return router;
};

