import IDevice from "../domain/IDevice";
import DevicesRecordManager from "../persistence/DevicesRecordManager";
import IDeviceVariable from "../domain/IDeviceVariable";

import CriticalSpotsManager from "./CriticalSpotsManager";

export default class DevicesManager {
    static async addDevice(device: IDevice): Promise<IDevice> {
        const result = await DevicesRecordManager.addDevice(device);
        return result;
    }

    static async getDevice(deviceName: String): Promise<IDevice | null> {
        const result = await DevicesRecordManager.getDevice(deviceName);
        return result;
    }

    static async getDevices(adminId: String): Promise<Array<IDevice> | null> {
        let result = null;
        // 1. Find all the riskZones linked with provided adminId.
        // 2. Find all the criticalSpots linked with riskZones found.
        // 3. Extract all ids of criticalSpots registered with current adminId.
        // The first two con be found using CriticalSpotsManager.
        // The last one is the result of mapping the obtained array
        // as required.
        const criticalSpots = await CriticalSpotsManager.getCriticalSpots(adminId as string);

        if (!criticalSpots || criticalSpots.length === 0)
            throw new Error(`No critical spots found for user ${adminId}`);

        const criticalSpotsIds = criticalSpots.map((criticalSpot) => ({ criticalSpotId: criticalSpot._id }));
        result = await DevicesRecordManager.getDevices(criticalSpotsIds);

        return result;
    }

    static async addVariable(deviceId: String, newVariable: IDeviceVariable): Promise<IDevice | null> {
        const device = await DevicesRecordManager.addVariable(deviceId, newVariable);
        return device;
    }


}