import { HttpError } from '../../exceptions/exceptions.ts';
import { HttpMethod, HttpCode } from '../../common/enums/enums.ts';
import { EnumValue } from '../../common/types/types.ts';

export class Http {
  public load<T = unknown>(url: string, options: RequestInit): Promise<T> {
    const { method = HttpMethod.GET } = options;

    return fetch(url, {
      method,
    })
      .then(this._checkStatus)
      .then((res) => this._parseJSON<T>(res))
      .catch(this._throwError);
  }

  private _checkStatus(response: Response): Response | never {
    if (!response.ok) {
      throw new HttpError({
        status: <EnumValue<typeof HttpCode>>response.status,
        message: response.statusText,
      });
    }

    return response;
  }

  private _parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private _throwError(err: Error): never {
    throw err;
  }
}
