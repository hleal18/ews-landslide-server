import mongoose, { Schema } from "mongoose";
import IDevice from "../domain/IDevice";
import VariableInfoSchema from "./VariableInfoSchema";

const DeviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    variables: { type: [{ type: VariableInfoSchema, required: true }], default: [] }
});

export interface DeviceDocument extends IDevice, mongoose.Document { }

export default mongoose.model<DeviceDocument>('Devices', DeviceSchema);