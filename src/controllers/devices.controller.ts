import { Request, Response } from 'express';

import DevicesManager from '../service/DevicesManager';

import IDevice from '../domain/IDevice';
import IDeviceVariable from '../domain/IDeviceVariable';

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
            const variable: IDeviceVariable = {
                name: req.body['name'],
                description: req.body['description'],
                idSensor: Number(req.body['idSensor']),
                type: req.body['type']
            };

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

    static async getDevices(req: Request, res: Response): Promise<void> {
        // Extract authentication header from request and find associated user.
        // But not right now.

        try {
            const adminId = req.authInfo.id;
            console.log('AdminId: ', adminId);
            const devices = await DevicesManager.getDevices(adminId);
            console.log('Devices: ', devices);

            if (devices) res.status(200).send({ devices: { length: devices.length, devices } });
            else res.status(404).send({ message: 'No devices associated to given user.' });
        } catch (e) {
            res.status(404).send({ message: `There was an error: ${e.message}` });
        }
    }
}