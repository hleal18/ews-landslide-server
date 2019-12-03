import IVariable from "../model/IVariable";
import DefaultVariables from "../model/DefaultVariables";

import VariablesRecordManager from "../persistence/VariablesRecordManager";

export default class VariablesManager {
    static async addVariable<T>(variable: IVariable<T>): Promise<IVariable<T>> {
        const result: IVariable<T> = await VariablesRecordManager.addVariable(variable);
        return result;
    }

    static async getVariables<T>(deviceId: String, type?: DefaultVariables, query?: Object): Promise<Array<IVariable<T>>> {
        console.log('devices');
        const variables: Array<IVariable<T>> = await VariablesRecordManager.getVariables(deviceId, type);
        return variables;
    }
}