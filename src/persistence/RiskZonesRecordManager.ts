import { RiskZones } from "./RiskZone";
import IRiskZone from "../model/IRiskZone";

class RiskZonesRecordManager {
    static async addRiskZone(zone: IRiskZone): Promise<IRiskZone> {
        const result: IRiskZone = await RiskZones.create(zone);
        return result;
    }

    static async getRiskZone(id_zone: String): Promise<IRiskZone | null> {
        const result: IRiskZone | null = await RiskZones.findById(id_zone);
        return result;
    }

    static async editRiskZone(id_zone: String, zone: IRiskZone): Promise<IRiskZone | null> {
        const result: IRiskZone | null = await RiskZones.findByIdAndUpdate(id_zone, zone, { new: true });
        if (result) {
            console.log('Entry updated, new zone: ', result);
        }
        else {
            console.log('Entry not updated, parameter: ', zone);
        }

        return result;
    }
}

export default RiskZonesRecordManager;