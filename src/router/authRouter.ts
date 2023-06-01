import { Router } from 'express';
import {
  registerController,
  loginWithEmailController,
  loginWithUsernameController,
} from '../controller/authController';
import { authHandlerMiddleware } from '../middleware/authenticationMiddleware';

// --> init router
const authRouter: Router = Router();

// -->
// const authRegisterController = new AuthRegisterController();

//* GET *//

//* POST *//
authRouter.post('/api/v1/auth/register', registerController);
authRouter.post('/api/v1/auth/login/email', loginWithEmailController);
authRouter.post('/api/v1/auth/login/username', loginWithUsernameController);

//* PUT *//

//* DELETE *//

export { authRouter };
