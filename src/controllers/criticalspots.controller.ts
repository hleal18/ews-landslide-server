import { Request, Response } from 'express';

import CriticalSpotsManager from '../service/CriticalSpotsManager';
import RiskZonesManager from '../service/RiskZonesManager';

import ICriticalSpot from '../model/ICriticalSpot';
import IRiskZone from '../model/IRiskZone';
import { CriticalSpotDocument } from '../persistence/CriticalSpot';

export default class CriticalSpotsController {
    static async addCriticalSpot(req: Request, res: Response): Promise<void> {
        try {
            const criticalSpot: ICriticalSpot = req.body;
            const riskZoneId: string = req.body['riskZoneId'];

            const riskZone: IRiskZone | null = await RiskZonesManager.getRiskZone(riskZoneId);
            if (!riskZone) throw new Error(`Risk Zone Id invalid: ${riskZoneId}}`);

            const newCriticalSpot = await CriticalSpotsManager.addCriticalSpot(criticalSpot);
            const updatedRiskZone: IRiskZone | null = await RiskZonesManager.addCriticalSpotId(riskZoneId, (newCriticalSpot as CriticalSpotDocument)._id);
            res.status(200).send({ criticalSpot: newCriticalSpot });
        } catch (e) {
            console.log(`Error: ${e.message}`);
            res.status(404).send({ message: `There was an error ${e.message}` });
        }
    }

    static async editCriticalSpot(req: Request, res: Response): Promise<void> {
        try {
            const criticalSpotId = req.params['id'];
            const criticalSpot: ICriticalSpot = req.body;
            const updatedCriticalSpot: ICriticalSpot | null = await CriticalSpotsManager.editCriticalSpot(criticalSpotId, criticalSpot);
            if (updatedCriticalSpot) res.status(200).send({ criticalSpot: { ...updatedCriticalSpot } });
            else res.status(404).send({ message: `Error occured: CriticalSpotsObject not found` });
        } catch (e) {
            console.log(`Error: ${e.message}`);
            res.status(404).send({ message: `There was an error ${e.message}` });
        }
    }

    static async getCriticalSpot(req: Request, res: Response): Promise<void> {
        try {
            const criticalSpotId = req.params['id'];
            const criticalSpot: ICriticalSpot | null = await CriticalSpotsManager.getCriticalSpot(criticalSpotId);
            if (criticalSpot) res.status(200).send({ criticalSpot });
            else res.status(404).send({ message: `Error occurred: CriticalSpot entry not found for ${criticalSpotId} id` });
        } catch (e) {
            console.log(`Error: ${e.message}`);
            res.status(404).send({ message: `There was an error ${e.message}` });
        }
    }
}