import { CreateTaskUseCase } from '../CreateTask.use-case.js';
import type { TaskRepository } from '../../domain/Task.repository.js';
import type { Task } from '../../domain/Task.entity.js';

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let mockTaskRepository: TaskRepository;

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    createTaskUseCase = new CreateTaskUseCase(mockTaskRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should create a task successfully', async () => {
      const taskData = {
        userId: 'abcdefghijklmnopqrstuvwx12',
        title: 'Test Task',
        description: 'Test Description',
      };

      await createTaskUseCase.execute(taskData);

      expect(mockTaskRepository.create).toHaveBeenCalledTimes(1);
      const createdTask = (mockTaskRepository.create as jest.Mock).mock
        .calls[0][0] as Task;
      expect(createdTask.userId.value).toBe('abcdefghijklmnopqrstuvwx12');
      expect(createdTask.title.value).toBe('Test Task');
      expect(createdTask.description.value).toBe('Test Description');
    });

    it('should generate a unique task ID', async () => {
      const taskData = {
        userId: 'abcdefghijklmnopqrstuvwx12',
        title: 'Test Task',
        description: 'Test Description',
      };

      await createTaskUseCase.execute(taskData);

      const createdTask = (mockTaskRepository.create as jest.Mock).mock
        .calls[0][0] as Task;
      expect(createdTask.id.value).toBeDefined();
      expect(typeof createdTask.id.value).toBe('string');
      expect(createdTask.id.value.length).toBeGreaterThan(0);
    });

    it('should create task with completed set to false by default', async () => {
      const taskData = {
        userId: 'abcdefghijklmnopqrstuvwx12',
        title: 'Test Task',
        description: 'Test Description',
      };

      await createTaskUseCase.execute(taskData);

      const createdTask = (mockTaskRepository.create as jest.Mock).mock
        .calls[0][0] as Task;
      expect(createdTask.completed.value).toBe(false);
    });

    it('should throw error if title is empty', async () => {
      const taskData = {
        userId: 'abcdefghijklmnopqrstuvwx12',
        title: '',
        description: 'Test Description',
      };

      await expect(createTaskUseCase.execute(taskData)).rejects.toThrow();
      expect(mockTaskRepository.create).not.toHaveBeenCalled();
    });

    it('should throw error if title is too short', async () => {
      const taskData = {
        userId: 'abcdefghijklmnopqrstuvwx12',
        title: 'AB',
        description: 'Test Description',
      };

      await expect(createTaskUseCase.execute(taskData)).rejects.toThrow();
      expect(mockTaskRepository.create).not.toHaveBeenCalled();
    });
  });
});
