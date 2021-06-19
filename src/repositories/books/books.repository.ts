import * as booksHelper from './helpers/books.helper.ts';
import { Book } from '../../common/models/models.ts';
import { IRepository } from '../../common/interfaces/interfaces.ts';
export class Books implements IRepository<Book> {
  private booksDataPath = new URL('./books.json', import.meta.url);

  public findAll(): Promise<Book[]> {
    return this._getBooks();
  }

  private _getBooks(): Promise<Book[]> {
    return booksHelper.getAllBooks(this.booksDataPath);
  }

  public findOne(id: string): Promise<Book | null> {
    return booksHelper.getBookById(this.booksDataPath, id);
  }

  public create(payload: Omit<Book, 'id'>): Promise<Book> {
    return booksHelper.createBook(this.booksDataPath, payload);
  }

  public update(id: string, payload: Book): Promise<Book> {
    return booksHelper.updateBook(this.booksDataPath, id, payload);
  }

  public delete(id: string): Promise<boolean> {
    return booksHelper.deleteBook(this.booksDataPath, id);
  }
}

