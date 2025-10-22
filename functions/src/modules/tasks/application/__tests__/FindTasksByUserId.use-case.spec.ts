import { FindTasksByUserIdUseCase } from '../FindTasksByUserId.use-case.js';
import { Task } from '../../domain/Task.entity.js';
import { TaskId } from '../../domain/value-objects/TaskId.js';
import { TaskUserId } from '../../domain/value-objects/TaskUserId.js';
import { TaskTitle } from '../../domain/value-objects/TaskTitle.js';
import { TaskDescription } from '../../domain/value-objects/TaskDescription.js';
import type { TaskRepository } from '../../domain/Task.repository.js';

describe('FindTasksByUserIdUseCase', () => {
  let findTasksByUserIdUseCase: FindTasksByUserIdUseCase;
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
    findTasksByUserIdUseCase = new FindTasksByUserIdUseCase(mockTaskRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should return all tasks for a specific user', async () => {
      const userId = 'abcdefghijklmnopqrstuvwx12';
      const task1 = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440001'),
        new TaskUserId(userId),
        new TaskTitle('User Task 1'),
        new TaskDescription('Description 1')
      );
      const task2 = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440002'),
        new TaskUserId(userId),
        new TaskTitle('User Task 2'),
        new TaskDescription('Description 2')
      );

      const queryData = {
        userId,
      };

      (mockTaskRepository.findByUserId as jest.Mock).mockResolvedValue([
        task1,
        task2,
      ]);

      const result = await findTasksByUserIdUseCase.execute(queryData);

      expect(mockTaskRepository.findByUserId).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result[0].userId.value).toBe(userId);
      expect(result[1].userId.value).toBe(userId);
    });

    it('should return empty array when user has no tasks', async () => {
      const queryData = {
        userId: 'abcdefghijklmnopqrstuvwx12',
      };

      (mockTaskRepository.findByUserId as jest.Mock).mockResolvedValue([]);

      const result = await findTasksByUserIdUseCase.execute(queryData);

      expect(mockTaskRepository.findByUserId).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it('should throw error for invalid Firebase UID format', async () => {
      const queryData = {
        userId: 'invalid-uid',
      };

      await expect(
        findTasksByUserIdUseCase.execute(queryData)
      ).rejects.toThrow();
      expect(mockTaskRepository.findByUserId).not.toHaveBeenCalled();
    });

    it('should throw error for empty userId', async () => {
      const queryData = {
        userId: '',
      };

      await expect(
        findTasksByUserIdUseCase.execute(queryData)
      ).rejects.toThrow();
      expect(mockTaskRepository.findByUserId).not.toHaveBeenCalled();
    });

    it('should return tasks as Task entities', async () => {
      const userId = 'abcdefghijklmnopqrstuvwx12';
      const task = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440000'),
        new TaskUserId(userId),
        new TaskTitle('Task'),
        new TaskDescription('Description')
      );

      const queryData = {
        userId,
      };

      (mockTaskRepository.findByUserId as jest.Mock).mockResolvedValue([task]);

      const result = await findTasksByUserIdUseCase.execute(queryData);

      expect(result[0]).toBeInstanceOf(Task);
      expect(result[0].title.value).toBe('Task');
    });
  });
});
