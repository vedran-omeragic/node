import { Request, Response, NextFunction } from "express";
import { checkSchema, matchedData, validationResult, Schema } from "express-validator";

import { RequestValidationError } from "../api/models/errors";

import asyncWrapper from "./async-wrapper.middleware";

export const validateRequest = (schema: Schema) => {
	return asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
		await checkSchema(schema).run(req);
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			req.body = matchedData(req, { locations: ["body"] });
			req.params = matchedData(req, { locations: ["params"] });
			return next();
		}

		throw new RequestValidationError(errors["errors"], 400);
	});
};
