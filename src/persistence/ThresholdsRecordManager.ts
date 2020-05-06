import Threshold from "./Threshold";
import IThreshold from "../domain/IThreshold";

export default class ThresholdsRecordManager {
    static async add(threshold: IThreshold): Promise<IThreshold> {
        const result = await Threshold.create(threshold);
        return result;
    }

    static async edit(threshold: IThreshold): Promise<IThreshold | null> {

        return await Threshold.findOneAndUpdate({
            _id: threshold._id,
            adminId: threshold.adminId,
        }, threshold, { new: true });
    }

    static async editWithUnset(threshold: IThreshold): Promise<IThreshold | null> {
        const updateQuery = { $unset: { upperBound: "", lowerBound: "" } }

        if (threshold.upperBound) delete updateQuery.$unset.upperBound;
        if (threshold.lowerBound) delete updateQuery.$unset.lowerBound;


        return await Threshold.findByIdAndUpdate({
            _id: threshold._id,
            adminId: threshold.adminId
        }, { ...updateQuery, ...threshold }, { new: true });
    }

    static async get(thresholdId: String, adminId: String): Promise<IThreshold | null> {
        return await Threshold.findOne({ _id: thresholdId, adminId });
    }

    static async getThresholds(adminId: String): Promise<IThreshold[] | null> {
        return await Threshold.find({ adminId });
    }

    static async getByVariableAndAdminIds(variableId: String, adminId: String): Promise<IThreshold | null> {
        return await Threshold.findOne({ variableId, adminId });
    }
}