import { oak } from '../../dependencies.ts';
import { ApiPath, BooksApiPath } from '../../common/enums/enums.ts';
import { IDataService } from '../../common/interfaces/interfaces.ts';
import { Book } from '../../common/types/types.ts';

type Args = {
  Router: typeof oak.Router;
  booksService: IDataService<Book>;
};

const initBooks = ({ Router, booksService }: Args): oak.Router => {
  const router = new Router({
    prefix: ApiPath.BOOKS,
  });

  router.get(BooksApiPath.ROOT, async (ctx: oak.RouterContext) => {
    ctx.response.body = await booksService.findAll();
  });

  router.post(BooksApiPath.ROOT, async (ctx: oak.RouterContext) => {
    const book = ctx.request.body() as unknown as Book;
    ctx.response.body = await booksService.create(book);
  });

  router.get(`${BooksApiPath.ROOT}:id`, async (ctx: oak.RouterContext) => {
    const bookId = ctx.params.id ?? '';
    ctx.response.body = await booksService.findOne(bookId);
  });

  router.put(BooksApiPath.ROOT, async (ctx: oak.RouterContext) => {
    const book = ctx.request.body() as unknown as Book;
    ctx.response.body = await booksService.update(book);
  });

  router.delete(`${BooksApiPath.ROOT}:id`, async (ctx: oak.RouterContext) => {
    const bookId = ctx.params.id ?? '';
    ctx.response.body = await booksService.delete(bookId);
  });

  return router;
};

export { initBooks };
