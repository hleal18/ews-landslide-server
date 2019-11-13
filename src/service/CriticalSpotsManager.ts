import CriticalSpotsRecordManager from '../persistence/CriticalSpotsRecordManager';
import RiskZonesManager from './RiskZonesManager';
import ICriticalSpot from '../model/ICriticalSpot';
import { CriticalSpotDocument } from '../persistence/CriticalSpot';

export default class CriticalSpotsManager {
    static async addCriticalSpot(criticalSpot: ICriticalSpot): Promise<ICriticalSpot> {

        // const newCriticalSpot = await CriticalSpotsRecordManager.addCriticalSpot(criticalSpot);
        // try {
        //     const updatedRiskZone = await RiskZonesManager.addCriticalSpotId(riskZoneId, ((newCriticalSpot as CriticalSpotDocument)._id));
        //     if (!updatedRiskZone) {
        //         // Delete newCriticalSpot
        //         await ((newCriticalSpot as CriticalSpotDocument).remove());
        //         throw new Error(`Critical Spot with not added, riskZoneId: ${riskZoneId}, not valid`);
        //     }
        // } catch (e) {
        //     await ((newCriticalSpot as CriticalSpotDocument).remove());
        // }

        const newCriticalSpot = await CriticalSpotsRecordManager.addCriticalSpot(criticalSpot);
        return newCriticalSpot;
    }

    static async getCriticalSpot(criticalSpotId: string): Promise<ICriticalSpot | null> {
        const criticalSpot: ICriticalSpot | null = await CriticalSpotsRecordManager.getCriticalSpot(criticalSpotId);
        return criticalSpot;
    }

    static async editCriticalSpot(criticalSpotId: string, criticalSpot: ICriticalSpot): Promise<ICriticalSpot | null> {
        const updatedCriticalSpot: ICriticalSpot | null = await CriticalSpotsRecordManager.editCriticalSpot(criticalSpotId, criticalSpot);
        return updatedCriticalSpot;
    }
}