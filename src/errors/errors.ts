import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseError } from './BaseError';

export class InvalidEntityId extends HttpException {
  constructor(type: string) {
    super(`${type} id is invalid`, 400);
  }
}

export class IncorrectPassword extends HttpException {
  constructor() {
    super('Incorrect password', 403);
  }
}

export class EntityDoesNotExist extends HttpException {
  constructor(type: string) {
    super(`${type} does not exist`, HttpStatus.NOT_FOUND);
  }
}

export class EntityIdDoesNotFound extends HttpException {
  constructor(entity: string) {
    super(`${entity} id does not exist`, 422);
  }
}

export class EntityNotContent extends HttpException {
  constructor(type: string) {
    super(`${type} not exists`, 204);
  }
}

export class NotCorrect extends HttpException {
  constructor() {
    super('Password or login is not correct', 403);
  }
}

export class Forbidden extends BaseError {
  constructor(content = 'Authentication') {
    super('AUTHENTICATION', content, true);
  }
}

export class BadRequest extends BaseError {
  constructor(content = 'Bad Request') {
    super('BAD REQUEST', content, true);
  }
}
