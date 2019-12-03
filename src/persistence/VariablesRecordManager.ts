import Variables, { AccelerationVariables, RainfallVariables } from "./Variable";
import IVariable from "../model/IVariable";
import DefaultVariables from "../model/DefaultVariables";

export default class VariablesRecordManager {

    static async addVariable<T>(variable: IVariable<T>): Promise<IVariable<T>> {
        const result: IVariable<T> = await Variables.create(variable);

        return result;
    }

    static async getVariables<T>(deviceId: String, type?: DefaultVariables): Promise<Array<IVariable<T>>> {
        let variablesList: Array<IVariable<T>>;

        if (type)
            variablesList = await Variables.find({ deviceId, type });
        else
            variablesList = await Variables.find({ deviceId });

        console.log('Vaqr: ', variablesList);

        return variablesList;
    }

    static async getVariable<T>(varId: String): Promise<IVariable<T> | null> {
        const cuchi: IVariable<T> | null = await Variables.findById(varId);

        return cuchi;
    }

}