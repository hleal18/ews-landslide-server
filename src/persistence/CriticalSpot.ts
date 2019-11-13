import mongoose from 'mongoose';
import CriticalSpot from '../model/CriticalSpot';

const CriticalSpotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    riskZoneId: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    sensorNodes: {
        type: [String]
    }
});

CriticalSpotSchema.method('addSensorNode', CriticalSpot.prototype.addSensorNode);
CriticalSpotSchema.method('deleteSensorNode', CriticalSpot.prototype.deleteSensorNode);

export interface CriticalSpotDocument extends CriticalSpot, mongoose.Document { }

export default mongoose.model<CriticalSpotDocument>('CriticalSpots', CriticalSpotSchema);