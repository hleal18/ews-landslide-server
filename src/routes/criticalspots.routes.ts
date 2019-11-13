import { Router } from 'express';
import CriticalSpotsController from '../controllers/criticalspots.controller';

const router = Router();

router.post('/', CriticalSpotsController.addCriticalSpot);
router.get('/:id', CriticalSpotsController.getCriticalSpot);
router.patch('/:id', CriticalSpotsController.editCriticalSpot);

export default router;