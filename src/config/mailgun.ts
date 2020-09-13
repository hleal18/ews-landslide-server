import { NodeMailgun } from "ts-mailgun";
import config from "./config";

const mailer = new NodeMailgun(config.mailgun.apiKey, config.mailgun.domain);

mailer.fromEmail = "alertas-sat@email.hleal.email";
mailer.fromTitle = "SAT Alertas";
mailer.unsubscribeLink = false;

mailer.init();

export default mailer;