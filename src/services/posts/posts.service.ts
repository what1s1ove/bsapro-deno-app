import { ApiPath, HttpMethod, BooksApiPath } from '../../common/enums/enums.ts';
import { IRepository } from '../../common/interfaces/interfaces.ts';
import { Post } from '../../common/types/types.ts';
import { Http } from '../http/http.service.ts';

interface Constructor {
  baseUrl: string;
  http: Http;
}
export class Posts implements Partial<IRepository<Post>> {
  #baseUrl: string;

  #http: Http;

  constructor({ baseUrl, http }: Constructor) {
    this.#baseUrl = baseUrl;
    this.#http = http;
  }

  public findAll(): Promise<Post[]> {
    return this.#http.load<Post[]>(this._getUrl(), {
      method: HttpMethod.GET,
    });
  }

  private _getUrl(path: string = BooksApiPath.ROOT) {
    return this.#baseUrl + ApiPath.POSTS + path;
  }
}
