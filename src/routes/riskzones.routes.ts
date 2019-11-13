import Express from "express";
import RiskZonesControllers from "../controllers/riskzones.controller";

const router = Express.Router();

router.post('/', RiskZonesControllers.addRiskZone);
router.get('/:id', RiskZonesControllers.getRiskZone);
router.patch('/:id', RiskZonesControllers.editRiskZone);
router.post('/:id/collaborators', RiskZonesControllers.addCollaboratorId);
router.delete('/:id/collaborators', RiskZonesControllers.deleteCollaboratorId);
router.post('/:id/criticalspots', RiskZonesControllers.addCriticalSpotId);
router.delete('/:id/criticalspots', RiskZonesControllers.deleteCriticalSpot);

export default router;