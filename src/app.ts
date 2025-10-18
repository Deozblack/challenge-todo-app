import express, { type Request, type Response, type Express } from 'express';
import { UserRouter } from './modules/users/infrastructure/http/User.routes.js';
import { TaskRouter } from './modules/tasks/infrastructure/http/Task.routes.js';
import { AuthMiddleware } from './shared/infrastructure/middlewares/Auth.middleware.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(AuthMiddleware.verify);

app.use(UserRouter);
app.use(TaskRouter);

app.use((err: unknown, req: Request, res: Response) => {
  if (err instanceof Error) {
    console.error(err.stack);
    return res.status(500).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: 'Something went wrong' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on http://localhost:3000');
  });
}

export { app };
