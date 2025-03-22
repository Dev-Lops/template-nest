import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class EmailAlreadyExistsException extends BaseException {
  constructor() {
    super('E-mail já cadastrado', HttpStatus.CONFLICT);
  }
}
