import dotenv from "dotenv";

dotenv.config();

interface Config {
    mongo: {
        uri: string
    },
    auth: {
        bcryptRounds: number,
        jwt_secret: string,
        jwt_algorithm: string,
        jwt_expiration: number
    }
}

const config: Config = {
    mongo: {
        uri: process.env["MONGO_URI"] || ""
    },
    auth: {
        bcryptRounds: Number(process.env["BCRYPT_ROUNDS"]),
        jwt_algorithm: process.env["JWT_ALGORITHM"] || "HS256",
        jwt_secret: process.env["JWT_SECRET"] || "",
        jwt_expiration: Number(process.env["JWT_EXPIRATION"])
    }
};

export default config;