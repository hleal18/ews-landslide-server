import mongoose, { Schema } from "mongoose";
import IDevice from "../model/IDevice";

const DeviceSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
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
        type: [
            {
                idSensor: {
                    type: Number,
                    required: true
                },
                type: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true
    },
});

export interface DeviceDocument extends IDevice, mongoose.Document { }

export default mongoose.model<DeviceDocument>('Devices', DeviceSchema);