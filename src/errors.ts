export class NotFoundError extends Error {
  constructor() {
    super('Not Found');
  }
}

export class UserError extends Error {}

export class ValidationError extends UserError {
  constructor(message: string, public field: string, public hint: string) {
    super(message);
  }
}

export class IllegalActionError extends UserError {}

export class DataInconsistencyError extends UserError {}
