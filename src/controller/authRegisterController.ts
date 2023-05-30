// import { User } from '../model/User';
// import {
//   checkEmailExists,
//   checkUsernameExists,
//   passwordToHash,
// } from '../service/userService';
// import { pool as db } from '../database/database';
// import { AuthRegisterInterface } from './interface/authRegisterInterface';
// import config from '../utils/config';
// import bcrypt from 'bcrypt';
// import { ApiError } from '../error/ApiError';

// const passwordHash = async (password: string) => {
//   const salt: number = Number(config.salt);
//   return bcrypt.hashSync(`${password}${config.pepper}`, salt);
// };

// class AuthRegisterController implements AuthRegisterInterface {
//   register = async (user: User): Promise<User | undefined> => {
//     try {
//       // --> check user if exist query text
//       const resultEmail = await checkEmailExists(user.email);
//       const resultUsername = await checkUsernameExists(user.username);

//       if (resultEmail !== true && resultUsername !== true) {
//         // --> hash password
//         const passwordHashed: string = await passwordHash(user.passwordHash);

//         // --> generate toke

//         // --> open connection with DB
//         const connection = await db.connect();

//         // --> insert user query text
//         const insertUserQuery = {
//           text: 'INSERT INTO users (username, email, password) VALUES($1, $2, $3) returning *',
//           values: [user.username, user.email, passwordHashed],
//         };

//         // --> insert new user in database
//         const insertNewUser: User | undefined = (
//           await connection.query<User>(insertUserQuery)
//         ).rows[0];

//         // --> release connection
//         connection.release();

//         return insertNewUser;
//       } else if (resultEmail === true) {
//         throw Error('this email is exist');
//       } else {
//         throw Error('this password is exist');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
// }

// export { AuthRegisterController };
