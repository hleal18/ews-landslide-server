import CriticalSpotsRecordManager from '../persistence/CriticalSpotsRecordManager';
import ICriticalSpot from '../model/ICriticalSpot';

export default class CriticalSpotsManager {
    static async addCriticalSpot(criticalSpot: ICriticalSpot): Promise<ICriticalSpot> {
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