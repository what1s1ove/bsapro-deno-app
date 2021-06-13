import { ApiPath, HttpCode } from '../../common/enums/enums.ts';
import { oak, superoak } from '../../dependencies.ts';
import { initBooks as initBooksApi } from './books.api.ts';
import {
  books as booksService
} from '../../services/services.ts';

const setUp = () => {
  const booksApiRouter = initBooksApi({
    Router: oak.Router,
    booksService,
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
    const response = request.get(ApiPath.books);
    await response.expect(HttpCode.OK);
  },
});

Deno.test({
  name: 'Books api: should get book by id = 1 from /books/:id correctly',
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
    const app = setUp();
    const request = await superoak.superoak(app);
    const response = request.get(`${ApiPath.books}/1`);
    await response.expect(HttpCode.OK);
  },
});

Deno.test({
  name: 'Books api: should get book by id = 5 from /books/:id correctly(failed)',
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
    const app = setUp();
    const request = await superoak.superoak(app);
    const response = request.get(`${ApiPath.books}/5`);
    await response.expect(HttpCode.OK);
  },
});

Deno.test({
  name: 'Books api: should create new book from /books correctly',
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
    const app = setUp();
    const request = await superoak.superoak(app);
    const response = request.post(ApiPath.books).send({ name: "Typescript" });
    await response.expect(HttpCode.CREATED);
  },
});
