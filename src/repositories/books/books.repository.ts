import { readFile } from '../../helpers/helpers.ts';
import { Book } from '../../common/types/types.ts';
import { IRepository } from '../../common/interfaces/interfaces.ts';

const booksDataPath = new URL('./books.json', import.meta.url).pathname;

class Books implements Partial<IRepository<Book>> {
  public findAll(): Promise<Book[]> {
    return this._getBooks();
  }

  private async _getBooks(): Promise<Book[]> {
    const books = await readFile(booksDataPath);

    return JSON.parse(books);
  }
}

export { Books };
