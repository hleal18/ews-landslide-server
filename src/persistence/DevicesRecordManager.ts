import Devices, { DeviceDocument } from "./Device";
import IDevice from "../model/IDevice";
import DefaultVariables from "../model/DefaultVariables";

export default class DevicesRecordManager {
    static async addDevice(device: IDevice): Promise<IDevice> {
        const result: IDevice = await Devices.create(device);
        return result;
    }

    static async getDevice(id: String): Promise<IDevice | null> {
        const result: IDevice | null = await Devices.findById(id);
        return result;
    }

    static async addVariable(id: String, newVariable: DefaultVariables): Promise<IDevice | null> {
        const deviceRecord: IDevice | null = await Devices.findById(id);

        if (deviceRecord && !deviceRecord.variables.includes(newVariable)) {
            deviceRecord.variables.push(newVariable);
        }

        return deviceRecord;
    }
}