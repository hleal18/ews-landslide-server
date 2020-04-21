import DefaultVariables from "./DefaultVariables";

export default interface IDeviceVariable {
    name: String;
    description: String;
    type: DefaultVariables;
    idSensor: Number;
}