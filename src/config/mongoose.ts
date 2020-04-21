import mongoose from "mongoose";
import util from "util";
import Config from "./config";


let mongoUri = Config.mongo.uri;

mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
    if (err) console.log(`Error: ${err.message}`);
});

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

mongoose.connection.on('connected', () => { console.log(`Successfully connected to MongoDB.`); })