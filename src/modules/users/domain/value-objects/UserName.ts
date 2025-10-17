export class UserName {
  public value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('User: [name] property is required');
    }
    if (typeof this.value !== 'string') {
      throw new Error('User: [name] property must be a string');
    }
    if (this.value.trim().length < 2 || this.value.length > 255) {
      throw new Error('User: [name] must be between 2 and 255 characters long');
    }
  }
}
