import RiskZonesRecordManager from "../persistence/RiskZonesRecordManager";
import IRiskZone from "../model/IRiskZone";

export default class RiskZonesManager {
    // static async addRiskZone(admin: string, name: string, description: string, criticalSpotsId?: Array<string>, collaboratorsId? : Array<string>) : Promise<IRiskZone> {
    //     // AddRiskZone to a user
    //     const riskZone : IRiskZone = new RiskZone(name, description, admin, criticalSpotsId, collaboratorsId);
    //     const result : IRiskZone = await RiskZonesRecordManager.addRiskZone(riskZone);
    //     console.log('Element saved id: ', result);
    //     console.log('Element saved as Document : ', result as RiskZoneDocument);
    //     return result;
    // }

    // static async addRiskZone({adminId, name, description, criticalSpotsId = [], collaboratorsId = [] }: RiskZone) : Promise<IRiskZone> {
    //     // AddRiskZone to a user
    //     const riskZone : IRiskZone = new RiskZone(name, description, adminId, criticalSpotsId, collaboratorsId);
    //     const result : IRiskZone = await RiskZonesRecordManager.addRiskZone(riskZone);
    //     console.log('Element saved id: ', result);
    //     console.log('Element saved as Document : ', result as RiskZoneDocument);
    //     return result;
    // }

    static async addRiskZone(zone: IRiskZone) : Promise<IRiskZone> {
        const riskZone : IRiskZone = await RiskZonesRecordManager.addRiskZone(zone);
        console.log('Element saved id: ', riskZone);
        return riskZone;
    }

    static async  getRiskZone(id_zone: string) : Promise<IRiskZone | null> {
        // Search for risk zones in db
        const riskZone : IRiskZone | null = await RiskZonesRecordManager.getRiskZone(id_zone);
        return riskZone;
    }
}
