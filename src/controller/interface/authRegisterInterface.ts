import { User } from '../../model/User';

interface AuthRegisterInterface {
  register(user: User): Promise<User | undefined>;
}

export { AuthRegisterInterface };
