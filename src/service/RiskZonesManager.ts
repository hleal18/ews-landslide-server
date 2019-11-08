import RiskZonesRecordManager from "../persistence/RiskZonesRecordManager";
import IRiskZone from "../model/IRiskZone";
import RiskZone from "../model/RiskZone";

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

    static async addRiskZone(zone: IRiskZone): Promise<IRiskZone> {
        const riskZone: IRiskZone = await RiskZonesRecordManager.addRiskZone(zone);
        return riskZone;
    }

    static async  getRiskZone(id_zone: string): Promise<IRiskZone | null> {
        // Search for risk zones in db
        console.log('Get riskzones manager invoked');
        const riskZone: IRiskZone | null = await RiskZonesRecordManager.getRiskZone(id_zone);
        console.log('RiskZone object: ', riskZone);
        return riskZone;
    }

    static async editRiskZone(id_zone: string, zone: IRiskZone): Promise<IRiskZone | null> {
        const riskZone: IRiskZone | null = await RiskZonesRecordManager.editRiskZone(id_zone, zone);
        return riskZone
    }

    static async addCollaboratorId(id_zone: string, collaboratorId: string): Promise<IRiskZone | null> {
        const riskZone: IRiskZone | null = await RiskZonesRecordManager.getRiskZone(id_zone);
        if (riskZone && (riskZone as RiskZone).addCollaborator(collaboratorId)) {
            const newRiskZone: IRiskZone | null = await RiskZonesRecordManager.editRiskZone(id_zone, riskZone);
            return newRiskZone;
        }
        else return null;
    }
}
