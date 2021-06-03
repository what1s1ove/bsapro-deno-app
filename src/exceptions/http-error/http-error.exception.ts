import {
  HttpCode,
  ExceptionName,
  ExceptionDefaultMessage,
} from '../../common/enums/enums.ts';
import { EnumValue } from '../../common/types/types.ts';
import { ApplicationError } from '../application-error/application-error.exception.ts';

type Constructor = {
  status: EnumValue<typeof HttpCode>;
  message: string;
};

class HttpError extends ApplicationError {
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

export { HttpError };
