import type { Task } from './Task.entity.js';
import type { TaskId } from './value-objects/TaskId.js';
import type { TaskUserId } from './value-objects/TaskUserId.js';

export interface TaskRepository {
  create(task: Task): Promise<void>;
  findAll(): Promise<Task[]>;
  findById(id: TaskId): Promise<Task | null>;
  findByUserId(userId: TaskUserId): Promise<Task[]>;
  update(task: Task): Promise<void>;
  delete(id: TaskId): Promise<void>;
}
