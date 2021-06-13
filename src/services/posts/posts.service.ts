import { ApiPath, HttpMethod, PostApiPath } from '../../common/enums/enums.ts';
import { IRepository } from '../../common/interfaces/interfaces.ts';
import { Post } from '../../common/types/types.ts';
import { Http } from '../http/http.service.ts';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Posts implements IRepository<Post> {
  #baseUrl: string;

  #http: Http;

  constructor({ baseUrl, http }: Constructor) {
    this.#baseUrl = baseUrl;
    this.#http = http;
  }

  public findAll(): Promise<Post[]> {
    return this.#http.load<Post[]>(this._getUrl(), {
      method: HttpMethod.GET
    });
  }

  public findOne(id: string): Promise<Post> {
    return this.#http.load<Post>(this._getUrl(this._attachIdToRootPath(id)), {
      method: HttpMethod.GET
    });
  }

  public create(post: Post): Promise<Post> {
    return this.#http.load<Post>(this._getUrl(), {
      method: HttpMethod.POST,
      body: JSON.stringify(post)
    });
  }

  public update(post: Post): Promise<Post> {
    return this.#http.load<Post>(this._getUrl(this._attachIdToRootPath(post.id)), {
      method: HttpMethod.PUT,
      body: JSON.stringify(post)
    });
  }

  public delete(id: string): Promise<boolean> {
    return this.#http.load<boolean>(this._getUrl(this._attachIdToRootPath(id)), {
      method: HttpMethod.DELETE
    });
  }

  private _getUrl(path: string = PostApiPath.ROOT) {
    return this.#baseUrl + ApiPath.POSTS + path;
  }

  private _attachIdToRootPath(id: string): string {
    return `${PostApiPath.ROOT}${id}`;
  }
}

export { Posts };
