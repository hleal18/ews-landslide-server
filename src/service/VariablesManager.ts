import IVariable from "../domain/IVariable";
import DefaultVariables from "../domain/DefaultVariables";

import IQuery from "../persistence/IQuery";
import VariablesRecordManager from "../persistence/VariablesRecordManager";

export default class VariablesManager {
    static async addVariable<T>(variable: IVariable<T>): Promise<IVariable<T>> {
        const result: IVariable<T> = await VariablesRecordManager.addVariable(variable);
        return result;
    }

    static async getVariables<T>(deviceId: String, idSensor?: Number, type?: DefaultVariables, {
        limit = 20,
        offset = 0,
        start = new Date(0),
        end = new Date(Date.now())
    }: IQuery = {}): Promise<Array<IVariable<T>>> {
        // console.log('devices');
        // console.log('Received things: ');
        console.log(limit, offset, start, end);
        const variables: Array<IVariable<T>> = await VariablesRecordManager.getVariables(deviceId, idSensor, type, { limit, offset, start, end });
        return variables;
    }
}