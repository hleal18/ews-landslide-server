import mongoose, { Schema, SchemaTypes, SchemaType } from 'mongoose';
import IVariable, { IAccelerationVariable, IRainfallVariable } from '../model/IVariable';

// Mongoose discriminators are used to add "inheritance"
// behavior for models, that way different models under a
// parent model can be saved in the same collection,
// where some attributes may vary.
const VariableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deviceId: {
        type: Schema.Types.ObjectId,
        required: true,
        immutable: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    value: {
        type: mongoose.SchemaTypes.Mixed,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {
    discriminatorKey: 'variable'
});

interface VariableDocument extends IVariable<any>, mongoose.Document { }
const Variables = mongoose.model<VariableDocument>('Variables', VariableSchema);



const AccelerationVariableSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    }
}, {
    discriminatorKey: 'variable'
});

interface AccelerationVariableDocument extends IAccelerationVariable, mongoose.Document { }
export const AccelerationVariables = Variables.discriminator<AccelerationVariableDocument>('AccelerationVariables', AccelerationVariableSchema);

const RainfallVariableSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    }
}, {
    discriminatorKey: 'variable'
});

interface RainfallVariableDocument extends IRainfallVariable, mongoose.Document { }
export const RainfallVariables = Variables.discriminator<RainfallVariableDocument>('RainfallVariables', RainfallVariableSchema);

export default Variables;