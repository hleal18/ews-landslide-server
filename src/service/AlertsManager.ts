import moment from 'moment';

import mailer from "../config/mailgun";

import IAlertRegistry, { AlertTriggerers } from "../domain/IAlertRegistry";
import AlertsRegistryRecordManager from "./AlertsRegistryManager";
import RiskZonesManager from "./RiskZonesManager";
import DevicesManager from "./DevicesManager";
import UsersManager from "./UsersManager";
import DefaultVariables, { defaultVariablesTranslated } from "../domain/DefaultVariables";

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

      if (Math.abs(difference) > 30 && mostRecentAlertSent.alertTriggerer === alertTriggerer) cooldownPassed = true;
    }

    if (!cooldownPassed)
      throw new Error(
        `Cooldown hasn't passed yet, timestamp for last message: ${mostRecentAlertSent?.timestamp.toLocaleTimeString()}`
      );

    const user = await UsersManager.getUserById(adminId);

    if (user === null) return;

    const emailsToNotify: string[] = [...(user.emailsToNotify ?? []) as string[]];

    if (!emailsToNotify.includes(user.email as string)) emailsToNotify.push(user.email as string);
    console.log('Emails to notify after validation: ');

    console.log('Emails to notify: ', emailsToNotify);
    const alertRegistry: IAlertRegistry = {
      adminId,
      variableId,
      deviceId,
      alertTriggerer,
      alertTriggererValue,
      notified: emailsToNotify,
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
      emailsToNotify,
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
    emails: string[],
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
      subject = `${defaultVariablesTranslated[variableType as DefaultVariables]} por encima de umbral ${alertTriggererValue}`;
    } else if (alertTriggerer === "lowerBound") {
      subject = `${defaultVariablesTranslated[variableType as DefaultVariables]} por debajo de umbral ${alertTriggererValue}`;
    }

    let body = `Se registro un valor de <b>${variableValue}</b> para variable de tipo <b>${defaultVariablesTranslated[variableType]}</b> a las ${timestamp.toLocaleTimeString('co-CO')} <br/>`;
    body += `Alerta emitida para variable <b>${variableName}</b> en nodo sensor <b>${deviceName}</b>, instalado en zona de riesgo <b>${riskZoneName}</b>`;

    const message: IMessageBody = {
      to: emails,
      subject,
      body,
    };

    console.log("Sending message");

    try {
      await mailer.send(message.to, message.subject, message.body);
      console.log("Message sent successfully");
    } catch (e) {
      console.log("Problem when sending message: ", e.message);
    }
  }
}

interface IMessageBody {
  to: string[];
  subject: string;
  body: string;
}
