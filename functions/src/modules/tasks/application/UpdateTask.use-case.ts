import { TaskNotFoundException } from '../domain/exceptions/TaskNotFound.exception.js';
import type { TaskRepository } from '../domain/Task.repository.js';
import { TaskCompleted } from '../domain/value-objects/TaskCompleted.js';
import { TaskDescription } from '../domain/value-objects/TaskDescription.js';
import { TaskId } from '../domain/value-objects/TaskId.js';
import { TaskTitle } from '../domain/value-objects/TaskTitle.js';
import type { UpdateTaskDto } from './dtos/UpdateTask.dto.js';

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(data: UpdateTaskDto): Promise<void> {
    const taskId = new TaskId(data.id);
    const title = new TaskTitle(data.title);
    const description = new TaskDescription(data.description);
    const completed = new TaskCompleted(data.completed);

    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new TaskNotFoundException();
    }

    const updatedTask = existingTask.update(title, description, completed);

    await this.taskRepository.update(updatedTask);
  }
}
