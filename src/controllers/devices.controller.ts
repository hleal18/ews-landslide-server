import { Request, Response } from 'express';

import DevicesManager from '../service/DevicesManager';

import IDevice from '../model/IDevice';
import DefaultVariables from "../model/DefaultVariables";

export default class DevicesController {
    static async addDevice(req: Request, res: Response): Promise<void> {
        try {
            const device: IDevice = req.body;

            const newDevice = await DevicesManager.addDevice(device);

            res.status(200).send({ device: newDevice });
        } catch (e) {
            console.log(`Error: ${e.message}`);
            res.status(404).send({ message: `There was an error ${e.message}` });
        }
    }

    static async addVariable(req: Request, res: Response): Promise<void> {
        try {
            const deviceId = req.params['id'];
            const variable: DefaultVariables = (req.body['variable'] as DefaultVariables);

            console.log('Received variable: ', variable);
            console.log('Parameter: ', req.body['variable']);

            const updatedDevice: IDevice | null = await DevicesManager.addVariable(deviceId, variable);
            if (updatedDevice) res.status(200).send({ device: updatedDevice });
            else res.status(404).send({ message: `Error occured: CriticalSpotsObject not found` });
        } catch (e) {
            console.log(`Error: ${e.message}`);
            res.status(404).send({ message: `There was an error ${e.message}` });
        }
    }

    static async getDevice(req: Request, res: Response): Promise<void> {
        try {
            const deviceId = req.params['id'];
            const device: IDevice | null = await DevicesManager.getDevice(deviceId);
            if (device) res.status(200).send({ device });
            else res.status(404).send({ message: `Error occurred: deviceId entry not found for ${deviceId} id` });
        } catch (e) {
            console.log(`Error: ${e.message}`);
            res.status(404).send({ message: `There was an error ${e.message}` });
        }
    }
}