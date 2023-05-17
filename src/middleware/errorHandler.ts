import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/ApiError';

const notFoundHandlerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const error: ApiError = new ApiError();

  error.statusCode = 404;
  error.message =
    'ohh you are lost, read the API documentation to find your way back home 😂';
  error.status = 'fail';

  next(error);
};

// --> Global error handling middleware
const globalErrorHandlerMiddleware = (
  error: ApiError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // const errorMessage: string = error.message || "Whoops!! something went wrong";
  // error.message || "Whoops!! something went wrong";
  // error.statusCode || 500

  response.status(404).json({
    error,
  });
};

export { notFoundHandlerMiddleware, globalErrorHandlerMiddleware };
