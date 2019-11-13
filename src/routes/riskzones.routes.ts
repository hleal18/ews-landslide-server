import Express from "express";
import RiskZonesControllers from "../controllers/riskzones.controller";

const router = Express.Router();

router.post('/', RiskZonesControllers.addRiskZone);
router.get('/:id', RiskZonesControllers.getRiskZone);
router.patch('/:id', RiskZonesControllers.editRiskZone);

export default router;