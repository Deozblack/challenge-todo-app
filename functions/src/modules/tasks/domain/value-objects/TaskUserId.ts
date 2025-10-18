export class TaskUserId {
  public value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Task: [userId] property is required');
    }
    if (typeof this.value !== 'string') {
      throw new Error('Task: [userId] property must be a string');
    }
    if (this.value.trim() === '') {
      throw new Error('Task: [userId] cannot be empty string');
    }

    if (!this.isValidFirebaseUID(this.value)) {
      throw new Error('Task: [userId] must be a valid Firebase UID');
    }
  }

  private isValidFirebaseUID(uid: string): boolean {
    const FIREBASE_UID_REGEX = /^[a-zA-Z0-9]{20,40}$/;

    return uid.length >= 20 && uid.length <= 40 && FIREBASE_UID_REGEX.test(uid);
  }
}
