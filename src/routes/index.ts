import { Router } from "express";
import RiskZonesRoutes from "./riskzones.routes";
import CriticalSpotsRoutes from "./criticalspots.routes";
import DevicesRoutes from "./devices.routes";
import VariablesRoutes from "./variables.routes";
import ThresholdsRoutes from "./thresholds.routes";
import UsersRoutes from "./users.routes";

const appRouter = Router();

appRouter.use('/riskzones', RiskZonesRoutes);
appRouter.use('/criticalspots', CriticalSpotsRoutes);
appRouter.use('/devices', DevicesRoutes);
appRouter.use('/variables', VariablesRoutes);
appRouter.use('/thresholds', ThresholdsRoutes);
appRouter.use('/users', UsersRoutes);

export default appRouter;