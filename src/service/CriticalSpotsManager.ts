import CriticalSpotsRecordManager from '../persistence/CriticalSpotsRecordManager';
import RiskZonesManager from '../service/RiskZonesManager';
import ICriticalSpot from '../domain/ICriticalSpot';
import IRiskZone from '../domain/IRiskZone';

export default class CriticalSpotsManager {
    static async addCriticalSpot(criticalSpot: ICriticalSpot): Promise<ICriticalSpot> {
        const newCriticalSpot = await CriticalSpotsRecordManager.addCriticalSpot(criticalSpot);
        return newCriticalSpot;
    }

    static async getCriticalSpot(criticalSpotId: string): Promise<ICriticalSpot | null> {
        const criticalSpot: ICriticalSpot | null = await CriticalSpotsRecordManager.getCriticalSpot(criticalSpotId);
        return criticalSpot;
    }

    static async getCriticalSpots(adminId: string): Promise<Array<ICriticalSpot> | null> {
        const riskZones: Array<IRiskZone> | null = await RiskZonesManager.getRiskZones(adminId);

        if (!riskZones || riskZones.length === 0) throw new Error(`No risk zones found for the admin id: ${adminId}`);

        const riskZonesIds: Array<Object> = riskZones.map((riskZone) => ({ riskZoneId: riskZone._id }));
        //console.log(`RiskZonesId: `, riskZonesIds);
        const criticalSpots: Array<ICriticalSpot> | null = await CriticalSpotsRecordManager.getCriticalSpots(riskZonesIds);

        return criticalSpots;
    }

    static async editCriticalSpot(criticalSpotId: string, criticalSpot: ICriticalSpot): Promise<ICriticalSpot | null> {
        const updatedCriticalSpot: ICriticalSpot | null = await CriticalSpotsRecordManager.editCriticalSpot(criticalSpotId, criticalSpot);
        return updatedCriticalSpot;
    }
}