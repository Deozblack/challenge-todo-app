export class TaskUpdatedAt {
  public value: Date;

  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Task: [updatedAt] property is required');
    }
    if (!(this.value instanceof Date)) {
      throw new Error('Task: [updatedAt] property must be a Date');
    }
    if (isNaN(this.value.getTime())) {
      throw new Error('Task: [updatedAt] must be a valid date');
    }
  }
}
