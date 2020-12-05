import { Router } from 'express';
import AlertsController from '../controllers/alerts.controller';
import passport from 'passport';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), AlertsController.getAlerts);

export default router;
