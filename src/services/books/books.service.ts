import {
  IDataService,
  IRepository,
} from '../../common/interfaces/interfaces.ts';
import { Book } from '../../common/types/types.ts';

type Constructor = {
  booksRepository: Partial<IRepository<Book>>;
};

class Books implements Partial<IDataService<Book>> {
  #booksRepository: IRepository<Book>;

  constructor({ booksRepository }: Constructor) {
    this.#booksRepository = <IRepository<Book>>booksRepository;
  }

  public findAll(): Promise<Book[]> {
    return this.#booksRepository.findAll();
  }
}

export { Books };
