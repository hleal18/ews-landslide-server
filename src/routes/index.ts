import { Router } from "express";
import RiskZonesRoutes from "./RiskZonesRoutes";

const appRouter = Router();

appRouter.use('/riskzones', RiskZonesRoutes);

export default appRouter;