import express, { Application, Request, Response } from 'express';
import {
  globalErrorHandlerMiddleware,
  notFoundHandlerMiddleware,
} from './middleware/errorHandler';

// --> create instance
const app: Application = express();

(async () => {
  app.use(express.json());

  app.get('/', (request: Request, response: Response) => {
    response.status(200).json({ message: 'Hello, World ⭐' });
  });

  app.use(notFoundHandlerMiddleware);
  app.use(globalErrorHandlerMiddleware);

  app.listen(3000, () => {
    console.log('Server is running on: http://localhost:3000/');
  });
})();
