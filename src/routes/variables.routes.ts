import { Router } from "express";
import VariablesController from "../controllers/variables.controller";

const router = Router();

router.get('/:id', VariablesController.getVariables);
router.get('/:id/:idSensor/excel', VariablesController.getVariablesInExcelSheetFormat);

export default router;