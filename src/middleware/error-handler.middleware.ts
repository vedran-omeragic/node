import { Request, Response, NextFunction } from "express";
import _ from "lodash";

function errorHandlerMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
	const status = _.get(err, "status") || 500;
	res.status(status).json(err);

	if (process.env.NODE_ENV === "development") {
		console.error("\x1b[31m%s\x1b[0m", `⛔️ ${err.stack}`);
	}
}

export default errorHandlerMiddleware;
