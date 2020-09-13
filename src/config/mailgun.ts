import { NodeMailgun } from "ts-mailgun";
import config from "./config";

// const sendSampleMessage = async () => {
//   const mailer = new NodeMailgun();
//   console.log("Apikey :", config.mailgun.apiKey);
//   mailer.apiKey = "194936308023379ab52648776da4e41b-ee13fadb-250f3bae";
//   mailer.domain = "email.hleal.email";
//   mailer.fromEmail = "alertas-sat@email.hleal.email";
//   mailer.fromTitle = "SAT Alertas";
//   mailer.unsubscribeLink = false;

// 	mailer.init();
  
//   try {
//     await mailer.send("humberto.adolfo@hotmail.com", "Hello", "Testing some mailgun awesomness!");
//   } catch(e) {
//     console.log("Problem when sending email :", e.message);
//   }
// }

const mailer = new NodeMailgun(config.mailgun.apiKey, config.mailgun.domain);

mailer.fromEmail = "alertas-sat@email.hleal.email";
mailer.fromTitle = "SAT Alertas";
mailer.unsubscribeLink = false;

mailer.init();

// const sendSampleMessage = async ( )  => {
// 	console.log('Sending message');
//   try {
//     await mailer.send("humberto.adolfo@hotmail.com", "Hello", "Testing some mailgun awesomness!");
//   } catch(e) {
//     console.log("Problem when sending email :", e.message);
//   }
// }

// sendSampleMessage();
export default mailer;