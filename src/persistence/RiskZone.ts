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
        required: true,
        immutable: true
    }
});

// Should extend from RiskZone, because it implements the functions
// described by IRiskZone interface.
export interface RiskZoneDocument extends IRiskZone, mongoose.Document { }

export default mongoose.model<RiskZoneDocument>('RiskZones', RiskZoneSchema);