import express, { Application, NextFunction, Request, Response } from 'express';
import {
  globalErrorHandlerMiddleware,
  notFoundHandlerMiddleware,
} from './middleware/errorHandlerMiddleware';
import { authRouter } from './router/authRouter';
import { HTTP_STATUS_CODE } from './utils/constants/HttpStatusCode';
import { pool as db } from './database/database';
import cors from 'cors';
import config from './utils/config';

// --> create instance
const app: Application = express();

(async () => {
  // --> middleware
  app.use(cors());
  app.use(express.json());
  // --> logger middleware
  app.use((request: Request, response: Response, next: NextFunction) => {
    console.log(`New Request: ${request.path} -body: ${request.body}`);
    next();
  });

  try {
    const client = await db.connect();
    console.log('database connected');
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log(result.rows);
  } catch (error) {
    console.error(error);
  }

  // --> Mount Routers
  app.use('/', authRouter);

  console.log('Hello, World! 🔥');

  app.get('/healthz', (request: Request, response: Response) => {
    response.status(HTTP_STATUS_CODE.OK).json({ message: 'Hello, World ⭐' });
  });

  // --> error handler middleware
  app.use('*', notFoundHandlerMiddleware);
  app.use(globalErrorHandlerMiddleware);

  const PORT: number = Number(config.port) || 3008;
  app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}/healthz`);
  });
})();
