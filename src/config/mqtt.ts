import mqtt from "mqtt";

const topics = "hola";

const mqttClient = mqtt.connect('ws://test.mosquitto.org', { port: 8080 });

console.log('Connecting...............');

mqttClient.on('connect', () => {
    console.log('Successfully connected: ');
});

mqttClient.subscribe(topics, (err, granted) => {
    if (err) console.log(`Not subscribed to: `, err);

    console.log('Subscribed to: ', granted);
});

mqttClient.on('message', (topic, payload) => {
    console.log('Message received for topic: ', topic);
    console.log('Payload: ', payload);
});


export default mqttClient;
