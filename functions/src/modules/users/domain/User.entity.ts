import { UserCreatedAt } from './value-objects/UserCreatedAt.js';
import { UserEmail } from './value-objects/UserEmail.js';
import { UserId } from './value-objects/UserId.js';
import { UserName } from './value-objects/UserName.js';
import { UserPassword } from './value-objects/UserPassword.js';
import { UserUpdatedAt } from './value-objects/UserUpdatedAt.js';

export class User {
  constructor(
    public readonly id: UserId,
    public readonly name: UserName,
    public readonly email: UserEmail,
    public readonly password: UserPassword,
    public readonly createdAt: UserCreatedAt = new UserCreatedAt(new Date()),
    public readonly updatedAt: UserUpdatedAt = new UserUpdatedAt(new Date())
  ) {}

  public static create(
    id: UserId,
    name: UserName,
    email: UserEmail,
    password: UserPassword
  ): User {
    return new User(id, name, email, password);
  }

  public update(
    name: UserName,
    email: UserEmail,
    password: UserPassword
  ): User {
    return new User(
      this.id,
      name,
      email,
      password,
      this.createdAt,
      new UserUpdatedAt(new Date())
    );
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
