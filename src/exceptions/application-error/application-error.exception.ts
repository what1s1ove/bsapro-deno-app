import {
  ExceptionName,
  ExceptionDefaultMessage,
} from '../../common/enums/enums.ts';

type Constructor = {
  message: string;
};

class ApplicationError extends Error {
  constructor({
    message = ExceptionDefaultMessage.APPLICATION_ERROR,
  }: Constructor) {
    super(message);
    this.name = ExceptionName.APPLICATION_ERROR;
  }
}

export { ApplicationError };
