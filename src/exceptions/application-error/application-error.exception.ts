import {
  ExceptionName,
  ExceptionDefaultMessage,
} from '../../common/enums/enums.ts';

interface Constructor {
  message: string;
}
export class ApplicationError extends Error {
  constructor({
    message = ExceptionDefaultMessage.APPLICATION_ERROR,
  }: Constructor) {
    super(message);
    this.name = ExceptionName.APPLICATION_ERROR;
  }
}
