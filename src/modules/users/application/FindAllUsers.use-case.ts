import { User } from '../domain/User.entity.js';
import type { UserRepository } from '../domain/User.repository.js';

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
