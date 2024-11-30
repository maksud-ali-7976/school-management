import express from 'express';
const router  = express.Router();
import {HandlerForUserRegister,HandlerForUserLogin,HandlerForCheckUserAuth,HandlerForUserLogout} from '../controllers/users.js'


router.post('/register',HandlerForUserRegister);
router.post('/login',HandlerForUserLogin);
router.get('/checkAuth',HandlerForCheckUserAuth);
router.get('/logout',HandlerForUserLogout)



export default router;