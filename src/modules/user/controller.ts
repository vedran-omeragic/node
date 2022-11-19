import { NextFunction, Request, Response } from "express";

import asyncWrapper from "../../middleware/async-wrapper.middleware";

import UserService from "./service";
import { UserCreateInput } from "./types";

export default class UserController {
	static getUserList = asyncWrapper(async (_req: Request, res: Response, _next: NextFunction) => {
		const serviceResponse = await UserService.getUserList();
		return res.status(200).json(serviceResponse);
	});

	static getUserWithId = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
		const userId = Number(req.params.id);
		const serviceResponse = await UserService.getUserWithId(userId);
		return res.status(200).json(serviceResponse);
	});

	static createUser = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
		const payload: UserCreateInput = req.body;
		const serviceResponse = await UserService.createUser(payload);
		return res.status(200).json(serviceResponse);
	});
}
