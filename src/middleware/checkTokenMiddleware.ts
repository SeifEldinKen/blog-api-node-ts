import { NextFunction, Request, Response } from 'express';

const checkTokenMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('checkTokenMiddleware');
  next();
};

export { checkTokenMiddleware };
