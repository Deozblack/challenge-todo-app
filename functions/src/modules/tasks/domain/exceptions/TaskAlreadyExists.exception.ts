export class TaskAlreadyExistsException extends Error {
  constructor() {
    super('Task already exists');
    Object.setPrototypeOf(this, TaskAlreadyExistsException.prototype);
  }
}
