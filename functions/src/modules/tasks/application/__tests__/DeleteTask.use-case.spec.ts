import { DeleteTaskUseCase } from '../DeleteTask.use-case.js';
import { TaskNotFoundException } from '../../domain/exceptions/TaskNotFound.exception.js';
import { Task } from '../../domain/Task.entity.js';
import { TaskId } from '../../domain/value-objects/TaskId.js';
import { TaskUserId } from '../../domain/value-objects/TaskUserId.js';
import { TaskTitle } from '../../domain/value-objects/TaskTitle.js';
import { TaskDescription } from '../../domain/value-objects/TaskDescription.js';
import type { TaskRepository } from '../../domain/Task.repository.js';

describe('DeleteTaskUseCase', () => {
  let deleteTaskUseCase: DeleteTaskUseCase;
  let mockTaskRepository: TaskRepository;

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      update: jest.fn(),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    deleteTaskUseCase = new DeleteTaskUseCase(mockTaskRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should delete an existing task successfully', async () => {
      const existingTask = Task.create(
        new TaskId('550e8400-e29b-41d4-a716-446655440000'),
        new TaskUserId('abcdefghijklmnopqrstuvwx12'),
        new TaskTitle('Task to Delete'),
        new TaskDescription('This task will be deleted')
      );

      const deleteData = {
        id: existingTask.id.value,
      };

      (mockTaskRepository.findById as jest.Mock).mockResolvedValue(
        existingTask
      );

      await deleteTaskUseCase.execute(deleteData);

      expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockTaskRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw TaskNotFoundException when task does not exist', async () => {
      const deleteData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
      };

      (mockTaskRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(deleteTaskUseCase.execute(deleteData)).rejects.toThrow(
        TaskNotFoundException
      );
      expect(mockTaskRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw error for invalid task id format', async () => {
      const deleteData = {
        id: 'invalid-uuid',
      };

      await expect(deleteTaskUseCase.execute(deleteData)).rejects.toThrow();
      expect(mockTaskRepository.findById).not.toHaveBeenCalled();
      expect(mockTaskRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw error for empty task id', async () => {
      const deleteData = {
        id: '',
      };

      await expect(deleteTaskUseCase.execute(deleteData)).rejects.toThrow();
      expect(mockTaskRepository.findById).not.toHaveBeenCalled();
      expect(mockTaskRepository.delete).not.toHaveBeenCalled();
    });
  });
});
