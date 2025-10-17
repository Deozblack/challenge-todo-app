import { CreateUserUseCase } from '../../../modules/users/application/CreateUser.use-case.js';
import { DeleteUserUseCase } from '../../../modules/users/application/DeleteUser.use-case.js';
import { FindAllUsersUseCase } from '../../../modules/users/application/FindAllUsers.use-case.js';
import { FindUserByEmailUseCase } from '../../../modules/users/application/FindUserByEmail.use-case.js';
import { FindUserByIdUseCase } from '../../../modules/users/application/FindUserById.use-case.js';
import { UpdateUserUseCase } from '../../../modules/users/application/UpdateUser.use-case.js';
import { FirestoreUserRepository } from '../../../modules/users/infrastructure/persistence/firestore/FirestoreUserRepository.js';

const repository = new FirestoreUserRepository();

export const ServiceContainer = {
  user: {
    findById: new FindUserByIdUseCase(repository),
    findAll: new FindAllUsersUseCase(repository),
    findByEmail: new FindUserByEmailUseCase(repository),
    create: new CreateUserUseCase(repository),
    update: new UpdateUserUseCase(repository),
    delete: new DeleteUserUseCase(repository),
  },
};
