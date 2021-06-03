import { Books } from './books/books.service.ts';
import { Http } from './http/http.service.ts';
import { Posts } from './posts/posts.service.ts';

const http = new Http();

const books = new Books();

const posts = new Posts();

export { http, books, posts };
