import { UserErrorFragment } from './generated/graphql-operations';

export class NotFoundError extends Error {
  constructor() {
    super('Not Found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UserError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UserError.prototype);
  }
}

export class ValidationError extends UserError {
  constructor(message: string, public field: string, public hint?: string) {
    super(message);
  }
}

export class IllegalActionError extends UserError {}

export class DataInconsistencyError extends UserError {}

export type UserErrorUnion = ValidationError | IllegalActionError | DataInconsistencyError;

export function mapErrorsFromGraphQL(errors: ReadonlyArray<UserErrorFragment>): UserErrorUnion[] {
  return errors.map(error => {
    switch (error.__typename) {
      case 'DataInconsistencyError':
        return new DataInconsistencyError(error.message);
      case 'IllegalActionError':
        return new IllegalActionError(error.message);
      case 'ValidationError':
        return new ValidationError(error.message, error.field, error.hint ?? undefined);
    }
  });
}
