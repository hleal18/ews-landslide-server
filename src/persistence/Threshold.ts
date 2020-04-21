import mongoose from 'mongoose';
import IThreshold from '../domain/IThreshold';

const ThresholdSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
        immutable: true
    },
    variableId: {
        type: String,
        required: true,
        immutable: true
    },
    lowerBound: Number,
    upperBound: Number
});

export interface ThresholdDocument extends mongoose.Document, IThreshold { }

export default mongoose.model<ThresholdDocument>('Thresholds', ThresholdSchema);