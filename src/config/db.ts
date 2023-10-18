import Env from "./env";
import mongoose from "mongoose";
import logger from "./logger";

export const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(Env.DB_STRING).then(() => {
        logger.info('Successfully connected to database', {
            uri: Env.DB_STRING,
            timestamp: Date.now()
        });
    }).catch((err) => {
        logger.warn(err.message);
        throw new Error('Failed to connect to database');
    });
}
