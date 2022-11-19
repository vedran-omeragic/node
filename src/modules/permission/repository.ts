import { PermissionOutput } from "./types";

export default class PermissionRepository {
	static async getAllPermissions(): Promise<PermissionOutput[]> {
		return await prisma.permission.findMany({
			orderBy: {
				code: "asc",
			}
		});
	}
}
