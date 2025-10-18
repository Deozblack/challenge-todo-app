import { Task } from '../domain/Task.entity.js';
import type { TaskRepository } from '../domain/Task.repository.js';
import { TaskDescription } from '../domain/value-objects/TaskDescription.js';
import { TaskId } from '../domain/value-objects/TaskId.js';
import { TaskTitle } from '../domain/value-objects/TaskTitle.js';
import { TaskUserId } from '../domain/value-objects/TaskUserId.js';
import type { CreateTaskDto } from './dtos/CreateTask.dto.js';

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(data: CreateTaskDto): Promise<void> {
    const taskId = new TaskId(crypto.randomUUID());
    const userId = new TaskUserId(data.userId);
    const title = new TaskTitle(data.title);
    const description = new TaskDescription(data.description);

    const newTask = Task.create(taskId, userId, title, description);

    await this.taskRepository.create(newTask);
  }
}
