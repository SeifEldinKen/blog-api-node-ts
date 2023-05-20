import { Router } from 'express';
import { registerController } from '../controller/authController';

// --> init router
const authRouter: Router = Router();

//* GET *//

//* POST *//
authRouter.post('/', registerController);

//* PUT *//

//* DELETE *//

export { authRouter };
