import { Router } from 'express';
import CriticalSpotsController from '../controllers/criticalspots.controller';
import passport from 'passport';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), CriticalSpotsController.addCriticalSpot);
router.get('/', passport.authenticate('jwt', { session: false }), CriticalSpotsController.getCriticalSpots);
router.get('/:id', passport.authenticate('jwt', { session: false }), CriticalSpotsController.getCriticalSpot);
router.patch('/:id', passport.authenticate('jwt', { session: false }), CriticalSpotsController.editCriticalSpot);

export default router;