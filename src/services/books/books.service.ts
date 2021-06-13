import {
  IDataService,
  IRepository,
} from '../../common/interfaces/interfaces.ts';
import { Book } from '../../common/models/models.ts';

interface Constructor {
  booksRepository: IRepository<Book>;
}
export class Books implements IDataService<Book> {
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

  public create(payload: Omit<Book, 'id'>): Promise<Book> {
    return this.#booksRepository.create(payload);
  }

  public update(id: string, payload: Book): Promise<Book> {
    return this.#booksRepository.update(id, payload);
  }

  public delete(id: string): Promise<boolean> {
    return this.#booksRepository.delete(id);
  }
}
