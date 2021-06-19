import { v4 } from 'https://deno.land/std@0.98.0/uuid/mod.ts';
import { Http } from '../http/http.service.ts';
import { ApiPath, HttpMethod } from '../../common/enums/enums.ts';
import { IRepository } from '../../common/interfaces/interfaces.ts';
import { Post } from '../../common/models/models.ts';

interface Constructor {
  baseUrl: string;
  http: Http;
}
export class Posts implements IRepository<Post> {
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

  public findOne(id: string): Promise<Post> {
    return this.#http.load<Post>(this._getUrl(id), {
      method: HttpMethod.GET,
    });
  }

  public create(payload: Omit<Post, 'id'>): Promise<Post> {
    return Promise.resolve({ id: v4.generate(), ...payload }) as Promise<Post>;
  }

  public update(id: string, payload: Post): Promise<Post> {
    return Promise.resolve({ ...payload }) as Promise<Post>;
  }

  public delete(id: string): Promise<boolean> {
    return Promise.resolve(true) as Promise<boolean>;
  }

  private _getUrl(path = '') {
    return this.#baseUrl + ApiPath.POSTS + ApiPath.ROOT + path;
  }
}
