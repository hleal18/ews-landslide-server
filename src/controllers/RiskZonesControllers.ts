import { Request, Response } from "express";
import RiskZonesManager from "../service/RiskZonesManager";

export default class RiskZonesControllers {
    static async addRiskZone(req: Request, res: Response): Promise<void> {
        try {
            console.log('Received body: ', req.body);
            const result = await RiskZonesManager.addRiskZone(req.body);
            res.status(200).send({ riskzone: { result } });
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
            const zone = await RiskZonesManager.getRiskZone(id);
            if (zone) res.status(200).send({ riskzone: { zone } });
            else res.status(205).send({ message: `Risk zone with ${id} id not found!` });
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
            const newZone = await RiskZonesManager.editRiskZone(zoneId, zoneAttributes);
            if (newZone) {
                res.status(200).send({ riskZone: { newZone } });
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

    static async addCollaboratorId(req: Request, res: Response): Promise<void> {
        const zoneId = req.params['id'];
        const collaboratorId = req.body['collaboratorId'];

        const newZone = await RiskZonesManager.addCollaboratorId(zoneId, collaboratorId);
        if (newZone) res.status(200).send({ riskZone: { newZone } });
        else res.status(404).send({ message: `Element could not be modified, check id's` });


    }

}