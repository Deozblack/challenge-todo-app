import { UserNotFoundException } from '../domain/exceptions/UserNotFound.exception.js';
import { User } from '../domain/User.entity.js';
import type { UserRepository } from '../domain/User.repository.js';
import { UserId } from '../domain/value-objects/UserId.js';
import type { FindUserByIdDto } from './dtos/FindUserById.dto.js';

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: FindUserByIdDto): Promise<User> {
    const userId = new UserId(data.id);

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
