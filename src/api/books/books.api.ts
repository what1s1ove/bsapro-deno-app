import { oak } from '../../dependencies.ts';
import { ApiPath } from '../../common/enums/enums.ts';
import { IDataService } from '../../common/interfaces/interfaces.ts';
import { Book } from '../../common/models/models.ts';
interface Args {
  Router: typeof oak.Router;
  booksService: IDataService<Book>;
}

export const initBooks = ({ Router, booksService }: Args): oak.Router => {
  const router = new Router({
    prefix: ApiPath.books,
  });

  router.get(ApiPath.root, async (ctx: oak.RouterContext) => {
    try {
      ctx.response.body = await booksService.findAll();
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = { msg: err.message };
    }
  });

  router.get(ApiPath.rootById, async (ctx: oak.RouterContext) => {
    try {
      const id = ctx.params.id as string;
      ctx.response.body = await booksService.findOne(id);
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = { msg: err.message };
    }
  });

  router.post(ApiPath.root, async (ctx: oak.RouterContext) => {
    try {
      const payload = await ctx.request.body().value;
      ctx.response.body = await booksService.create(payload);
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = { msg: err.message };
    }
  });

  router.put(ApiPath.root, async (ctx: oak.RouterContext) => {
    try {
      const id = ctx.params.id as string;
      const payload = await ctx.request.body().value;
      ctx.response.body = await booksService.update(id, payload);
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = { msg: err.message };
    }
  });

  router.delete(ApiPath.root, async (ctx: oak.RouterContext) => {
    try {
      const id = ctx.params.id as string;
      ctx.response.body = await booksService.delete(id);
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = { msg: err.message };
    }
  });

  return router;
};

