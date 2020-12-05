import { Request, Response } from 'express';

import AlertRegistryManager from '../service/AlertsRegistryManager';

import IAlertRegistry from '../domain/IAlertRegistry'; 

export default class AlertsController {
    static async getAlerts(req: Request, res: Response): Promise<void> {
      try {
        const adminId = req.authInfo?.id;
        const alerts: IAlertRegistry[] = await AlertRegistryManager.getAlertsByAdminId(adminId);
        if (alerts) res.status(200).send({ alerts });
        else res.status(404).send({ message: `Alerts could not be fetched: admin not found` });
      } catch (e) {
        console.log(`Error while fetching alerts: ${e.message}`);
        res.status(404).send({ message: `There was an error ${e.message}` });
      }
    }
}