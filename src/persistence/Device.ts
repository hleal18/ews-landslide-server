import mongoose, { mongo, Schema, model } from "mongoose";
import IDevice from "../model/IDevice";
import DefaultVariables from "../model/DefaultVariables";

const DeviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    criticalSpotId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'CriticalSpots'
    },
    variables: {
        type: [String],
        required: true,
    }
});

export interface DeviceDocument extends IDevice, mongoose.Document { }

export default mongoose.model<DeviceDocument>('Devices', DeviceSchema);