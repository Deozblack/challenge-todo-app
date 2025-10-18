export class UserCreatedAt {
  public value: Date;

  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('User: [createdAt] property is required');
    }
    if (!(this.value instanceof Date)) {
      throw new Error('User: [createdAt] property must be a Date');
    }
  }
}
