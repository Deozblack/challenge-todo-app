import { Timestamp } from 'firebase-admin/firestore';
import { db } from '../../../../../shared/infrastructure/database/firebase.config.js';
import { Task } from '../../../domain/Task.entity.js';
import type { TaskRepository } from '../../../domain/Task.repository.js';
import { TaskCompleted } from '../../../domain/value-objects/TaskCompleted.js';
import { TaskCreatedAt } from '../../../domain/value-objects/TaskCreatedAt.js';
import { TaskDescription } from '../../../domain/value-objects/TaskDescription.js';
import { TaskId } from '../../../domain/value-objects/TaskId.js';
import { TaskTitle } from '../../../domain/value-objects/TaskTitle.js';
import { TaskUpdatedAt } from '../../../domain/value-objects/TaskUpdatedAt.js';
import { TaskUserId } from '../../../domain/value-objects/TaskUserId.js';

interface FirestoreTaskDocument {
  id: string;
  user_id: string;
  title: string;
  description: string;
  completed: boolean;
  published_at: Timestamp;
  updated_at: Timestamp;
}

export class FirestoreTaskRepository implements TaskRepository {
  private tasksCollection = db.collection('tasks');

  async findById(id: TaskId): Promise<Task | null> {
    const taskDoc = await this.tasksCollection.doc(id.value).get();
    if (!taskDoc.exists) return null;
    const data = taskDoc.data() as FirestoreTaskDocument;
    return this.toTaskEntity(data);
  }

  async findAll(): Promise<Task[]> {
    const tasksSnapshot = await this.tasksCollection.get();
    const data = tasksSnapshot.docs.map(
      (doc) => doc.data() as FirestoreTaskDocument
    );
    return data.map((doc) => this.toTaskEntity(doc));
  }

  async findByUserId(userId: TaskUserId): Promise<Task[]> {
    const tasksQuery = await this.tasksCollection
      .where('user_id', '==', userId.value)
      .get();
    const data = tasksQuery.docs.map(
      (doc) => doc.data() as FirestoreTaskDocument
    );
    return data.map((doc) => this.toTaskEntity(doc));
  }

  async create(task: Task): Promise<void> {
    const data = this.toFirestoreDocument(task);
    await this.tasksCollection.doc(task.id.value).set(data);
  }

  async update(task: Task): Promise<void> {
    const data = this.toFirestoreDocument(task);
    const { id, ...updateData } = data;
    await this.tasksCollection.doc(id).update(updateData);
  }

  async delete(id: TaskId): Promise<void> {
    await this.tasksCollection.doc(id.value).delete();
  }

  private toFirestoreDocument(task: Task): FirestoreTaskDocument {
    return {
      id: task.id.value,
      user_id: task.userId.value,
      title: task.title.value,
      description: task.description.value,
      completed: task.completed.value,
      published_at: Timestamp.fromDate(task.createdAt.value),
      updated_at: Timestamp.fromDate(task.updatedAt.value),
    };
  }

  private toTaskEntity(doc: FirestoreTaskDocument): Task {
    return new Task(
      new TaskId(doc.id),
      new TaskUserId(doc.user_id),
      new TaskTitle(doc.title),
      new TaskDescription(doc.description),
      new TaskCompleted(doc.completed),
      new TaskCreatedAt(doc.published_at.toDate()),
      new TaskUpdatedAt(doc.updated_at.toDate())
    );
  }
}
