import { RiskZones } from "./RiskZone";
import IRiskZone from "../model/IRiskZone";

class RiskZonesRecordManager {
    static async addRiskZone(zone: IRiskZone) : Promise<IRiskZone> {
        const result : IRiskZone = await RiskZones.create(zone);
        return result;
    }

    static async getRiskZone(id_zone: String) : Promise<IRiskZone | null> {
        const result : IRiskZone | null = await RiskZones.findById({_id: id_zone});
        return result;
    }
}

export default RiskZonesRecordManager;