import { EmailAlreadyInUseException } from '../domain/exceptions/EmailAlreadyInUse.exception.js';
import { UserNotFoundException } from '../domain/exceptions/UserNotFound.exception.js';
import type { UserRepository } from '../domain/User.repository.js';
import { UserEmail } from '../domain/value-objects/UserEmail.js';
import { UserId } from '../domain/value-objects/UserId.js';
import { UserName } from '../domain/value-objects/UserName.js';
import { UserPassword } from '../domain/value-objects/UserPassword.js';
import type { UpdateUserDto } from './dtos/UpdateUser.dto.js';
import type { BcryptPort } from '../../../shared/domain/bcrypt.port.js';

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcrypt: BcryptPort
  ) {}

  async execute(userData: UpdateUserDto): Promise<void> {
    const userId = new UserId(userData.id);
    const userName = new UserName(userData.name);
    const userEmail = new UserEmail(userData.email);
    const encryptedPassword = await this.bcrypt.encrypt(userData.password);
    const userPassword = new UserPassword(encryptedPassword);

    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new UserNotFoundException();
    }

    const userWithSameEmail = await this.userRepository.findByEmail(userEmail);
    if (userWithSameEmail && userWithSameEmail.id.value !== userId.value) {
      throw new EmailAlreadyInUseException();
    }

    const updatedUser = existingUser.update(userName, userEmail, userPassword);

    await this.userRepository.update(updatedUser);
  }
}
