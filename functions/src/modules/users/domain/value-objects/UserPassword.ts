export class UserPassword {
  public value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (typeof this.value !== 'string') {
      throw new Error('User: [password] property must be a string');
    }
    if (this.value.trim() === '') {
      throw new Error('User: [password] cannot be empty');
    }
    if (this.value.length < 20) {
      throw new Error('User: [password] appears to be invalid');
    }
  }

  equals(other: UserPassword): boolean {
    return this.value === other.value;
  }
}
