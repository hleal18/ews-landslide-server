import CriticalSpotsManager from '../service/CriticalSpotsManager';
import ICriticalSpot from '../model/ICriticalSpot';
import { Request, Response } from 'express';

export default class CriticalSpotsController {
    static async addCriticalSpot(req: Request, res: Response): Promise<void> {
        try {
            const criticalSpot: ICriticalSpot = req.body;
            const riskZoneId: string = req.body['riskZoneId'];
            const newCriticalSpot = await CriticalSpotsManager.addCriticalSpot(riskZoneId, criticalSpot);
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