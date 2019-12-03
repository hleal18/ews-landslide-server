import { Router } from "express";
import VariablesController from "../controllers/variables.controller";

const router = Router();

router.get('/:id', VariablesController.getVariables);

export default router;