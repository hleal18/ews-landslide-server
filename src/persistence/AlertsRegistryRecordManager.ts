import AlertsRegistry from './AlertRegistry';
import IAlertRegistry, { AlertTriggerers } from '../domain/IAlertRegistry';

export default class AlertsregistryRecordManager {
  static async addAlertRegistry(alert : IAlertRegistry) {
    return await AlertsRegistry.create(alert);
  }

  static async editAlertRegistry(alertId: string, alert: IAlertRegistry) {
    return await AlertsRegistry.findByIdAndUpdate(alertId, alert, { new: true });
  }
 
  // TODO: ensure most recent results first based on timestamp
  static async getAlertsByAdminId(adminId: string) {
    return await AlertsRegistry.find({ adminId }).sort({ create_at: -1 });
  }

  static async getAlertsByVariableAndAdminId(variableId: string, adminId: string) {
    return await AlertsRegistry.find({ adminId, variableId }).sort({ created_at: -1 });
  }

  static async getMoreRecentAlertRegistryByVariableAdminIdAndAlertTriggerer(variableId: string, adminId: string, alertTriggerer: AlertTriggerers) {
    return await AlertsRegistry.findOne({ adminId, variableId, alertTriggerer }).sort({ created_at: -1 });
  }

  static async getMoreRecentAlertRegistryByVariableAndAdminIds(variableId: string, adminId: string) {
    return await AlertsRegistry.findOne({ variableId, adminId }).sort({ created_at: -1 }); 
  }
}