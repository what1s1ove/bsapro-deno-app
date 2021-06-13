import { IRepository } from "../common/interfaces/interfaces.ts";
import { Book } from "../common/models/models.ts";
import { Books } from './books/books.repository.ts';

export const books = new Books() as IRepository<Book>;
