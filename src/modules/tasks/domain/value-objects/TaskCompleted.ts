export class TaskCompleted {
  public value: boolean;

  constructor(value: boolean = false) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (typeof this.value !== 'boolean') {
      throw new Error('Task: [completed] property must be a boolean');
    }
  }
}
