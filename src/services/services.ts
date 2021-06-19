import { ENV } from '../common/enums/enums.ts';
import { books as booksRepository } from '../repositories/repositories.ts';
import { Books } from './books/books.service.ts';
import { Http } from './http/http.service.ts';
import { Posts } from './posts/posts.service.ts';

const http = new Http();

const books = new Books({
  booksRepository,
});

const posts = new Posts({
  baseUrl: ENV.API_URL.PLACEHOLDER_API,
  http,
});

export { http, books, posts };
