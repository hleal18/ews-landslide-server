import IDeviceVariable from "./IDeviceVariable";


interface IDevice {
    name: string;
    description: string;
    criticalSpotId: string;
    variables: Array<IDeviceVariable>;
}

export default IDevice;