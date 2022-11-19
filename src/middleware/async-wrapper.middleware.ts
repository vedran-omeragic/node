import { Request, Response } from "express";

/* eslint-disable @typescript-eslint/ban-types */
function asyncWrapper(fn: Function) {
	return async (req: Request, res: Response, next: Function) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error, req, res);
		}
	};
}

export default asyncWrapper;
