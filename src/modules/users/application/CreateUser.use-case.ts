import { UserAlreadyExistsException } from '../domain/exceptions/UserAlreadyExists.exception.js';
import { User } from '../domain/User.entity.js';
import type { UserRepository } from '../domain/User.repository.js';
import { UserEmail } from '../domain/value-objects/UserEmail.js';
import { UserId } from '../domain/value-objects/UserId.js';
import { UserName } from '../domain/value-objects/UserName.js';
import { UserPassword } from '../domain/value-objects/UserPassword.js';
import type { CreateUserDto } from './dtos/CreateUser.dto.js';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: CreateUserDto): Promise<void> {
    const tempId = crypto.randomUUID();
    const userId = new UserId(tempId);
    const userName = new UserName(user.name);
    const userEmail = new UserEmail(user.email);
    const userPassword = new UserPassword(user.password);

    const newUser = User.create(userId, userName, userEmail, userPassword);

    const existingUser = await this.userRepository.findByEmail(userEmail);
    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    await this.userRepository.create(newUser);
  }
}
