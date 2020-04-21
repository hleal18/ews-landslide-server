import { Router } from "express";
import DevicesController from "../controllers/devices.controller";
import passport from "passport";

const router: Router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), DevicesController.getDevices);
router.post('/', passport.authenticate('jwt', { session: false }), DevicesController.addDevice);
router.get('/:id', passport.authenticate('jwt', { session: false }), DevicesController.getDevice);
router.patch('/:id', passport.authenticate('jwt', { session: false }), DevicesController.addVariable);

export default router;