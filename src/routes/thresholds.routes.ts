import { Router } from "express";
import passport from "passport";
import ThresholdsController from "../controllers/thresholds.controller";


const routes = Router();

routes.post('/', passport.authenticate('jwt', { session: false }), ThresholdsController.add);
routes.get('/', passport.authenticate('jwt', { session: false }), ThresholdsController.getThresholds);
routes.get('/:id', passport.authenticate('jwt', { session: false }), ThresholdsController.get);
routes.patch('/:id', passport.authenticate('jwt', { session: false }), ThresholdsController.patch);
routes.put('/:id', passport.authenticate('jwt', { session: false }), ThresholdsController.put);

export default routes;