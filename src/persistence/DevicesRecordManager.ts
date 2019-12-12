import Devices, { DeviceDocument } from "./Device";
import IDevice from "../domain/IDevice";
import DefaultVariables from "../domain/DefaultVariables";
import IDeviceVariable from "../domain/IDeviceVariable";

export default class DevicesRecordManager {
    static async addDevice(device: IDevice): Promise<IDevice> {
        const result: IDevice = await Devices.create(device);
        return result;
    }

    static async getDevice(id: String): Promise<IDevice | null> {
        const result: IDevice | null = await Devices.findById(id);
        return result;
    }

    static async getDevices(): Promise<Array<IDevice> | null> {
        const result: Array<IDevice> | null = await Devices.find();
        return result;
    }

    static async addVariable(id: String, newVariable: IDeviceVariable): Promise<IDevice | null> {
        const deviceRecord: IDevice | null = await Devices.findById(id);

        if (!deviceRecord) throw new Error(`Device with id: ${id} not found`);

        if (deviceRecord.variables.find((value) => value.idSensor === newVariable.idSensor) === undefined) {
            deviceRecord.variables.push(newVariable);
        }
        else throw new Error(`idSensor of ${newVariable.idSensor} already in device`);

        await Devices.findByIdAndUpdate(id, deviceRecord);

        return deviceRecord;
    }
}