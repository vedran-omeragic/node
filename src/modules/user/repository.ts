import prisma from "../../prisma_client";

import { UserOutput } from "./types";

const UserView = {
	id: true,
	username: true,
	password: false,
	email: true,
	first_name: true,
	last_name: true,
	date_of_birth: true,
	status: true,
	created_at: true,
	updated_at: true,
	user_permissions: true,
};

export default class UserRepository {
	static async getUserList(): Promise<UserOutput[]> {
		return await prisma.user.findMany({
			include: {
				user_permissions: true,
			},
			where: {},
		});
	}

	static async getUserWithId(id: number): Promise<UserOutput | null> {
		return await prisma.user.findUnique({
			where: { id: id },
			select: UserView,
		});
	}
}
