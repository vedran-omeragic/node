import { NextFunction, Request, Response } from "express";

import asyncWrapper from "../../middleware/async-wrapper.middleware";

import UserService from "./service";

export default class UserController {
	static getUserList = asyncWrapper(async (_req: Request, res: Response, _next: NextFunction) => {
		const serviceResponse = await UserService.getUserList();
		return res.status(200).json(serviceResponse);
	});
}
