import express, { Application, Request, Response, response } from 'express';
import {
  globalErrorHandlerMiddleware,
  notFoundHandlerMiddleware,
} from './middleware/errorHandler';
import { authRouter } from './router/authRouter';
import { HTTP_STATUS_CODE } from './utils/constants/HttpStatusCode';
import { pool as db } from './database/database';

// --> create instance
const app: Application = express();

(async () => {
  app.use(express.json());

  try {
    const client = await db.connect();
    console.log('database connected');
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log(result.rows);
  } catch (error) {
    console.error(error);
  }

  // try {
  //   const client: PoolClient = await pool.connect();
  //   console.log('database connected');

  //   const createUsersTableSQL: string = 'CREATE TABLE "users" ()';

  //   const { rows } = await client.query(createUsersTableSQL);

  //   console.log(rows[0]);
  // } catch (error) {
  //   console.log(`database connection filed: ${error}`);
  // } finally {
  //   await pool.end();
  // }

  // --> Mount Routers
  app.use('/api/v1/auth/register', authRouter);

  app.get('/', (request: Request, response: Response) => {
    response.status(HTTP_STATUS_CODE.OK).json({ message: 'Hello, World ⭐' });
  });

  app.use('*', notFoundHandlerMiddleware);
  app.use(globalErrorHandlerMiddleware);

  app.listen(3000, () => {
    console.log('Server is running on: http://localhost:3000/');
  });
})();
