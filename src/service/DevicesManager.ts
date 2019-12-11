import IDevice from "../model/IDevice";
import DevicesRecordManager from "../persistence/DevicesRecordManager";
import IDeviceVariable from "../model/IDeviceVariable";

export default class DevicesManager {
    static async addDevice(device: IDevice): Promise<IDevice> {
        const result = await DevicesRecordManager.addDevice(device);
        return result;
    }

    static async getDevice(deviceId: String): Promise<IDevice | null> {
        const result = await DevicesRecordManager.getDevice(deviceId);
        return result;
    }

    static async addVariable(deviceId: String, newVariable: IDeviceVariable): Promise<IDevice | null> {
        if (newVariable.idSensor === undefined || newVariable.type === undefined)
            throw new Error(`Fields idSensor or Type not provided`);

        const device = await DevicesRecordManager.addVariable(deviceId, newVariable);
        return device;
    }
}