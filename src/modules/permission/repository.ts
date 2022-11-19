import { PermissionOutput } from "./types";

export default class PermissionRepository {
	static async getPermissionWithCode(code: string): Promise<PermissionOutput | null> {
		return await prisma.permission.findUnique({
			where: {
				code: code,
			},
			select: {
				code: true,
				description: true,
			},
		});
	}

	static async getAllPermissions(): Promise<PermissionOutput[]> {
		return await prisma.permission.findMany({
			orderBy: {
				code: "asc",
			},
		});
	}
}
