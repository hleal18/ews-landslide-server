import moment from 'moment';

import mailer from "../config/mailgun";

import IAlertRegistry, { AlertTriggerers } from "../domain/IAlertRegistry";
import AlertsRegistryRecordManager from "./AlertsRegistryManager";
import RiskZonesManager from "./RiskZonesManager";
import DevicesManager from "./DevicesManager";
import UsersManager from "./UsersManager";
import { defaultVariablesTranslated } from "../domain/DefaultVariables";

export default class AlertsManager {
  static async notifyAdmin(
    adminId: string,
    variableId: string,
    deviceId: string,
    riskZoneId: string,
    alertTriggerer: AlertTriggerers,
    alertTriggererValue: Number,
    value: Number,
    timestamp: Date
  ) {
    const mostRecentAlertSent = await AlertsRegistryRecordManager.getMoreRecentAlertRegistryByVariableAdminIdAndAlertTriggerer(
      variableId,
      adminId,
      alertTriggerer
    );

    console.log('Alerttriggerer: ', alertTriggerer);

    let cooldownPassed = false;

    if (!mostRecentAlertSent) cooldownPassed = true;
    else {
      const mostRecentAlertDate = moment(mostRecentAlertSent.timestamp);
      const currentDate = moment(new Date());
      const difference = currentDate.diff(mostRecentAlertDate, "minutes");

      if (Math.abs(difference) > 30 && mostRecentAlertSent.alertTriggerer !== alertTriggerer) cooldownPassed = true;
    }

    if (!cooldownPassed)
      throw new Error(
        `Cooldown hasn't passed yet, timestamp for last message: ${mostRecentAlertSent?.timestamp.toLocaleTimeString()}`
      );

    const user = await UsersManager.getUserById(adminId);

    if (user === null) return;

    const alertRegistry: IAlertRegistry = {
      adminId,
      variableId,
      deviceId,
      alertTriggerer,
      alertTriggererValue,
      notified: user.email as string,
      timestamp: new Date(Date.now()),
      value,
    };

    const device = await DevicesManager.getDeviceById(deviceId);

    if (!device)
      throw new Error("Device not found while creating alert registry");

    const variable = device.variables.find((value) => String(value._id) === String(variableId));
    if (!variable)
      throw new Error("Variable not found while creating alert registry");

    const riskZone = await RiskZonesManager.getRiskZone(riskZoneId);

    if (!riskZone)
      throw new Error("Riskzone not found while creating alert registry");

    await this.sendAlert(
      user.email as string,
      riskZone.name,
      device.name,
      variable.name as string,
      value,
      variable.type,
      alertTriggerer,
      alertTriggererValue,
      timestamp
    );
    await AlertsRegistryRecordManager.addAlertRegistry(alertRegistry);
  }

  private static async sendAlert(
    email: string,
    riskZoneName: string,
    deviceName: string,
    variableName: string,
    variableValue: Number,
    variableType: string,
    alertTriggerer: AlertTriggerers,
    alertTriggererValue: Number,
    timestamp: Date
  ) {
    let subject = "";

    if (alertTriggerer === "upperBound") {
      subject = `${defaultVariablesTranslated[variableType]} por encima de umbral ${alertTriggererValue}`;
    } else if (alertTriggerer === "lowerBound") {
      subject = `${variableType} por debajo de umbral ${alertTriggererValue}`;
    }

    let body = `Se registro un valor de <b>${variableValue}</b> para variable de tipo <b>${defaultVariablesTranslated[variableType]}</b> a las ${timestamp.toLocaleTimeString()} <br/>`;
    body += `Alerta emitida para variable <b>${variableName}</b> en nodo sensor <b>${deviceName}</b>, instalado en zona de riesgo <b>${riskZoneName}</b>`;

    const message: IMessageBody = {
      to: email,
      subject,
      body,
    };

    console.log("Sending message");

    console.log("Message body: ", body);

    try {
      await mailer.send(message.to, message.subject, message.body);
      console.log("Message sent successfully");
    } catch (e) {
      console.log("Problem when sending message: ", e.message);
    }
  }
}

interface IMessageBody {
  to: string;
  subject: string;
  body: string;
}
