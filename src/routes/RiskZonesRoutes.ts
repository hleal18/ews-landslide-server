import Express from "express";
import RiskZonesControllers from "../controllers/RiskZonesControllers";

const router = Express.Router();

router.post('/', RiskZonesControllers.addRiskZone);
router.get('/:id', RiskZonesControllers.getRiskZone);
router.patch('/:id', RiskZonesControllers.editRiskZone);
router.post('/:id/collaborators', RiskZonesControllers.addCollaboratorId);

export default router;