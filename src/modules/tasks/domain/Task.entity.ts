import { TaskCompleted } from './value-objects/TaskCompleted.js';
import { TaskCreatedAt } from './value-objects/TaskCreatedAt.js';
import { TaskDescription } from './value-objects/TaskDescription.js';
import { TaskId } from './value-objects/TaskId.js';
import { TaskTitle } from './value-objects/TaskTitle.js';
import { TaskUpdatedAt } from './value-objects/TaskUpdatedAt.js';
import { TaskUserId } from './value-objects/TaskUserId.js';

export class Task {
  constructor(
    public readonly id: TaskId,
    public readonly userId: TaskUserId,
    public readonly title: TaskTitle,
    public readonly description: TaskDescription,
    public readonly completed: TaskCompleted = new TaskCompleted(false),
    public readonly createdAt: TaskCreatedAt = new TaskCreatedAt(new Date()),
    public readonly updatedAt: TaskUpdatedAt = new TaskUpdatedAt(new Date())
  ) {}

  public static create(
    id: TaskId,
    userId: TaskUserId,
    title: TaskTitle,
    description: TaskDescription
  ): Task {
    return new Task(id, userId, title, description);
  }

  public update(
    title: TaskTitle,
    description: TaskDescription,
    completed: TaskCompleted
  ): Task {
    return new Task(
      this.id,
      this.userId,
      title,
      description,
      completed,
      this.createdAt,
      new TaskUpdatedAt(new Date())
    );
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      userId: this.userId.value,
      title: this.title.value,
      description: this.description.value,
      completed: this.completed.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
