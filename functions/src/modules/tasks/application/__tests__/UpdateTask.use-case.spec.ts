import { UpdateTaskUseCase } from '../UpdateTask.use-case.js';
import { TaskNotFoundException } from '../../domain/exceptions/TaskNotFound.exception.js';
import { Task } from '../../domain/Task.entity.js';
import { TaskId } from '../../domain/value-objects/TaskId.js';
import { TaskUserId } from '../../domain/value-objects/TaskUserId.js';
import { TaskTitle } from '../../domain/value-objects/TaskTitle.js';
import { TaskDescription } from '../../domain/value-objects/TaskDescription.js';
import type { TaskRepository } from '../../domain/Task.repository.js';

describe('UpdateTaskUseCase', () => {
  let updateTaskUseCase: UpdateTaskUseCase;
  let mockTaskRepository: TaskRepository;

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      update: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn(),
    };
    updateTaskUseCase = new UpdateTaskUseCase(mockTaskRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should update an existing task successfully', async () => {
      const existingTask = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440000'),
        new TaskUserId('abcdefghijklmnopqrstuvwx12'),
        new TaskTitle('Old Title'),
        new TaskDescription('Old Description')
      );

      const updateData = {
        id: existingTask.id.value,
        title: 'Updated Title',
        description: 'Updated Description',
        completed: true,
      };

      (mockTaskRepository.findById as jest.Mock).mockResolvedValue(
        existingTask
      );

      await updateTaskUseCase.execute(updateData);

      expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockTaskRepository.update).toHaveBeenCalledTimes(1);

      const updatedTask = (mockTaskRepository.update as jest.Mock).mock
        .calls[0][0] as Task;
      expect(updatedTask.title.value).toBe('Updated Title');
      expect(updatedTask.description.value).toBe('Updated Description');
      expect(updatedTask.completed.value).toBe(true);
    });

    it('should throw TaskNotFoundException when task does not exist', async () => {
      const updateData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Updated Title',
        description: 'Updated Description',
        completed: true,
      };

      (mockTaskRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(updateTaskUseCase.execute(updateData)).rejects.toThrow(
        TaskNotFoundException
      );
      expect(mockTaskRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error if title is too short', async () => {
      const existingTask = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440000'),
        new TaskUserId('abcdefghijklmnopqrstuvwx12'),
        new TaskTitle('Old Title'),
        new TaskDescription('Old Description')
      );

      const updateData = {
        id: existingTask.id.value,
        title: 'AB',
        description: 'Updated Description',
        completed: false,
      };

      (mockTaskRepository.findById as jest.Mock).mockResolvedValue(
        existingTask
      );

      await expect(updateTaskUseCase.execute(updateData)).rejects.toThrow();
      expect(mockTaskRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error if description is too long', async () => {
      const existingTask = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440000'),
        new TaskUserId('abcdefghijklmnopqrstuvwx12'),
        new TaskTitle('Old Title'),
        new TaskDescription('Old Description')
      );

      const updateData = {
        id: existingTask.id.value,
        title: 'Updated Title',
        description: 'a'.repeat(501),
        completed: false,
      };

      (mockTaskRepository.findById as jest.Mock).mockResolvedValue(
        existingTask
      );

      await expect(updateTaskUseCase.execute(updateData)).rejects.toThrow();
      expect(mockTaskRepository.update).not.toHaveBeenCalled();
    });

    it('should update task with empty description', async () => {
      const existingTask = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440000'),
        new TaskUserId('abcdefghijklmnopqrstuvwx12'),
        new TaskTitle('Old Title'),
        new TaskDescription('Old Description')
      );

      const updateData = {
        id: existingTask.id.value,
        title: 'Updated Title',
        description: '',
        completed: false,
      };

      (mockTaskRepository.findById as jest.Mock).mockResolvedValue(
        existingTask
      );

      await updateTaskUseCase.execute(updateData);

      const updatedTask = (mockTaskRepository.update as jest.Mock).mock
        .calls[0][0] as Task;
      expect(updatedTask.description.value).toBe('');
    });
  });
});
