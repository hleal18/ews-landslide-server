export default interface ICriticalSpot {
    addSensorNode(sensor_id: string): boolean;
    deleteSensorNode(sensor_id: string): boolean;
}