import mongoose, { Schema } from "mongoose";
import DefaultVariables from "../domain/DefaultVariables";

interface IVariableInfo {
    name: String;
    description: String;
    idSensor: number;
    type: DefaultVariables;
}

export default new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    idSensor: {
        type: Number,
        required: true
    },
    // The type of environmental variable measured.
    type: {
        type: String,
        required: true
    }
});