import IDevice from "../model/IDevice";
import DefaultVariables from "../model/DefaultVariables";
import DevicesRecordManager from "../persistence/DevicesRecordManager";

export default class DevicesManager {
    static async addDevice(device: IDevice): Promise<IDevice> {
        const result = await DevicesRecordManager.addDevice(device);
        return result;
    }

    static async getDevice(deviceId: String): Promise<IDevice | null> {
        const result = await DevicesRecordManager.getDevice(deviceId);
        return result;
    }

    static async addVariable(deviceId: String, newVariable: DefaultVariables): Promise<IDevice | null> {
        const device = await DevicesRecordManager.addVariable(deviceId, newVariable);
        return device;
    }
}