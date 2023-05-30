import { Gender } from '../utils/enum/Gender';
import { Role } from '../utils/enum/Role';

interface User {
  id?: string;
  username: string;
  email: string;
  password_hashed: string;
  gender?: Gender;
  registered_at?: Date;
  last_login?: Date;
  updated_at?: Date;
  is_admin?: Role;
  is_active: boolean;
}

export { User };
