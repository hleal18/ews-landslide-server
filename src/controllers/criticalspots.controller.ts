import { Request, Response } from 'express';

import CriticalSpotsManager from '../service/CriticalSpotsManager';
import RiskZonesManager from '../service/RiskZonesManager';

import ICriticalSpot from '../domain/ICriticalSpot';
import IRiskZone from '../domain/IRiskZone';

export default class CriticalSpotsController {
    static async addCriticalSpot(req: Request, res: Response): Promise<void> {
        try {
            const criticalSpot: ICriticalSpot = req.body;
            const riskZoneId: string = req.body['riskZoneId'];
            const riskZone: IRiskZone | null = await RiskZonesManager.getRiskZone(riskZoneId);

            if (riskZone === null) throw new Error(`Risk Zone Id invalid: ${riskZoneId}}`);

            const newCriticalSpot = await CriticalSpotsManager.addCriticalSpot(criticalSpot);

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
            if (updatedCriticalSpot) res.status(200).send({ criticalSpot: updatedCriticalSpot });
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

    static async getCriticalSpots(req: Request, res: Response): Promise<void> {
        try {
            const adminId = req.authInfo.id;
            const criticalSpots: [ICriticalSpot] | null = await CriticalSpotsManager.getCriticalSpots(adminId);

            if (criticalSpots) res.status(200).send({ criticalSpots });
            else res.status(404).send({ message: `Error occured: no critical spot was found` })
        } catch (e) {
            console.log(`Error: ${e.message}`);
            res.status(404).send({ message: `There was an error ${e.message}` });
        }
    }
}