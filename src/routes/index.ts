import { Router } from "express";
import RiskZonesRoutes from "./riskzones.routes";
import CriticalSpotsRoutes from "./criticalspots.routes";

const appRouter = Router();

appRouter.use('/riskzones', RiskZonesRoutes);
appRouter.use('/criticalspots', CriticalSpotsRoutes);

export default appRouter;