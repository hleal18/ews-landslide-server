

import IVariable from "../domain/IVariable";
import IDevice from "../domain/IDevice";
import AlertManager from "../service/AlertsManager";
import VariablesManager from "../service/VariablesManager";
import DevicesManager from "../service/DevicesManager";
import ThresholdsManager from "../service/ThresholdsManager";
import CriticalSpotsManager from "../service/CriticalSpotsManager";
import RiskZonesManager from "../service/RiskZonesManager";

class VariablesAsyncController {
    static async addVariable<T>(topic: String, payload: ArrayBuffer): Promise<void> {
        try {
            if (payload.byteLength == 0) {
                console.log('No hay nada');
                return;
            }

            const payloadJson = String(payload);
            const variable: IVariable<Number> = (JSON.parse(payloadJson) as IVariable<Number>);

            variable.timestamp = new Date(Date.now());

            // Get user to assign the current reading.
            // Check deviceId exists for the appropriate user.
            // DeviceId is in fact name of device on mongodb devices model.

            const device: IDevice | null = await DevicesManager.getDevice(variable.deviceId);

            if (device === null)
                throw new Error(`Device with name ${variable.deviceId} not found`);
            else if (device.variables.find((value) =>
                value.idSensor === variable.idSensor && value.type === variable.type) === undefined)
                throw new Error(`Device with name ${device.name} does not contain variables with idsensor: ${variable.idSensor} and type: ${variable.type}`);

            await VariablesManager.addVariable(variable);

            const variableId = device.variables.find((value) => value.idSensor === variable.idSensor)?._id;

            console.log("Mongo ID associated with variable: ", variableId);

            if (variableId === null) throw new Error("Variable id not found when looking for threshold");

            console.log("Variable Id to evaluate threshold for: ", variableId);

            const associatedCriticalSpot = await CriticalSpotsManager.getCriticalSpot(device.criticalSpotId);

            if (associatedCriticalSpot === null) throw new Error(`No criticalspot found for received device`);

            const associatedRiskZone = await RiskZonesManager.getRiskZone(associatedCriticalSpot?.riskZoneId);

            if (associatedRiskZone === null) throw new Error(`No associated risk zone found for critical spot when looking for thresholds`);

            const associatedThreshold = await ThresholdsManager.getByVariableAndAdminIds(variableId, associatedRiskZone.adminId);
            
            if (associatedThreshold === null) throw new Error("Threshold for provided variable id was not found");

            const { lowerBound, upperBound } = associatedThreshold;
            
            if (lowerBound && variable.value < lowerBound) {
                await AlertManager.notifyAdmin(
                  associatedRiskZone.adminId,
                  variableId,
                  device._id,
                  associatedRiskZone._id,
                  "lowerBound",
                   lowerBound,
                   variable.value,
                   variable.timestamp
                );
            } else if (upperBound && variable.value > upperBound) {
                await AlertManager.notifyAdmin(
                    associatedRiskZone.adminId,
                    variableId,
                    device._id,
                    associatedRiskZone._id,
                    "upperBound",
                    upperBound,
                    variable.value,
                    variable.timestamp
                );
            }
            else {
                console.log(`Variable with id ${variableId} for deviceId ${device.name} is in an acceptable range`);
            }
        } catch (e) {
            console.log('There was an error: ', e.message);
        }
    }
}

export default VariablesAsyncController;