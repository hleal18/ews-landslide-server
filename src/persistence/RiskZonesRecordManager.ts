import RiskZones from "./RiskZone";
import IRiskZone from "../domain/IRiskZone";

export default class RiskZonesRecordManager {
    static async addRiskZone(zone: IRiskZone): Promise<IRiskZone> {
        const result: IRiskZone = await RiskZones.create(zone);
        return result;
    }

    static async getRiskZone(zoneId: String): Promise<IRiskZone | null> {
        const result: IRiskZone | null = await RiskZones.findById(zoneId);
        return result;
    }

    static async getRiskZones(adminId: String): Promise<Array<IRiskZone> | null> {
        const result: Array<IRiskZone> | null = await RiskZones.find({ adminId });
        //console.log('Result: ', result);
        return result;
    }

    static async editRiskZone(zoneId: String, zone: IRiskZone): Promise<IRiskZone | null> {
        const result: IRiskZone | null = await RiskZones.findByIdAndUpdate(zoneId, zone, { new: true });
        return result;
    }
}