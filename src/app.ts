import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use((err: unknown, req: Request, res: Response) => {
  if (err instanceof Error) {
    console.error(err.stack);
    return res.status(500).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: 'Something went wrong' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
