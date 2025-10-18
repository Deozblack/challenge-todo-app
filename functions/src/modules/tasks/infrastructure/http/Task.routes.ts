import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { TaskController } from './Task.controller.js';

const controller = new TaskController();

const TaskRouter: ExpressRouter = Router();

TaskRouter.get('/tasks/', controller.findAll);
TaskRouter.get('/tasks/:id/', controller.findById);
TaskRouter.get('/tasks/user/:userId/', controller.findByUserId);
TaskRouter.post('/tasks/', controller.create);
TaskRouter.put('/tasks/:id', controller.update);
TaskRouter.delete('/tasks/:id', controller.delete);

export { TaskRouter };
