import { readFile, writeFile } from '../../helpers/helpers.ts';
import { Book } from '../../common/types/types.ts';
import { IRepository } from '../../common/interfaces/interfaces.ts';

const booksDataPath = new URL('./books.json', import.meta.url).pathname;

class Books implements IRepository<Book> {
  public findAll(): Promise<Book[]> {
    return this._getBooks();
  }

  public async findOne(id: string): Promise<Book | null> {
	const books = await this._getBooks();
	const book = books.find(book => book.id === id);

	return book ?? null;
  }

  public async create(book: Book): Promise<Book> {
	const books = await this._getBooks();
	const updatedBooks = await this._saveBooks([...books, book]);
	const updatedBook = updatedBooks.find(storedBook => storedBook.id === book.id) ?? null;

	return updatedBook ?? book;
  }

  public async update(book: Book): Promise<Book> {
	const books = await this._getBooks();
	const booksToUpdate = books.map(storedBook => {
		if (storedBook.id === book.id) {
			return book;
		}
		return storedBook
	});
	const updatedBooks = await this._saveBooks(booksToUpdate);
	const updatedBook = updatedBooks.find(storedBook => storedBook.id === book.id) ?? null;

	return updatedBook ?? book;
  }

  public async delete(id: string): Promise<boolean> {
	const books = await this._getBooks();
	const bookToDelete = books.find(storedBook => storedBook.id === id);
	if (!bookToDelete) {
		return false;
	}
	const booksToUpdate = books.filter(storedBook => storedBook.id !== bookToDelete.id);
	await this._saveBooks(booksToUpdate);

	return true;
  }

  private async _saveBooks(books: Book[]): Promise<Book[]> {
	await writeFile<Book[]>(booksDataPath, books);
	const updatedBooks = await readFile(booksDataPath);

	return JSON.parse(updatedBooks);
  }

  private async _getBooks(): Promise<Book[]> {
    const books = await readFile(booksDataPath);

    return JSON.parse(books);
  }
}

export { Books };
