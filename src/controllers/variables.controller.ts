import IVariable from "../model/IVariable";
import DefaultVariables from "../model/DefaultVariables";

import VariablesManager from "../service/VariablesManager";

import { Request, Response } from "express";

export default class VariablesController {
    static async getVariables<T>(req: Request, res: Response): Promise<void> {
        try {
            const deviceId: String = req.params['id'];
            const type: DefaultVariables = req.body['type'];
            const query = undefined;
            const variables: Array<IVariable<T>> = await VariablesManager.getVariables(deviceId, type);
            console.log('Variables: ', variables);
            res.status(200).send({ variables });
        } catch (e) {
            res.status(404).send({ message: `There was an error ${e.message}` });
        }
    }
}