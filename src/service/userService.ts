import { QueryResult } from 'pg';
import { pool as db } from '../database/database';
import { User } from '../model/User';
import { Gender } from '../utils/enum/Gender';
import bcrypt from 'bcrypt';
import config from '../utils/config';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODE } from '../utils/constants/HttpStatusCode';
import { ApiError } from '../error/ApiError';

enum UserStatus {
  USERNAME_EXISTING,
  EMAIL_EXISTING,
  NON_EXISTING,
}

enum Status {
  EXISTING,
  NON_EXISTING_EMAIL,
  NON_EXISTING_USERNAME,
  NON_EXISTING,
}

class UserService {
  public checkIfUsersExists = async (email: string, username: string) => {
    const resultEmail = await this.checkIfEmailExists(email);
    const resultUsername = await this.checkIfUsernameExists(username);

    if (
      resultEmail === Status.NON_EXISTING_EMAIL &&
      resultUsername === Status.NON_EXISTING_USERNAME
    ) {
      return Status.NON_EXISTING;
    }

    if (resultEmail === Status.NON_EXISTING_EMAIL) {
      return Status.NON_EXISTING_EMAIL;
    }

    if (resultUsername === Status.NON_EXISTING_USERNAME) {
      return Status.NON_EXISTING_USERNAME;
    }

    return Status.EXISTING;
  };

  public checkIfEmailExists = async (email: string) => {
    try {
      // --> open connection with DB
      const connection = await db.connect();

      // --> check email if exist query text
      const checkEmailQuery: QueryResult<User> = await connection.query<User>({
        text: 'SELECT * FROM users WHERE email = ($1)',
        values: [email],
      });

      connection.release();

      if (checkEmailQuery.rowCount === 0) {
        return Status.NON_EXISTING_EMAIL;
      }

      return Status.EXISTING;
    } catch (error) {
      console.error(error);
    }
  };

  public checkIfUsernameExists = async (username: string) => {
    try {
      // --> open connection with DB
      const connection = await db.connect();

      // --> check username if exist query text
      const checkUsernameQuery: QueryResult<User> = await connection.query({
        text: 'SELECT * FROM users WHERE username = ($1)',
        values: [username],
      });

      connection.release();

      if (checkUsernameQuery.rowCount === 0) {
        return Status.NON_EXISTING_USERNAME;
      }

      return Status.EXISTING;
    } catch (error) {
      console.error(error);
    }
  };

  public createUser = async (
    username: string,
    email: string,
    passwordHashed: string,
    gender: Gender
  ) => {
    try {
      // --> open connection with DB
      const connection = await db.connect();

      // --> insert new user in database
      const newUser: QueryResult<User> = await connection.query<User>({
        text: 'INSERT INTO users (username, email, password_hashed, gender) VALUES($1, $2, $3, $4) returning *',
        values: [username, email, passwordHashed, gender],
      });

      // --> release connection
      connection.release();

      return newUser.rows[0];
    } catch (error) {
      throw new ApiError(
        `unable to create new user (${email}): ${(error as Error).message}`,
        HTTP_STATUS_CODE.BAD_REQUEST,
        'fail'
      );
    }
  };

  public getUserWithEmail = async (email: string): Promise<User> => {
    try {
      // --> open connection with DB
      const connection = await db.connect();

      // --> fetch user form DB
      const getUserQuery: QueryResult<User> = await connection.query<User>({
        text: 'SELECT * FROM users WHERE email = ($1)',
        values: [email],
      });

      // --> release DB
      connection.release();

      return getUserQuery.rows[0];
    } catch (error) {
      throw new ApiError(
        `unable to get User With Email (${email}): ${(error as Error).message}`,
        HTTP_STATUS_CODE.BAD_REQUEST,
        'fail'
      );
    }
  };

  public getUserWithUsername = async (username: string): Promise<User> => {
    try {
      // --> open connection with DB
      const connection = await db.connect();

      // --> fetch user form DB
      const getUserQuery: QueryResult<User> = await connection.query<User>({
        text: 'SELECT * FROM users WHERE username = ($1)',
        values: [username],
      });

      // --> release DB
      connection.release();

      return getUserQuery.rows[0];
    } catch (error) {
      throw new ApiError(
        `unable to get User With Email (${username}): ${
          (error as Error).message
        }`,
        HTTP_STATUS_CODE.BAD_REQUEST,
        'fail'
      );
    }
  };

  public passwordToHash = async (password: string) => {
    try {
      return bcrypt.hash(`${password}${config.pepper}`, Number(config.salt));
    } catch (error) {
      throw new ApiError(
        `unable to password To Hash: ${(error as Error).message}`,
        HTTP_STATUS_CODE.BAD_REQUEST,
        'fila'
      );
    }
  };

  public verifyPassword = async (
    password: string,
    passwordHashed: string
  ): Promise<boolean> => {
    try {
      const result: boolean = await bcrypt.compare(
        `${password}${config.pepper}`,
        passwordHashed
      );
      return result;
    } catch (error) {
      throw new ApiError(
        `unable to verifyPassword: ${(error as Error).message}`,
        HTTP_STATUS_CODE.BAD_REQUEST,
        'fila'
      );
    }
  };

  public generateToke = async (
    email: string,
    username: string,
    passwordHashed: string
  ): Promise<string> => {
    try {
      const token: string = await jwt.sign(
        { email, username, passwordHashed },
        String(config.tokenSecret)
      );
      return token;
    } catch (error) {
      throw new ApiError(
        `unable to generateToke: ${(error as Error).message}`,
        HTTP_STATUS_CODE.BAD_REQUEST,
        'fila'
      );
    }
  };

  public verifyToken = async (token: string) => {
    try {
      const result = await jwt.verify(token, String(config.tokenSecret));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export { UserService, UserStatus, Status };
