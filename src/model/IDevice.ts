import DefaultVariables from "./DefaultVariables";

interface IDevice {
    name: string;
    description: string;
    criticalSpotId: string;
    variables: Array<DefaultVariables>;
}

export default IDevice;