import express from 'express';
import { signup , signin , google, userSignout} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/Register",signup)
authRouter.post("/Login",signin)
authRouter.post("/google",google);
authRouter.get('/signout',userSignout);

export default authRouter;
 