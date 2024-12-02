import express from 'express';
const router  = express.Router();
import {HandlerForUserRegister,HandlerForUserLogin,HandlerForCheckUserAuth,HandlerForUserLogout} from '../controllers/users.js'
import {AuthMiddleware} from '../middleware/Auth.js'

router.post('/register',HandlerForUserRegister);
router.post('/login',HandlerForUserLogin);
router.get('/checkAuth',HandlerForCheckUserAuth);
router.post('/logout',HandlerForUserLogout)



export default router;