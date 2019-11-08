import mongoose from "mongoose";
import RiskZone from "../model/RiskZone";

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

// Should extend from RiskZone, because it implements the functions
// described by IRiskZone interface.
export interface RiskZoneDocument extends RiskZone, mongoose.Document { }

export const RiskZones = mongoose.model<RiskZoneDocument>('RiskZones', RiskZoneSchema);