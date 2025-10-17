import { UserNotFoundException } from '../domain/exceptions/UserNotFound.exception.js';
import { User } from '../domain/User.entity.js';
import type { UserRepository } from '../domain/User.repository.js';
import { UserEmail } from '../domain/value-objects/UserEmail.js';
import type { FindUserByEmailDto } from './dtos/FindUserByEmail.dto.js';

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: FindUserByEmailDto): Promise<User> {
    const userEmail = new UserEmail(data.email);

    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
