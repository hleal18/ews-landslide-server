import Variables from "./Variable";
import IQuery from "./IQuery";

import IVariable from "../domain/IVariable";
import DefaultVariables from "../domain/DefaultVariables";

export default class VariablesRecordManager {

    static async addVariable<T>(variable: IVariable<T>): Promise<IVariable<T>> {
        const result: IVariable<T> = await Variables.create(variable);

        return result;
    }

    static async getVariables<T>(deviceId: String, idSensor?: Number, type?: DefaultVariables, query?: IQuery): Promise<Array<IVariable<T>>> {
        let variablesList: Array<IVariable<T>>;
        console.log('Query: ', query);

        if (type && query && idSensor)
            variablesList = await Variables.find({ deviceId, idSensor, type, timestamp: { $gte: query.start, $lte: query.end } }).skip(query.offset as number).limit(query.limit as number).sort({ timestamp: 'desc' });
        else if (type && query)
            variablesList = await Variables.find({ deviceId, type, timestamp: { $gte: query.start, $lte: query.end } }).skip(query.offset as number).limit(query.limit as number).sort({ timestamp: 'desc' });
        else if (idSensor && type)
            variablesList = await Variables.find({ deviceId, idSensor, type });
        else if (idSensor && query)
            variablesList = await Variables.find({ deviceId, idSensor, timestamp: { $gte: query.start, $lte: query.end } }).skip(query.offset as number).limit(query.limit as number).sort({ timestamp: 'desc' });
        else if (query)
            variablesList = await Variables.find({ deviceId, timestamp: { $gte: query.start, $lte: query.end } }).skip(query.offset as number).limit(query.limit as number).sort({ timestamp: 'desc' });
        else if (idSensor)
            variablesList = await Variables.find({ deviceId, idSensor });
        else if (type)
            variablesList = await Variables.find({ deviceId, type });
        else
            variablesList = await Variables.find({ deviceId });

        //console.log('Vaqr: ', variablesList);

        return variablesList;
    }

    static async getVariable<T>(varId: String): Promise<IVariable<T> | null> {
        const cuchi: IVariable<T> | null = await Variables.findById(varId);

        return cuchi;
    }

}