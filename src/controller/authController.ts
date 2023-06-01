import { NextFunction, Request, Response } from 'express';
import { Status, UserService, UserStatus } from '../service/userService';
import { HTTP_STATUS_CODE } from '../utils/constants/HttpStatusCode';
import { ApiError } from '../error/ApiError';
import { Gender } from '../utils/enum/Gender';
import { User } from '../model/User';
import { UserResponse } from '../model/UserResponse';
import { JwtObject } from '../model/JwtObject';

const registerController = async (request: Request, response: Response) => {
  try {
    // --> 1) check if email and password in the body (validation)

    // --> 2) get data from request body
    const { username, email, password, gender }: UserResponse = request.body;

    // --> create object
    const userService: UserService = new UserService();

    // --> 3) check if email and username exists in database
    const isUserExists: Status = await userService.checkIfUsersExists(
      email,
      username
    );

    switch (isUserExists) {
      case Status.EXISTING: {
        return response.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          message: 'email and username already exists',
        });
      }

      case Status.NON_EXISTING_EMAIL: {
        return response.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          message: 'email already exists',
        });
      }

      case Status.NON_EXISTING_USERNAME: {
        return response.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          message: 'username already exists',
        });
      }

      case Status.NON_EXISTING: {
        // --> 4) hashed password
        const passwordHashed: string = await userService.passwordToHash(
          password
        );

        // --> 5) generate toke
        const payload: JwtObject = {
          email,
          username,
          passwordHashed,
        };

        const token: string = await userService.generateToke(payload);

        // --> 6) insert new user in database
        const newUser: User = await userService.createUser(
          username,
          email,
          passwordHashed,
          gender || Gender.MALE
        );

        // --> 7) send response to cline side
        return response.status(HTTP_STATUS_CODE.CREATED).json({
          newUser,
          token,
        });
      }
    }
  } catch (error) {
    throw new ApiError(
      `unable to register: ${(error as Error).message}`,
      HTTP_STATUS_CODE.UNAUTHORIZED,
      'fila'
    );
  }
};

/**
 *  @Desc    --> register new user
 *  @Router  --> POST /api/v1/auth/register
 *  @Access  --> public
 */
const loginWithEmailController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // --> 1) check if email and password in the body (validation)

    // --> 2) get data from request body
    const { email, password }: UserResponse = request.body;

    // --> create object
    const userService: UserService = new UserService();

    // --> 3) check if email exists in database
    const resultEmail = await userService.checkIfEmailExists(email);

    switch (resultEmail) {
      case Status.NON_EXISTING_EMAIL: {
        return response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
          statusCode: HTTP_STATUS_CODE.UNAUTHORIZED,
          message: 'the email or password is incorrect',
        });
      }

      case Status.EXISTING: {
        // --> 4) fetch user form DB
        const currentUser: User = await userService.getUserWithEmail(email);

        // --> 5) check if password is correct
        const isPasswordValid: boolean = await userService.verifyPassword(
          password,
          currentUser.password_hashed
        );

        if (isPasswordValid === false) {
          return response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
            statusCode: HTTP_STATUS_CODE.UNAUTHORIZED,
            message: 'the email or password is incorrect',
          });
        }

        // --> 6) generate toke
        const payload: JwtObject = {
          email: currentUser.email,
          username: currentUser.username,
          passwordHashed: currentUser.password_hashed,
        };

        const token: string = await userService.generateToke(payload);

        // --> 7) send response to cline side
        return response.status(HTTP_STATUS_CODE.OK).json({
          currentUser,
          token,
        });
      }
    }
  } catch (error) {
    throw new ApiError(
      `unable to login: ${(error as Error).message}`,
      HTTP_STATUS_CODE.UNAUTHORIZED,
      'fila'
    );
  }
};

const loginWithUsernameController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // --> 1) check if email and password in the body (validation)

  // --> 2) get data from request body
  const { username, password }: UserResponse = request.body;

  // --> create object
  const userService: UserService = new UserService();

  // --> 3) check if username exists in database
  const resultUsername = await userService.checkIfUsernameExists(username);

  switch (resultUsername) {
    case Status.NON_EXISTING_USERNAME: {
      return response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        statusCode: HTTP_STATUS_CODE.UNAUTHORIZED,
        message: 'the username or password is incorrect',
      });
    }
    case Status.EXISTING: {
      // --> 4) fetch user from db
      const currentUser: User = await userService.getUserWithUsername(username);

      // --> 5) check if password is correct
      const isPasswordValid: boolean = await userService.verifyPassword(
        password,
        currentUser.password_hashed
      );

      if (isPasswordValid === false) {
        return response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
          statusCode: HTTP_STATUS_CODE.UNAUTHORIZED,
          message: 'the username or password is incorrect',
        });
      }

      // --> 6) generate toke
      const payload: JwtObject = {
        email: currentUser.email,
        username: currentUser.username,
        passwordHashed: currentUser.password_hashed,
      };

      const token: string = await userService.generateToke(payload);

      // --> 7) send response to cline side
      return response.status(HTTP_STATUS_CODE.OK).json({
        currentUser,
        token,
      });
    }
  }
};

export {
  registerController,
  loginWithEmailController,
  loginWithUsernameController,
};
