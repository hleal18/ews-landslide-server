import mongoose from 'mongoose';
import IVariable from '../model/IVariable';

const VariableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nodeId: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true
    },
    value: {
        type: Any,
        required: true
    }
});

interface VariableDocument<T> extends IVariable<T>, mongoose.Document { }

export default mongoose.model<VariableDocument<T>>('Variables', VariableSchema);