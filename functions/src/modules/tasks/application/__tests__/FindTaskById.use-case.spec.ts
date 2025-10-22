import { FindTaskByIdUseCase } from '../FindTaskById.use-case.js';
import { TaskNotFoundException } from '../../domain/exceptions/TaskNotFound.exception.js';
import { Task } from '../../domain/Task.entity.js';
import { TaskId } from '../../domain/value-objects/TaskId.js';
import { TaskUserId } from '../../domain/value-objects/TaskUserId.js';
import { TaskTitle } from '../../domain/value-objects/TaskTitle.js';
import { TaskDescription } from '../../domain/value-objects/TaskDescription.js';
import type { TaskRepository } from '../../domain/Task.repository.js';

describe('FindTaskByIdUseCase', () => {
  let findTaskByIdUseCase: FindTaskByIdUseCase;
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
    findTaskByIdUseCase = new FindTaskByIdUseCase(mockTaskRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should return a task when found', async () => {
      const existingTask = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440000'),
        new TaskUserId('abcdefghijklmnopqrstuvwx12'),
        new TaskTitle('Found Task'),
        new TaskDescription('This task was found')
      );

      const queryData = {
        id: existingTask.id.value,
      };

      (mockTaskRepository.findById as jest.Mock).mockResolvedValue(
        existingTask
      );

      const result = await findTaskByIdUseCase.execute(queryData);

      expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
      expect(result).toBe(existingTask);
      expect(result.title.value).toBe('Found Task');
    });

    it('should throw TaskNotFoundException when task is not found', async () => {
      const queryData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
      };

      (mockTaskRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(findTaskByIdUseCase.execute(queryData)).rejects.toThrow(
        TaskNotFoundException
      );
    });

    it('should throw error for invalid UUID format', async () => {
      const queryData = {
        id: 'invalid-uuid-format',
      };

      await expect(findTaskByIdUseCase.execute(queryData)).rejects.toThrow();
      expect(mockTaskRepository.findById).not.toHaveBeenCalled();
    });

    it('should throw error for empty id', async () => {
      const queryData = {
        id: '',
      };

      await expect(findTaskByIdUseCase.execute(queryData)).rejects.toThrow();
      expect(mockTaskRepository.findById).not.toHaveBeenCalled();
    });

    it('should return task with all properties', async () => {
      const existingTask = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440000'),
        new TaskUserId('abcdefghijklmnopqrstuvwx12'),
        new TaskTitle('Complete Task'),
        new TaskDescription('Full description')
      );

      const queryData = {
        id: existingTask.id.value,
      };

      (mockTaskRepository.findById as jest.Mock).mockResolvedValue(
        existingTask
      );

      const result = await findTaskByIdUseCase.execute(queryData);

      expect(result).toBeInstanceOf(Task);
      expect(result.id).toBeDefined();
      expect(result.userId).toBeDefined();
      expect(result.title).toBeDefined();
      expect(result.description).toBeDefined();
      expect(result.completed).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });
  });
});
