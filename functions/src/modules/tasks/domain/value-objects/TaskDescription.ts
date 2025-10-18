export class TaskDescription {
  public value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value !== undefined && this.value !== null) {
      if (typeof this.value !== 'string') {
        throw new Error('Task: [description] property must be a string');
      }
      if (this.value.length > 500) {
        throw new Error('Task: [description] must not exceed 500 characters');
      }
    }
  }
}
