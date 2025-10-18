import { CreateUserUseCase } from '../../../modules/users/application/CreateUser.use-case.js';
import { DeleteUserUseCase } from '../../../modules/users/application/DeleteUser.use-case.js';
import { FindAllUsersUseCase } from '../../../modules/users/application/FindAllUsers.use-case.js';
import { FindUserByEmailUseCase } from '../../../modules/users/application/FindUserByEmail.use-case.js';
import { FindUserByIdUseCase } from '../../../modules/users/application/FindUserById.use-case.js';
import { UpdateUserUseCase } from '../../../modules/users/application/UpdateUser.use-case.js';
import { FirestoreUserRepository } from '../../../modules/users/infrastructure/persistence/firestore/FirestoreUserRepository.js';
import { CreateTaskUseCase } from '../../../modules/tasks/application/CreateTask.use-case.js';
import { DeleteTaskUseCase } from '../../../modules/tasks/application/DeleteTask.use-case.js';
import { FindAllTasksUseCase } from '../../../modules/tasks/application/FindAllTasks.use-case.js';
import { FindTaskByIdUseCase } from '../../../modules/tasks/application/FindTaskById.use-case.js';
import { FindTasksByUserIdUseCase } from '../../../modules/tasks/application/FindTasksByUserId.use-case.js';
import { UpdateTaskUseCase } from '../../../modules/tasks/application/UpdateTask.use-case.js';
import { FirestoreTaskRepository } from '../../../modules/tasks/infrastructure/persistence/firestore/FirestoreTaskRepository.js';
import { BcryptRepository } from '../bcrypt/Bcrypt.repository.js';

const repository = new FirestoreUserRepository();
const bcrypt = new BcryptRepository();
const taskRepository = new FirestoreTaskRepository();

export const ServiceContainer = {
  user: {
    findById: new FindUserByIdUseCase(repository),
    findAll: new FindAllUsersUseCase(repository),
    findByEmail: new FindUserByEmailUseCase(repository),
    create: new CreateUserUseCase(repository, bcrypt),
    update: new UpdateUserUseCase(repository),
    delete: new DeleteUserUseCase(repository),
  },
  task: {
    findById: new FindTaskByIdUseCase(taskRepository),
    findAll: new FindAllTasksUseCase(taskRepository),
    findByUserId: new FindTasksByUserIdUseCase(taskRepository),
    create: new CreateTaskUseCase(taskRepository),
    update: new UpdateTaskUseCase(taskRepository),
    delete: new DeleteTaskUseCase(taskRepository),
  },
};
