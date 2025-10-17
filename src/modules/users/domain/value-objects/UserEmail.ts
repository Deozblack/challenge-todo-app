export class UserEmail {
  public value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('User: [email] property is required');
    }
    if (typeof this.value !== 'string') {
      throw new Error('User: [email] property must be a string');
    }
    if (this.value.length > 255) {
      throw new Error('User: [email] must not exceed 255 characters');
    }
    if (!this.isValidEmail(this.value)) {
      throw new Error('User: [email] must be a valid email address');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  equals(other: UserEmail): boolean {
    return this.value === other.value;
  }
}
