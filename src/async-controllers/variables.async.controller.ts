import IVariable from "../domain/IVariable";
import IDevice from "../domain/IDevice";
import VariablesManager from "../service/VariablesManager";
import DevicesManager from "../service/DevicesManager";

class VariablesAsyncController {
    static async addVariable<T>(topic: String, payload: ArrayBuffer): Promise<void> {
        try {
            if (payload.byteLength == 0) {
                console.log('No hay nada');
                return;
            }

            const payloadJson = String(payload);
            const variable: IVariable<T> = (JSON.parse(payloadJson) as IVariable<T>);

            variable.timestamp = new Date(Date.now());

            // Get user to assign the current reading.
            // Check deviceId exists for the appropriate user.
            // DeviceId is in fact name of device on mongodb devices model.

            const device: IDevice | null = await DevicesManager.getDevice(variable.deviceId);

            if (device === null)
                throw new Error(`Device with name ${variable.deviceId} not found`);
            else if (device.variables.find((value) =>
                value.idSensor === variable.idSensor && value.type === variable.type) === undefined)
                throw new Error(`Device with name ${device.name} does not contain variables with idsensor: ${variable.idSensor} and type: ${variable.type}`);

            await VariablesManager.addVariable(variable);
        } catch (e) {
            console.log('There was an error: ', e.message);
        }
    }
}

export default VariablesAsyncController;