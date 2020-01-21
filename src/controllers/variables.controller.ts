import IVariable from "../domain/IVariable";
import IQuery from "../persistence/IQuery";
import DefaultVariables from "../domain/DefaultVariables";
import VariablesManager from "../service/VariablesManager";

import { Request, Response } from "express";

export default class VariablesController {
    static async getVariables<T>(req: Request, res: Response): Promise<void> {
        try {
            const deviceId: String = req.params['id'];
            const idSensor = (req.query['idSensor']) ? Number(req.query['idSensor']) : undefined;
            const type: DefaultVariables = req.query['type'];
            const limit = (req.query['limit']) ? Number(req.query['limit']) : undefined;
            const offset = (req.query['offset']) ? Number(req.query['offset']) : undefined;
            const start = (req.query['start']) ? new Date(String(req.query['start'])) : undefined;
            const end = (req.query['end']) ? new Date(String(req.query['end'])) : undefined;

            const query: IQuery = { limit, offset, start, end };

            console.log('Query received: ', query);
            const variables: Array<IVariable<T>> = await VariablesManager.getVariables(deviceId, idSensor, type, query);

            //console.log('Variables: ', variables);
            res.status(200).send({
                variables_records: {
                    length: variables.length,
                    variables
                }
            });
        } catch (e) {
            res.status(404).send({ message: `There was an error ${e.message}` });
        }
    }
}