import { NextFunction, Request, Response } from "express";
import _ from "lodash";

import asyncWrapper from "../../middleware/async-wrapper.middleware";
import UserPermissionService from "../user_permission/service";

import UserService from "./service";
import { UserCreateInput } from "./types";

export default class UserController {
	static getUserList = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
		const page = Number(_.get(req, "query.page", 0));
		const sortColumn: string = _.get(req, "query.order_by", "").toString();
		const sortDirection: string = _.get(req, "query.sort", "").toString();
		const serviceResponse = await UserService.getUserList(page, sortColumn, sortDirection);
		return res.status(200).json(serviceResponse);
	});

	static getUserWithId = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
		const userId = Number(_.get(req, "params.id", 0));
		const serviceResponse = await UserService.getUserWithId(userId);
		return res.status(200).json(serviceResponse);
	});

	static createUser = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
		const payload: UserCreateInput = req.body;
		const serviceResponse = await UserService.createUser(payload);
		return res.status(200).json(serviceResponse);
	});

	static updateUser = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
		const userId = Number(_.get(req, "params.id", 0));
		const payload: UserCreateInput = req.body;
		const serviceResponse = await UserService.updateUser(userId, payload);
		return res.status(200).json(serviceResponse);
	});

	static deleteUser = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
		const userId = Number(_.get(req, "params.id", 0));
		const serviceResponse = await UserService.deleteUser(userId);
		return res.status(200).json(serviceResponse);
	});

	static getUserPermissions = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
		const userId = Number(_.get(req, "params.id", 0));
		const user = await UserService.getUserWithId(userId);
		const serviceResponse = await UserPermissionService.getAllUserPermissions(user.id);
		return res.status(200).json(serviceResponse);
	});

	static createUserPermission = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
		const userId = Number(_.get(req, "params.id", 0));
		const code = _.get(req, "body.code", "").toString();
		const user = await UserService.getUserWithId(userId);
		const serviceResponse = await UserPermissionService.createUserPermission(user.id, code);
		return res.status(200).json(serviceResponse);
	});

	static deleteUserPermission = asyncWrapper(async (req: Request, res: Response, _next: NextFunction) => {
		const userId = Number(_.get(req, "params.id", 0));
		const code = _.get(req, "body.code", "").toString();
		const user = await UserService.getUserWithId(userId);
		const serviceResponse = await UserPermissionService.deleteUserPermission(user.id, code);
		return res.status(200).json(serviceResponse);
	});
}
