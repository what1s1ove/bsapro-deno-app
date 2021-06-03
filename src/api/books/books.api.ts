import { oak } from '../../dependencies.ts';
import { ApiPath, BooksApiPath } from '../../common/enums/enums.ts';
import { IDataService } from '../../common/interfaces/interfaces.ts';
import { Book } from '../../common/types/types.ts';

type Args = {
  Router: typeof oak.Router;
  booksService: Partial<IDataService<Book>>;
};

const initBooks = ({ Router, booksService }: Args): oak.Router => {
  const router = new Router({
    prefix: ApiPath.BOOKS,
  });

  router.get(BooksApiPath.ROOT, async (ctx: oak.RouterContext) => {
    ctx.response.body = await booksService.findAll?.();
  });

  return router;
};

export { initBooks };
