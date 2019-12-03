import { Router } from "express";
import RiskZonesRoutes from "./riskzones.routes";
import CriticalSpotsRoutes from "./criticalspots.routes";
import DevicesRoutes from "./devices.routes";

const appRouter = Router();

appRouter.use('/riskzones', RiskZonesRoutes);
appRouter.use('/criticalspots', CriticalSpotsRoutes);
appRouter.use('/devices', DevicesRoutes);

export default appRouter;