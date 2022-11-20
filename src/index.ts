import cors from "cors";
import { config } from "dotenv";
config();
import express, { json, Router } from "express";
import morgan from "morgan";

import errorHandlerMiddleware from "./middleware/error-handler.middleware";
import permissionRouter from "./modules/permission/router";
import userRouter from "./modules/user/router";

const port = 5000;
const app = express();

app.use(cors({ origin: "*" }));
app.use(json());
app.use(morgan("dev"));

app.listen(port, () => {
	console.log(`Running express on port ${port}`);
});

const routes = Router();
routes.use("/users", userRouter);
routes.use("/permissions", permissionRouter);

app.use(routes);

// Error handler middleware must at the bottom
app.use(errorHandlerMiddleware);

module.exports = app;
