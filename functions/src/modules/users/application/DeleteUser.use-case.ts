import { UserNotFoundException } from '../domain/exceptions/UserNotFound.exception.js';
import type { UserRepository } from '../domain/User.repository.js';
import { UserId } from '../domain/value-objects/UserId.js';
import type { DeleteUserDto } from './dtos/DeleteUser.dto.js';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: DeleteUserDto): Promise<void> {
    const userId = new UserId(data.id);

    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new UserNotFoundException();
    }

    await this.userRepository.delete(userId);
  }
}
