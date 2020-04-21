import ThresholdsManager from "../service/ThresholdsManager";
import IThreshold from "../domain/IThreshold";
import { Request, Response } from "express";

export default class ThresholdsController {
    static async add(req: Request, res: Response): Promise<void> {
        try {
            const threshold: IThreshold = {
                ...req.body,
                adminId: req.authInfo.id;
            }

            const result = await ThresholdsManager.add(threshold);
            res.status(200).send({ threshold: result });
        } catch (e) {
            res.status(404).send({ message: `There was an error while adding a new threshold: ${e.message}` });
        }
    }

    static async patch(req: Request, res: Response): Promise<void> {
        try {
            const threshold: IThreshold = {
                ...req.body,
                adminId: req.authInfo.id,
                _id: req.params['id']
            };

            const updatedThreshold = await ThresholdsManager.edit(threshold);

            if (!updatedThreshold) throw new Error(`Threshold could not be updated, not found`);
            res.status(200).send({ threshold: updatedThreshold });
        } catch (e) {
            res.status(404).send({ message: `There was an error while editting a threshold: ${e.message}` });
        }
    }

    static async put(req: Request, res: Response): Promise<void> {
        try {
            const threshold: IThreshold = {
                ...req.body,
                adminId: req.authInfo.id,
                _id: req.params['id']
            };

            const updatedThreshold = await ThresholdsManager.editWithUnset(threshold);

            if (!updatedThreshold) throw new Error(`Threshold could not be updated, not found`);
            res.status(200).send({ threshold: updatedThreshold });
        } catch (e) {
            res.status(404).send({ message: `There was an error while editting a threshold: ${e.message}` });
        }
    }

    static async get(req: Request, res: Response): Promise<void> {
        try {
            const adminId = req.authInfo.id;
            const thresholdId = req.params['id'];

            const threshold = await ThresholdsManager.get(thresholdId, adminId);
            if (!threshold) throw new Error(`Threshold not found for variableId ${thresholdId}`);
            res.status(200).send({ threshold });
        } catch (e) {
            res.status(404).send({ message: `There was an error while getting a threshold: ${e.message}` });
        }
    }

    static async getThresholds(req: Request, res: Response): Promise<void> {
        try {
            const adminId = req.authInfo.id;

            const thresholds = await ThresholdsManager.getThresholds(adminId);

            if (!thresholds || thresholds.length === 0) throw new Error(`No thresholds were found for current user.`);

            res.status(200).send({ thresholds });
        } catch (e) {
            res.status(404).send({ message: `There was an error while getting thresholds: ${e.message}` });
        }
    }
}