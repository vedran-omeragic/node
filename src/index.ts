import { config } from "dotenv";
config();
import express, { Router } from "express";
import morgan from "morgan";

import errorHandlerMiddleware from "./middleware/error-handler.middleware";
import userRouter from "./modules/user/router";

const port = 5000;
const app = express();

app.use(morgan("dev"));

app.listen(port, () => {
	console.log(`Running express on port ${port}`);
});

const routes = Router();
routes.use("/users", userRouter);

app.use(routes);

// Error handler middleware must at the bottom
app.use(errorHandlerMiddleware);

module.exports = app;
