import ICriticalSpot from './ICriticalSpot';

export default class CriticalSpot implements ICriticalSpot {
    private name: string;
    private description: string;
    private riskZoneId: string;
    private latitude: number;
    private longitude: number;
    private sensorNodes: Array<string>;

    constructor(name: string, description: string, riskZoneId: string, latitude: number, longitude: number, sensorNodes: Array<string> = []) {
        this.name = name;
        this.description = description;
        this.riskZoneId = riskZoneId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.sensorNodes = sensorNodes;
    }

    addSensorNode(sensor_id: string): boolean {
        if (this.sensorNodes.includes(sensor_id)) return false;
        this.sensorNodes.push(sensor_id);
        return true;
    }

    deleteSensorNode(sensor_id: string): boolean {
        const sensorIdIndex = this.sensorNodes.findIndex((id) => id === sensor_id);
        if (sensorIdIndex === -1) return false;
        this.sensorNodes.splice(sensorIdIndex, 1);
        return true;
    }
}