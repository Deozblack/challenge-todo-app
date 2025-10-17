import type { NextFunction, Request, Response } from 'express';
import { ServiceContainer } from '../../../../shared/infrastructure/services/ServiceContainer.js';
import type { FindUserByIdDto } from '../../application/dtos/FindUserById.dto.js';
import type { FindUserByEmailDto } from '../../application/dtos/FindUserByEmail.dto.js';
import type { CreateUserDto } from '../../application/dtos/CreateUser.dto.js';
import type { UpdateUserDto } from '../../application/dtos/UpdateUser.dto.js';
import type { DeleteUserDto } from '../../application/dtos/DeleteUser.dto.js';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFound.exception.js';

export class UserController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await ServiceContainer.user.findAll.execute();
      const usersPlainObject = users.map((user) => user.toPlainObject());

      return res.json(usersPlainObject).status(200);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: FindUserByIdDto = { id: req.params.id as string };
      const user = await ServiceContainer.user.findById.execute(id);

      return res.json(user.toPlainObject()).status(200);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  async findByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const email: FindUserByEmailDto = { email: req.query.email as string };

      const user = await ServiceContainer.user.findByEmail.execute(email);
      return res.json(user.toPlainObject()).status(200);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user: CreateUserDto = req.body;
      await ServiceContainer.user.create.execute(user);
      return res.status(201).json({
        ok: true,
        message: 'User created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UpdateUserDto = {
        id: req.params.id as string,
        ...req.body,
      };
      await ServiceContainer.user.update.execute(user);
      return res.status(200).json({
        ok: true,
        message: 'User updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id: DeleteUserDto = { id: req.params.id! };
      await ServiceContainer.user.delete.execute(id);
      return res.status(204).json({
        ok: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
