import { TaskNotFoundException } from '../domain/exceptions/TaskNotFound.exception.js';
import { Task } from '../domain/Task.entity.js';
import type { TaskRepository } from '../domain/Task.repository.js';
import { TaskId } from '../domain/value-objects/TaskId.js';
import type { FindTaskByIdDto } from './dtos/FindTaskById.dto.js';

export class FindTaskByIdUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(data: FindTaskByIdDto): Promise<Task> {
    const taskId = new TaskId(data.id);

    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new TaskNotFoundException();
    }

    return task;
  }
}
