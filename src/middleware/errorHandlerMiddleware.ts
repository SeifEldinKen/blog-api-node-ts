import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/ApiError';
import { HTTP_STATUS_CODE } from '../utils/constants/HttpStatusCode';

const notFoundHandlerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const error: ApiError = new ApiError();

  error.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
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
  console.error({
    message: error.message,
    statusCode: error.statusCode,
    status: error.status,
  });
  response.status(error.statusCode || HTTP_STATUS_CODE.NOT_FOUND).json({
    error,
  });
};

export { notFoundHandlerMiddleware, globalErrorHandlerMiddleware };
