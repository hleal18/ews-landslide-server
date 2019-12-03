import DefaultVariables from "./DefaultVariables";

interface IDevice {
    id: string;
    name: string;
    description: string;
    criticalSpotId: string;
    variables: Array<DefaultVariables>;
}

export default IDevice;