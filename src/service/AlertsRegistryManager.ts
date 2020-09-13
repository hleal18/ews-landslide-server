import AlertsRegistryRecordManager from '../persistence/AlertsRegistryRecordManager';
import IAlertRegistry, { AlertTriggerers } from '../domain/IAlertRegistry';

export default class AlertsRegistryManager {

  static async addAlertRegistry(alert : IAlertRegistry) {
    return await AlertsRegistryRecordManager.addAlertRegistry(alert);
  }

  static async editAlertRegistry(alertId: string, alert: IAlertRegistry) {
    return await AlertsRegistryRecordManager.editAlertRegistry(alertId, alert);
  }
 
  // TODO: ensure most recent results first based on timestamp
  static async getAlertsByAdminId(adminId: string) {
    return await AlertsRegistryRecordManager.getAlertsByAdminId(adminId);
  }

  static async getAlertsByVariableAndAdminId(variableId: string, adminId: string) {
    return await AlertsRegistryRecordManager.getAlertsByVariableAndAdminId(variableId, adminId);
  }

  static async getMoreRecentAlertRegistryByVariableAdminIdAndAlertTriggerer(variableId: string, adminId: string, alertTriggerer: AlertTriggerers) {
    return await AlertsRegistryRecordManager.getMoreRecentAlertRegistryByVariableAdminIdAndAlertTriggerer(variableId, adminId, alertTriggerer);
  }

  static async getMoreRecentAlertRegistryByVariableAndAdminIds(variableId: string, adminId: string) {
    return await AlertsRegistryRecordManager.getMoreRecentAlertRegistryByVariableAndAdminIds(variableId, adminId); 
  }
}