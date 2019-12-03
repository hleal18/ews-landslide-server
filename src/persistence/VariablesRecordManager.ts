import Variables, { AccelerationVariables, RainfallVariables } from "./Variable";
import IVariable from "../model/IVariable";
import DefaultVariables from "../model/DefaultVariables";

export default class VariablesRecordManager {

    static async addVariable<T>(variable: IVariable<T>): Promise<IVariable<T>> {
        const result: IVariable<T> = await Variables.create(variable);

        return result;
    }

    static async getVariables<T>(deviceId: String, type?: DefaultVariables): Promise<Array<IVariable<T>>> {
        const variablesList: Array<IVariable<T>> = await Variables.find({ deviceId, type });

        const cuchi: IVariable<T> | null = await Variables.findOne({ deviceId });

        console.log('Vaqr: ', cuchi);
        return variablesList;
    }

    static async getVariable<T>(varId: String): Promise<IVariable<T> | null> {
        const cuchi: IVariable<T> | null = await Variables.findById(varId);

        return cuchi;
    }

}