import { Request, Response } from "express";
import RiskZonesManager from "../service/RiskZonesManager";
import IRiskZone from "../model/IRiskZone";

export default class RiskZonesControllers {
    static async addRiskZone(req: Request, res: Response): Promise<void> {
        try {
            console.log('Received body: ', req.body);
            const riskZone = await RiskZonesManager.addRiskZone(req.body);
            res.status(200).send({ riskZone });
        } catch (e) {
            if (e.name === 'ValidationError') {
                console.log('There is a missing field in the body of the request: ', req.body);
                res.status(404).send({ message: `'There is a missing field in the body of the request: ${req.body}` });
            }
            else {
                console.log('unexpected error happened ', e.message);
                res.status(404).send({ message: `unexpected error happened, review post request body.` });
            }
        }
    }

    static async getRiskZone(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params["id"];
            console.log('Received id, ', id);
            const riskZone = await RiskZonesManager.getRiskZone(id);
            if (riskZone) res.status(200).send({ riskZone });
            else res.status(205).send({ message: `Risk riskZone with ${id} id not found!` });
        } catch (e) {
            if (e.name === 'ValidationError') {
                console.log('There is a missing filed in the request: ', e.message);
                res.status(404).send({ message: `Id parameter expected` });
            }
            else if (e.name == 'CastError' && e.kind == 'ObjectId') {
                console.log(`Error: ${e.message}`);
                res.status(404).send({ message: `Invalid Id received.` });
            }
        }
    }

    static async editRiskZone(req: Request, res: Response): Promise<void> {
        try {
            const zoneId = req.params['id'];
            const zoneAttributes = req.body;
            const riskZone = await RiskZonesManager.editRiskZone(zoneId, zoneAttributes);
            if (riskZone) {
                res.status(200).send({ riskZone });
            }
            else {
                res.status(404).send({ message: 'Document was not edited, review the request.' });
            }
            // Proveer un Id inválido.
            // Proveer un Id valido y en el cuerpo tratar de modificar Id (es inmutable)
            // Proveer un id valid pero un atributo id invalido
            // Modifica directamente las listas internas.
        } catch (e) {
            console.log('An error occured: ', e);
            console.log('An error occured: ', e.message);
            res.status(404).send({ message: 'Document was not edited, an unexpected error occurred' });
        }
    }

    // Add error handling for every possible outcome.
    // Id not provided, collaboratorId not provided, invalid riskzone id, invalid collaboratorId
    // collaboratorId already exists
    static async addCollaboratorId(req: Request, res: Response): Promise<void> {
        try {
            const zoneId: string = req.params['id'];
            let collaboratorId: String = req.body['collaboratorId'];
            if (collaboratorId === null) console.log('Collaborator Id non existent.');
            else if (collaboratorId === undefined) console.log('"Collaborator Id Undefined"');
            // if (!zoneId || !collaboratorId) {
            //     res.status(404).send({ message: `RiskZone Id or Collaborator Id missing` });
            //     return;
            // }
            const riskZone = await RiskZonesManager.addCollaboratorId(zoneId, collaboratorId as string);
            if (riskZone) res.status(200).send({ riskZone });
            else res.status(404).send({ message: `Element could not be modified, check id's` });
        } catch (e) {
            console.log('Error: ', e.message);
            res.status(404).send({ message: `Error: ${e.message}` });
        }

    }

    static async addCriticalSpotId(req: Request, res: Response): Promise<void> {
        try {
            const zoneId: string = req.params['id'];
            const criticalSpotId: string = req.body['criticalSpotId'];
            const riskZone: IRiskZone | null = await RiskZonesManager.addCriticalSpotId(zoneId, criticalSpotId);
            if (riskZone) res.status(200).send({ riskZone });
            else res.status(404).send({ message: `Element could not be modified, check id's` });
        } catch (e) {
            console.log('Error: ', e.message);
            res.status(404).send({ message: `Error: ${e.message}` });
        }
    }

    static async deleteCollaboratorId(req: Request, res: Response): Promise<void> {
        try {
            const zoneId: string = req.params['id'];
            const collaboratorId: string = req.body['collaboratorId'];
            const riskZone: IRiskZone | null = await RiskZonesManager.deleteCollaboratorId(zoneId, collaboratorId);
            if (riskZone) res.status(200).send({ riskZone });
            else res.status(404).send({ message: `Element could not be modified, check id's` });
        } catch (e) {
            console.log('Error: ', e.message);
            res.status(404).send({ message: `Error: ${e.message}` });
        }
    }

    static async deleteCriticalSpot(req: Request, res: Response): Promise<void> {
        try {
            const zoneId: string = req.params['id'];
            const criticalSpotId: string = req.body['criticalSpotId'];
            const riskZone: IRiskZone | null = await RiskZonesManager.deleteCriticalSpotId(zoneId, criticalSpotId);
            if (riskZone) res.status(200).send({ riskZone });
            else res.status(404).send({ message: `Element could not be modified, check id's` });
        } catch (e) {
            console.log('Error: ', e.message);
            res.status(404).send({ message: `Error: ${e.message}` });
        }
    }
}