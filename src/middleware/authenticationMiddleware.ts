import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/ApiError';
import { HTTP_STATUS_CODE } from '../utils/constants/HttpStatusCode';
import { Status, UserService } from '../service/userService';
import { JwtObject } from '../model/JwtObject';
import { User } from '../model/User';

const authHandlerMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // --> 1) check if the token exists in header
    const authHeder: string | undefined = request.headers.authorization;
    if (authHeder === undefined) {
      return response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: 'Login error: please try again',
      });
    }

    // --> 2) check if token start with { Bearer }
    if (!authHeder.startsWith('Bearer')) {
      return response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: 'Login error: please try again',
      });
    }

    // --> 3) check if token verify
    const token: string = authHeder.split(' ')[1];
    const userService: UserService = new UserService();

    const decoded: JwtObject = await userService.verifyToken(token);

    // --> 4) check if user exists in DB (if user remove from db)
    const resultIfUserExists = await userService.checkIfUsersExists(
      decoded.email,
      decoded.username
    );

    switch (resultIfUserExists) {
      case Status.NON_EXISTING: {
        return response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
          message: 'the user that belong to this token no longer exist',
        });
      }

      // --> 5) check if user change email
      case Status.NON_EXISTING_EMAIL: {
        return response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
          message: 'the user that belong to this token no longer exist',
        });
      }

      // --> 6) check if user change username
      case Status.NON_EXISTING_USERNAME: {
        return response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
          message: 'the user that belong to this token no longer exist',
        });
      }

      case Status.EXISTING: {
        // --> 7) fetch user from db
        const currentUser: User = await userService.getUserWithEmail(
          decoded.email
        );

        // --> 8) check if password is correct (if user change password)
        if (!(currentUser.password_hashed === decoded.passwordHashed)) {
          response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
            message: '',
          });
        }

        // --> 9) next
        next();
      }
    }
  } catch (error) {
    next(
      new ApiError(
        'Login error: please try again',
        HTTP_STATUS_CODE.UNAUTHORIZED,
        'fail'
      )
    );
  }
};

export { authHandlerMiddleware };
