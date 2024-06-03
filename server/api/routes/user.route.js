
import express from 'express';
import { updateUser, deleteUser, getAllUsers } from '../controllers/user.controller.js';
import { test } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getUserListings, viewUserListings } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/test',test);
userRouter.post('/update/:id',verifyToken,updateUser);
userRouter.delete('/delete/:id',verifyToken,deleteUser);
userRouter.get('/listings/:id',verifyToken,getUserListings);
userRouter.get('/users', getAllUsers);
userRouter.get('/listings/:username', viewUserListings);
 
export default userRouter;