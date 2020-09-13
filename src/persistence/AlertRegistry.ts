import mongoose from 'mongoose';
import IAlert from '../domain/IAlertRegistry';

const AlertSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true
  },
  variableId: {
    type: String,
    required: true
  },
  deviceId: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  alertTriggerer: {
    type: String,
    required: true
  },
  alertTriggererValue: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  notified: {
    type: String,
    required: true
  }
});

export interface AlertDocument extends IAlert, mongoose.Document { }
export default mongoose.model<AlertDocument>('Alerts', AlertSchema);