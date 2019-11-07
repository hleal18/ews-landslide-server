import { Request, Response } from "express";
import RiskZonesManager from "../service/RiskZonesManager";
import mongoose from "mongoose";

export default class RiskZonesControllers {
    static async addRiskZone(req: Request, res: Response): Promise<void> {
        try {
            console.log('Received body: ', req.body);
            const result = await RiskZonesManager.addRiskZone(req.body);
            res.status(200).send({ result });
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
}