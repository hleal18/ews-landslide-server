import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import passport from 'passport';

const router = Router();

// creates a new user
router.post('/', UsersController.addUser);
router.post('/login', UsersController.login);
router.get('/', passport.authenticate('jwt', { session: false }), UsersController.getUser);
router.patch('/', passport.authenticate('jwt', { session: false }), UsersController.modifyUser);

export default router;