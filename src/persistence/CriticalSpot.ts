import mongoose from 'mongoose';
import ICriticalSpot from '../model/ICriticalSpot';

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
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

export interface CriticalSpotDocument extends ICriticalSpot, mongoose.Document { }

export default mongoose.model<CriticalSpotDocument>('CriticalSpots', CriticalSpotSchema);