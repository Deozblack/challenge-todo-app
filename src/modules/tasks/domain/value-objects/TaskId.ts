export class TaskId {
  public value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Task: [id] property is required');
    }
    if (typeof this.value !== 'string') {
      throw new Error('Task: [id] property must be a string');
    }
    if (this.value.trim() === '') {
      throw new Error('Task: [id] cannot be empty string');
    }

    if (!this.isValidUUID(this.value)) {
      throw new Error('Task: [id] must be a valid UUID');
    }
  }

  private isValidUUID(uuid: string): boolean {
    const UUID_V4_REGEX =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    return uuid.length === 36 && UUID_V4_REGEX.test(uuid);
  }
}
