import { Task } from '../domain/Task.entity.js';
import type { TaskRepository } from '../domain/Task.repository.js';

export class FindAllTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }
}
