import mqttClient from "../config/mqtt";
import VariablesAsyncController from "./variables.async.controller";

mqttClient.on('message', async<T>(topic: String, payload: ArrayBuffer) => {
    console.log('Message received for topic: ', topic);

    try {
        await VariablesAsyncController.addVariable(topic, payload);
    } catch (e) {
        console.log("Error while processing a new variable entry: ", e.message);
    }
});