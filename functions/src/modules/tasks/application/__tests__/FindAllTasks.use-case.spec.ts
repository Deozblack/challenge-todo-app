import { FindAllTasksUseCase } from '../FindAllTasks.use-case.js';
import { Task } from '../../domain/Task.entity.js';
import { TaskId } from '../../domain/value-objects/TaskId.js';
import { TaskUserId } from '../../domain/value-objects/TaskUserId.js';
import { TaskTitle } from '../../domain/value-objects/TaskTitle.js';
import { TaskDescription } from '../../domain/value-objects/TaskDescription.js';
import type { TaskRepository } from '../../domain/Task.repository.js';

describe('FindAllTasksUseCase', () => {
  let findAllTasksUseCase: FindAllTasksUseCase;
  let mockTaskRepository: TaskRepository;

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    findAllTasksUseCase = new FindAllTasksUseCase(mockTaskRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should return all tasks', async () => {
      const task1 = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440001'),
        new TaskUserId('abcdefghijklmnopqrstuvwx12'),
        new TaskTitle('Task 1'),
        new TaskDescription('Description 1')
      );
      const task2 = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440002'),
        new TaskUserId('abcdefghijklmnopqrstuvwx34'),
        new TaskTitle('Task 2'),
        new TaskDescription('Description 2')
      );

      (mockTaskRepository.findAll as jest.Mock).mockResolvedValue([
        task1,
        task2,
      ]);

      const result = await findAllTasksUseCase.execute();

      expect(mockTaskRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result[0]).toBe(task1);
      expect(result[1]).toBe(task2);
    });

    it('should return empty array when no tasks exist', async () => {
      (mockTaskRepository.findAll as jest.Mock).mockResolvedValue([]);

      const result = await findAllTasksUseCase.execute();

      expect(mockTaskRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it('should return tasks as Task entities', async () => {
      const task = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440000'),
        new TaskUserId('abcdefghijklmnopqrstuvwx12'),
        new TaskTitle('Task'),
        new TaskDescription('Description')
      );

      (mockTaskRepository.findAll as jest.Mock).mockResolvedValue([task]);

      const result = await findAllTasksUseCase.execute();

      expect(result[0]).toBeInstanceOf(Task);
      expect(result[0].title.value).toBe('Task');
      expect(result[0].description.value).toBe('Description');
    });
  });
});
