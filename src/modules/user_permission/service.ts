import { PermissionNotFound } from "../permission/errors";
import PermissionRepository from "../permission/repository";

import UserPermissionRepository from "./repository";

export default class UserPermissionService {
	static getAllUserPermissions = async (userId: number) => {
		const userPermissionList = await UserPermissionRepository.getAllUserPermissions(userId);
		return userPermissionList;
	};

	static createUserPermission = async (userId: number, code: string) => {
		const permissionExists = await PermissionRepository.getPermissionWithCode(code);
		if (!permissionExists) {
			throw new PermissionNotFound(code);
		}
		const userPermission = await UserPermissionRepository.createUserPermission(userId, code);
		return userPermission;
	};

	static deleteUserPermission = async (userId: number, code: string) => {
		const userPermission = await UserPermissionRepository.deleteUserPermission(userId, code);
		return userPermission;
	};
}
