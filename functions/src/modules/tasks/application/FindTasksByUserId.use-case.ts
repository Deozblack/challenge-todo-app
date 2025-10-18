import { Task } from '../domain/Task.entity.js';
import type { TaskRepository } from '../domain/Task.repository.js';
import { TaskUserId } from '../domain/value-objects/TaskUserId.js';
import type { FindTasksByUserIdDto } from './dtos/FindTasksByUserId.dto.js';

export class FindTasksByUserIdUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(data: FindTasksByUserIdDto): Promise<Task[]> {
    const userId = new TaskUserId(data.userId);
    return await this.taskRepository.findByUserId(userId);
  }
}
