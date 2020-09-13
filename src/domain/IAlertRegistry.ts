export type AlertTriggerers = "upperBound" | "lowerBound";

export default interface AlertRegistry {
  adminId: string;
  variableId: string;
  deviceId: string;
  value: Number;
  alertTriggerer: AlertTriggerers;
  alertTriggererValue: Number;
  timestamp: Date;
  notified: string;
}