import { UserPermission } from "@prisma/client";

import { UserPermissionNotFound } from "./errors";
import { UserPermissionOutput } from "./types";

export default class UserPermissionRepository {
	static async getAllUserPermissions(userId: number): Promise<UserPermissionOutput[]> {
		return await prisma.userPermission.findMany({
			where: {
				user_id: userId,
			},
			orderBy: {
				permission_code: "asc",
			},
		});
	}

	static async createUserPermission(userId: number, code: string): Promise<UserPermissionOutput> {
		return await prisma.userPermission.upsert({
			where: {
				user_id_permission_code: {
					user_id: userId,
					permission_code: code,
				},
			},
			update: {},
			create: {
				user_id: userId,
				permission_code: code,
			},
			select: {
				user_id: true,
				permission_code: true,
			},
		});
	}

	static async deleteUserPermission(userId: number, code: string): Promise<UserPermission | null> {
		return await prisma.userPermission
			.delete({
				where: {
					user_id_permission_code: {
						user_id: userId,
						permission_code: code,
					},
				},
			})
			.catch(() => {
				throw new UserPermissionNotFound(userId, code);
			});
	}
}
