import { Router } from "express";
import DevicesController from "../controllers/devices.controller";

const router: Router = Router();

router.get('/', DevicesController.getDevices);
router.post('/', DevicesController.addDevice);
router.get('/:id', DevicesController.getDevice);
router.patch('/:id', DevicesController.addVariable);

export default router;