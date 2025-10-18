import { TaskNotFoundException } from '../domain/exceptions/TaskNotFound.exception.js';
import type { TaskRepository } from '../domain/Task.repository.js';
import { TaskId } from '../domain/value-objects/TaskId.js';
import type { DeleteTaskDto } from './dtos/DeleteTask.dto.js';

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(data: DeleteTaskDto): Promise<void> {
    const taskId = new TaskId(data.id);

    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new TaskNotFoundException();
    }

    await this.taskRepository.delete(taskId);
  }
}
