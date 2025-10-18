export class EmailAlreadyInUseException extends Error {
  constructor() {
    super('Email is already in use by another user');
    Object.setPrototypeOf(this, EmailAlreadyInUseException.prototype);
  }
}
