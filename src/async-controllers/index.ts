import mqttClient from "../config/mqtt";
import VariablesAsyncController from "./variables.async.controller";

mqttClient.on('message', async<T>(topic: String, payload: ArrayBuffer) => {
    console.log('Message received for topic: ', topic);

    await VariablesAsyncController.addVariable(topic, payload);
});