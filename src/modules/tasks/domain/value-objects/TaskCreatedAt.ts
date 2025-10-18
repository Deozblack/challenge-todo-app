export class TaskCreatedAt {
  public value: Date;

  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Task: [createdAt] property is required');
    }
    if (!(this.value instanceof Date)) {
      throw new Error('Task: [createdAt] property must be a Date');
    }
    if (isNaN(this.value.getTime())) {
      throw new Error('Task: [createdAt] must be a valid date');
    }
  }
}
