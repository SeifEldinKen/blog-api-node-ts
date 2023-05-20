import { User } from '../model/User';

interface AuthRegisterRepository {
  register(user: User): Promise<User | null>;
}

class AuthRegisterController implements AuthRegisterRepository {
  register(user: User): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
