import { Task } from '../Task.entity.js';
import { TaskId } from '../value-objects/TaskId.js';
import { TaskUserId } from '../value-objects/TaskUserId.js';
import { TaskTitle } from '../value-objects/TaskTitle.js';
import { TaskDescription } from '../value-objects/TaskDescription.js';
import { TaskCompleted } from '../value-objects/TaskCompleted.js';

describe('Task Entity', () => {
  const validTaskId = new TaskId('550e8400-e29b-41d4-a716-446655440000');
  const validUserId = new TaskUserId('abcdefghijklmnopqrstuvwx12');
  const validTitle = new TaskTitle('Test Task');
  const validDescription = new TaskDescription('Test Description');

  describe('create', () => {
    it('should create a task with valid data', () => {
      const task = Task.create(
        validTaskId,
        validUserId,
        validTitle,
        validDescription
      );

      expect(task.id.value).toBe('550e8400-e29b-41d4-a716-446655440000');
      expect(task.userId.value).toBe('abcdefghijklmnopqrstuvwx12');
      expect(task.title.value).toBe('Test Task');
      expect(task.description.value).toBe('Test Description');
      expect(task.completed.value).toBe(false);
      expect(task.createdAt.value).toBeInstanceOf(Date);
      expect(task.updatedAt.value).toBeInstanceOf(Date);
    });

    it('should create a task with completed set to false by default', () => {
      const task = Task.create(
        validTaskId,
        validUserId,
        validTitle,
        validDescription
      );

      expect(task.completed.value).toBe(false);
    });

    it('should create a task with timestamps', () => {
      const beforeCreation = new Date();
      const task = Task.create(
        validTaskId,
        validUserId,
        validTitle,
        validDescription
      );
      const afterCreation = new Date();

      expect(task.createdAt.value.getTime()).toBeGreaterThanOrEqual(
        beforeCreation.getTime()
      );
      expect(task.createdAt.value.getTime()).toBeLessThanOrEqual(
        afterCreation.getTime()
      );
      expect(task.updatedAt.value.getTime()).toBeGreaterThanOrEqual(
        beforeCreation.getTime()
      );
      expect(task.updatedAt.value.getTime()).toBeLessThanOrEqual(
        afterCreation.getTime()
      );
    });
  });

  describe('update', () => {
    it('should update task properties', () => {
      const task = Task.create(
        validTaskId,
        validUserId,
        validTitle,
        validDescription
      );
      const newTitle = new TaskTitle('Updated Task');
      const newDescription = new TaskDescription('Updated Description');
      const newCompleted = new TaskCompleted(true);

      const updatedTask = task.update(newTitle, newDescription, newCompleted);

      expect(updatedTask.title.value).toBe('Updated Task');
      expect(updatedTask.description.value).toBe('Updated Description');
      expect(updatedTask.completed.value).toBe(true);
    });

    it('should maintain the same id and userId after update', () => {
      const task = Task.create(
        validTaskId,
        validUserId,
        validTitle,
        validDescription
      );
      const newTitle = new TaskTitle('Updated Task');
      const newDescription = new TaskDescription('Updated Description');
      const newCompleted = new TaskCompleted(true);

      const updatedTask = task.update(newTitle, newDescription, newCompleted);

      expect(updatedTask.id.value).toBe(task.id.value);
      expect(updatedTask.userId.value).toBe(task.userId.value);
    });

    it('should update the updatedAt timestamp', async () => {
      const task = Task.create(
        validTaskId,
        validUserId,
        validTitle,
        validDescription
      );
      const originalUpdatedAt = task.updatedAt.value.getTime();

      await new Promise((resolve) => setTimeout(resolve, 10));

      const newTitle = new TaskTitle('Updated Task');
      const newDescription = new TaskDescription('Updated Description');
      const newCompleted = new TaskCompleted(true);
      const updatedTask = task.update(newTitle, newDescription, newCompleted);

      expect(updatedTask.updatedAt.value.getTime()).toBeGreaterThan(
        originalUpdatedAt
      );
    });

    it('should not modify the original createdAt timestamp', () => {
      const task = Task.create(
        validTaskId,
        validUserId,
        validTitle,
        validDescription
      );
      const originalCreatedAt = task.createdAt.value;

      const newTitle = new TaskTitle('Updated Task');
      const newDescription = new TaskDescription('Updated Description');
      const newCompleted = new TaskCompleted(true);
      const updatedTask = task.update(newTitle, newDescription, newCompleted);

      expect(updatedTask.createdAt.value).toEqual(originalCreatedAt);
    });
  });

  describe('toPlainObject', () => {
    it('should convert task to plain object', () => {
      const task = Task.create(
        validTaskId,
        validUserId,
        validTitle,
        validDescription
      );
      const plainObject = task.toPlainObject();

      expect(plainObject).toEqual({
        id: '550e8400-e29b-41d4-a716-446655440000',
        userId: 'abcdefghijklmnopqrstuvwx12',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should include all task properties in plain object', () => {
      const task = Task.create(
        validTaskId,
        validUserId,
        validTitle,
        validDescription
      );
      const plainObject = task.toPlainObject();

      expect(Object.keys(plainObject)).toEqual([
        'id',
        'userId',
        'title',
        'description',
        'completed',
        'createdAt',
        'updatedAt',
      ]);
    });
  });
});
