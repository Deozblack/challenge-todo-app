import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { UserController } from './User.controller.js';

const controller = new UserController();

const UserRouter: ExpressRouter = Router();

UserRouter.get('/users/', controller.findAll);
UserRouter.get('/users/:id/', controller.findById);
UserRouter.get('/users/:email/', controller.findByEmail);
UserRouter.post('/users/', controller.create);
UserRouter.put('/users/:id', controller.update);
UserRouter.delete('/users/:id', controller.delete);

export { UserRouter };
