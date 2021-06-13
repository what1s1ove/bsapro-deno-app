import {
  IDataService,
  IRepository,
} from '../../common/interfaces/interfaces.ts';
import { Book } from '../../common/types/types.ts';

type Constructor = {
  booksRepository: IRepository<Book>;
};

class Books implements IDataService<Book> {
  #booksRepository: IRepository<Book>;

  constructor({ booksRepository }: Constructor) {
    this.#booksRepository = <IRepository<Book>>booksRepository;
  }

  public findAll(): Promise<Book[]> {
    return this.#booksRepository.findAll();
  }

  public findOne(id: string): Promise<Book | null> {
    return this.#booksRepository.findOne(id);
  }

  public create(book: Book): Promise<Book> {
    return this.#booksRepository.create(book);
  }

  public update(book: Book): Promise<Book> {
    return this.#booksRepository.update(book);
  }

  public delete(id: string): Promise<boolean> {
    return this.#booksRepository.delete(id);
  }
}

export { Books };
