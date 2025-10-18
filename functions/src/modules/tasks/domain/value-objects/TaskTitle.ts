export class TaskTitle {
  public value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Task: [title] property is required');
    }
    if (typeof this.value !== 'string') {
      throw new Error('Task: [title] property must be a string');
    }
    if (this.value.trim().length < 3 || this.value.length > 100) {
      throw new Error(
        'Task: [title] must be between 3 and 100 characters long'
      );
    }
  }
}
