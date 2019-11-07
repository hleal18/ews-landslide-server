import mongoose from "mongoose";
import IRiskZone from "../model/IRiskZone";

const RiskZoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    adminId: {
        type: String,
        required: true
    },
    criticalSpotsId: [String],
    collaboratorsId: [String]
});

export interface RiskZoneDocument extends IRiskZone, mongoose.Document {}

export const RiskZones = mongoose.model<RiskZoneDocument>('RiskZones', RiskZoneSchema);