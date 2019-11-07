import dotenv from "dotenv";

dotenv.config();

interface Config {
    mongo: {
        uri: string
    }
}

export const config : Config = { 
    mongo: { 
        uri: ((process.env["MONGO_URI"]) ? process.env["MONGO_URI"] : "")
    }
};