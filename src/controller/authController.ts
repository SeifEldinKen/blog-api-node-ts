import { NextFunction, Request, Response } from 'express';
import { User } from '../model/User';

interface AuthForgetPasswordRepository {
  forgetPassword(email: string): Promise<void>;
}

interface AuthResetPasswordRepository {
  resetPassword(email: string, password: string): Promise<void>;
}

const registerController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // --> get data from request body
  const { username, email, passwordHash }: User = request.body;

  // --> check if user is exist in database

  // --> generate toke

  // --> insert new user in database

  // --> send response
};

export { registerController };
