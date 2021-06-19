import {
  HttpCode,
  ExceptionName,
  ExceptionDefaultMessage,
} from '../../common/enums/enums.ts';
import { EnumValue } from '../../common/enums/enums.ts';
import { ApplicationError } from '../application-error/application-error.exception.ts';

interface Constructor {
  status: EnumValue<typeof HttpCode>;
  message: string;
}
export class HttpError extends ApplicationError {
  status: EnumValue<typeof HttpCode>;

  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = ExceptionDefaultMessage.HTTP_ERROR,
  }: Constructor) {
    super({
      message,
    });
    this.status = status;
    this.name = ExceptionName.HTTP_ERROR;
  }
}
