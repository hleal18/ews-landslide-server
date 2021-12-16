import Express from "express";
import RiskZonesControllers from "../controllers/riskzones.controller";
import passport from 'passport';

const router = Express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), RiskZonesControllers.addRiskZone);
router.get('/', passport.authenticate('jwt', { session: false }), RiskZonesControllers.getRiskZones)
router.get('/:id', passport.authenticate('jwt', { session: false }), RiskZonesControllers.getRiskZone);
router.patch('/:id', passport.authenticate('jwt', { session: false }), RiskZonesControllers.editRiskZone);
router.put('/:id/notifications_settings', passport.authenticate('jwt', { session: false }), RiskZonesControllers.updateNotificationsSettings);

export default router;