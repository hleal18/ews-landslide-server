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

    // In order to get all the devices, it is required to know all criticalSpotsIds.
    // Useful to be able to know which devices belong to a specific user,
    // based on the criticalSpots linked with it.
    static async getDevices(criticalSpotsIds: Array<Object>): Promise<Array<IDevice> | null> {
        const result: Array<IDevice> | null = await Devices.find({ $or: criticalSpotsIds });
        return result;
    }

    static async addVariable(id: String, newVariable: IDeviceVariable): Promise<IDevice | null> {
        const deviceRecord: DeviceDocument | null = await Devices.findById(id);

        if (!deviceRecord) throw new Error(`Device with id: ${id} not found`);

        if (deviceRecord.variables.find((value) => value.idSensor === newVariable.idSensor) !== undefined)
            throw new Error(`idSensor of ${newVariable.idSensor} already in device`);

        deviceRecord.variables.push(newVariable);
        await deviceRecord.save();

        // Other way to do it, run validators on update, because normally validators are not
        // triggered during an update.
        //await Devices.findByIdAndUpdate(id, deviceRecord, { runValidators: true });

        return deviceRecord;
    }
}