import IVariable from "../domain/IVariable";
import DefaultVariables from "../domain/DefaultVariables";

import IQuery from "../persistence/IQuery";
import VariablesRecordManager from "../persistence/VariablesRecordManager";
import DevicesManager from "./DevicesManager";
import CriticalSpotsManager from "./CriticalSpotsManager";

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

    static async getVariablesInExcelSheetFormat<T>(deviceId: String, idSensor: Number, {
        limit = 5000,
        offset = 0,
        start = new Date(0),
        end = new Date(Date.now())
    }: IQuery = {}): Promise<Object[]> {
        // console.log('devices');
        // console.log('Received things: ');
        console.log(limit, offset, start, end);

        const device = await DevicesManager.getDevice(deviceId);
        
        if (!device) throw new Error('Device does not exist');
        
        const criticalSpot = await CriticalSpotsManager.getCriticalSpot(device.criticalSpotId);

        if (!criticalSpot) throw new Error('CriticalSpot associated with device not found');

        const variablesInfo = [];

        for (const varInfo of device.variables) {
            variablesInfo.push({
              name: `${varInfo.name}`,
              variables: await VariablesRecordManager.getVariables(
                deviceId,
                varInfo.idSensor,
                undefined,
                { limit, offset, start, end },
                "asc"
              ),
            });
        };


        console.log("variablesNormal: ", variablesInfo);
        
        const variablesWithExcelFormat: Object[] = [];

        // variables.forEach((value) => variablesWithExcelFormat.push([value.timestamp, value.value]));

        for (const varResult of variablesInfo) {
            variablesWithExcelFormat.push({
                name: varResult.name,
                variables: [
                    ...varResult.variables.map((value) => [value.timestamp, value.value])
                ]
            });
        };

        console.log(variablesWithExcelFormat);

        return variablesWithExcelFormat;
    }
}