import { Gender } from '../utils/enum/Gender';

interface UserResponse {
  username: string;
  email: string;
  password: string;
  gender?: Gender;
}

export { UserResponse };
