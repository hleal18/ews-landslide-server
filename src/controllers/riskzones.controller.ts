import { Request, Response } from "express";
import RiskZonesManager from "../service/RiskZonesManager";
import IRiskZone from "../domain/IRiskZone";

export default class RiskZonesControllers {
    static async addRiskZone(req: Request, res: Response): Promise<void> {
        try {
            const riskZone: IRiskZone = {
                name: req.body.name,
                description: req.body.description,
                adminId: req.authInfo.id
            }

            const newRiskZone = await RiskZonesManager.addRiskZone(riskZone);
            res.status(200).send({ riskZone: newRiskZone });
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
                console.log('There is a missing field in the request: ', e.message);
                res.status(404).send({ message: `Id parameter expected` });
            }
            else if (e.name == 'CastError' && e.kind == 'ObjectId') {
                console.log(`Error: ${e.message}`);
                res.status(404).send({ message: `Invalid Id received.` });
            }
        }
    }

    static async getRiskZones(req: Request, res: Response): Promise<void> {
        try {
            const adminId: string = req.authInfo.id;

            const riskZones: [IRiskZone] | null = await RiskZonesManager.getRiskZones(adminId);

            if (riskZones) res.status(200).send({ riskZones });
            else res.status(205).send({ message: `Riskzones for adminId: ${adminId} not found!` });

        } catch (e) {
            if (e.name === 'ValidationError') {
                console.log('There is a missing field in the request: ', e.message);
                res.status(404).send({ message: `Id parameter expected` });
            }
            else if (e.name == 'CastError' && e.kind == 'ObjectId') {
                console.log(`Error: ${e.message}`);
                res.status(404).send({ message: `Invalid Id received.` });
            }
        }
    }

    // Add error handling for every possible outcome.
    // Id not provided, collaboratorId not provided, invalid riskzone id, invalid collaboratorId
    // collaboratorId already exists
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
        } catch (e) {
            console.log('An error occured: ', e);
            console.log('An error occured: ', e.message);
            res.status(404).send({ message: 'Document was not edited, an unexpected error occurred' });
        }
    }
}