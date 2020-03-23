import mongoose from 'mongoose';
import ICriticalSpot from '../domain/ICriticalSpot';

const CriticalSpotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    riskZoneId: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true,
        ref: 'RiskZones'
    },
    latitude: {
        type: Number,
        default: 0
    },
    longitude: {
        type: Number,
        default: 0
    }
});

export interface CriticalSpotDocument extends ICriticalSpot, mongoose.Document { }

export default mongoose.model<CriticalSpotDocument>('CriticalSpots', CriticalSpotSchema);