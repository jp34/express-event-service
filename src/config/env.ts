import dotenv from "dotenv";
dotenv.config();
import logger from "./logger";
import { ConfigurationError } from "../domain/error";

// Configures debug mode: Boolean
const DEBUG = process.env.SERVICE_DEBUG ?? "undefined";
if (DEBUG === "undefined") throw new ConfigurationError("Missing environment variable: SERVICE_DEBUG");
logger.debug(`DEBUG: ${DEBUG}`);

// Configures server host
const HOST = process.env.SERVICE_HOST ?? "undefined";
if (HOST === "undefined") throw new ConfigurationError("Missing environment variable: SERVICE_HOST");
logger.debug(`HOST: ${HOST}`);

// Configures server port
const PORT = process.env.SERVICE_PORT ?? "undefined";
if (PORT === "undefined") throw new ConfigurationError("Missing environment variable: SERVICE_PORT");
logger.debug(`PORT: ${PORT}`);

// Configures mongo db location
const DB_STRING = process.env.SERVICE_DB_STRING ?? "undefined";
if (DB_STRING === "undefined") throw new ConfigurationError("Missing environment variable: SERVICE_DB_SEED");
logger.debug(`DB_STRING: ${DB_STRING}`);

const Env = {
    DEBUG: DEBUG,
    HOST: HOST,
    PORT: PORT,
    DB_STRING: DB_STRING,
};

export default Env;