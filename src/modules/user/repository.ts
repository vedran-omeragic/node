import prisma from "../../prisma_client";

import { UserOutput } from "./types";

export default class UserRepository {
	static async getUserList(): Promise<UserOutput[]> {
		return await prisma.user.findMany({
			include: {
				user_permissions: true,
			},
			where: {},
		});
	}
}
