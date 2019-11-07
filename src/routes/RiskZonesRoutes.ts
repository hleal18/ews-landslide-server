import Express from "express";
import RiskZonesControllers from "../controllers/RiskZonesControllers";

const router = Express.Router();

router.post('/', RiskZonesControllers.addRiskZone);

export default router;