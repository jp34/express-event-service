import Env from "./config/env";
import logger from "./config/logger";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import api from "./app/controller";
import { handle } from "./app/middleware";

import { connect } from "./config/db";
connect();

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use(api);
app.use(handle);

app.listen(parseInt(Env.PORT), Env.HOST, () => {
    logger.info(`Server listening on port ${Env.PORT}`);
});

console.log("here");

export default app;
