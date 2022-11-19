import { NextFunction, Request, Response } from "express";

import asyncWrapper from "../../middleware/async-wrapper.middleware";

import PermissionService from "./service";

export default class PermissionController {
	static getAllPermissions = asyncWrapper(async (_req: Request, res: Response, _next: NextFunction) => {
		const serviceResponse = await PermissionService.getAllPermissions();
		return res.status(200).json(serviceResponse);
	});
}
