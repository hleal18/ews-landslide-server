import RiskZonesRecordManager from "../persistence/RiskZonesRecordManager";
import IRiskZone from "../domain/IRiskZone";

export default class RiskZonesManager {

    static async addRiskZone(zone: IRiskZone): Promise<IRiskZone> {
        const riskZone: IRiskZone = await RiskZonesRecordManager.addRiskZone(zone);
        return riskZone;
    }

    static async  getRiskZone(id_zone: string): Promise<IRiskZone | null> {
        const riskZone: IRiskZone | null = await RiskZonesRecordManager.getRiskZone(id_zone);
        return riskZone;
    }

    static async editRiskZone(id_zone: string, zone: IRiskZone): Promise<IRiskZone | null> {
        const riskZone: IRiskZone | null = await RiskZonesRecordManager.editRiskZone(id_zone, zone);
        return riskZone
    }
}
