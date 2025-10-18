import type { NextFunction, Request, Response } from 'express';
import { ServiceContainer } from '../../../../shared/infrastructure/services/ServiceContainer.js';
import type { CreateTaskDto } from '../../application/dtos/CreateTask.dto.js';
import type { DeleteTaskDto } from '../../application/dtos/DeleteTask.dto.js';
import type { FindTaskByIdDto } from '../../application/dtos/FindTaskById.dto.js';
import type { FindTasksByUserIdDto } from '../../application/dtos/FindTasksByUserId.dto.js';
import type { UpdateTaskDto } from '../../application/dtos/UpdateTask.dto.js';
import { TaskNotFoundException } from '../../domain/exceptions/TaskNotFound.exception.js';

export class TaskController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await ServiceContainer.task.findAll.execute();
      const tasksPlainObject = tasks.map((task) => task.toPlainObject());

      return res.json(tasksPlainObject).status(200);
    } catch (error) {
      return next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: FindTaskByIdDto = { id: req.params.id as string };
      const task = await ServiceContainer.task.findById.execute(id);

      return res.json(task.toPlainObject()).status(200);
    } catch (error) {
      if (error instanceof TaskNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return next(error);
    }
  }

  async findByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: FindTasksByUserIdDto = {
        userId: req.params.userId as string,
      };
      const tasks = await ServiceContainer.task.findByUserId.execute(userId);
      const tasksPlainObject = tasks.map((task) => task.toPlainObject());

      return res.json(tasksPlainObject).status(200);
    } catch (error) {
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const task: CreateTaskDto = req.body;
      await ServiceContainer.task.create.execute(task);
      return res.status(201).json({
        ok: true,
        message: 'Task created successfully',
      });
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const task: UpdateTaskDto = {
        id: req.params.id as string,
        ...req.body,
      };
      await ServiceContainer.task.update.execute(task);
      return res.status(200).json({
        ok: true,
        message: 'Task updated successfully',
      });
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id: DeleteTaskDto = { id: req.params.id! };
      await ServiceContainer.task.delete.execute(id);
      return res.status(204).json({
        ok: true,
        message: 'Task deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  }
}
