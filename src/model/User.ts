import { Gender } from '../utils/enum/Gender';
import { Role } from '../utils/enum/Role';

interface User {
  id?: string;
  username: string;
  email: string;
  passwordHash: string;
  gender?: Gender;
  registeredAt?: Date;
  lastLogin?: Date;
  updatedAt?: Date;
  isAdmin?: Role;
  isActive: boolean;
}

export { User };
