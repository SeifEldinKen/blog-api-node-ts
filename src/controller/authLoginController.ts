import { User } from '../model/User';

interface AuthLoginWithEmailRepository {
  loginWithEmail(email: string, password: string): Promise<User | null>;
}

interface AuthLoginWithUsernameRepository {
  loginWithUsername(username: string, password: string): Promise<User | null>;
}

class AuthLoginController {}
