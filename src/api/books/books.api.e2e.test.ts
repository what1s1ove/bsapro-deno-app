import { ApiPath, HttpCode } from '../../common/enums/enums.ts';
import { Book } from '../../common/types/types.ts';
import { IDataService } from '../../common/interfaces/interfaces.ts';
import { oak, superoak } from '../../dependencies.ts';
import { initBooks as initBooksApi } from './books.api.ts';

const MOCKED_BOOKS: Book[] = [
  {
    id: '1',
    name: 'DDD',
  },
];

const setUp = () => {
  const booksApiRouter = initBooksApi({
    Router: oak.Router,
    booksService: <IDataService<Book>>{
      findAll() {
        return Promise.resolve(MOCKED_BOOKS);
      },
    },
  });

  return new oak.Application()
    .use(booksApiRouter.routes())
    .use(booksApiRouter.allowedMethods());
};

Deno.test({
  name: 'Books api: should get books from /books correctly',
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
    const app = setUp();
    const request = await superoak.superoak(app);

    const response = request.get(ApiPath.BOOKS);

    await response.expect(HttpCode.OK).expect(MOCKED_BOOKS);
  },
});
