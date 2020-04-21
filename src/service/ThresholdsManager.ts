import ThresholdRecordManager from "../persistence/ThresholdsRecordManager";
import UserManager from "./UsersManager";
import DevicesManager from "./DevicesManager";
import IThreshold from "../domain/IThreshold";

export default class ThresholdsManager {
    static async add(threshold: IThreshold): Promise<IThreshold> {
        const user = await UserManager.getUserById(threshold.adminId);
        const repeatedThreshold = await this.get(threshold.variableId, threshold.adminId);
        const devices = await DevicesManager.getDevices(threshold.adminId);

        if (!user) throw new Error(`Invalid user with id: ${threshold.adminId}.`);
        else if (repeatedThreshold) throw new Error(`Variable with id: ${threshold.variableId} already has a threshold.`);
        else if (!devices) throw new Error(`User with id: ${threshold.adminId} does not have devices`);

        // variables.id is a method provided by default from mongoose array types.
        const variable = devices.find(device => !!device.variables.id(threshold.variableId));

        if (!variable) throw new Error(`No variable with id: ${threshold.variableId} exists.`);

        return await ThresholdRecordManager.add(threshold);
    }

    static async edit(threshold: IThreshold): Promise<IThreshold | null> {
        const oldThreshold = await ThresholdRecordManager.get(threshold._id, threshold.adminId);

        if (!oldThreshold) throw new Error(`Threshold with id ${threshold._id} and adminId ${threshold.adminId} could not be modified, does not exists`);

        return await ThresholdRecordManager.edit(threshold);
    }

    static async editWithUnset(threshold: IThreshold): Promise<IThreshold | null> {
        const oldThreshold = await ThresholdRecordManager.get(threshold._id, threshold.adminId);

        if (!oldThreshold) throw new Error(`Threshold with id ${threshold._id} and adminId ${threshold.adminId} could not be modified, does not exists`);

        return await ThresholdRecordManager.editWithUnset(threshold);
    }

    static async get(thresholdId: String, adminId: String): Promise<IThreshold | null> {
        return await ThresholdRecordManager.get(thresholdId, adminId);
    }

    static async getThresholds(adminId: String): Promise<IThreshold[] | null> {
        return await ThresholdRecordManager.getThresholds(adminId);
    }
}