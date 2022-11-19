import prisma from "../../prisma_client";

import { UserCreateInput, UserOutput } from "./types";

const userView = {
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
			select: userView,
		});
	}

	static async createUser(userData: UserCreateInput): Promise<UserOutput> {
		return await prisma.user.create({
			data: userData,
			select: userView,
		});
	}

	static async findUser(username: string, email: string) {
		return await prisma.user.findMany({
			where: {
				OR: [{ username: username }, { email: email }],
			},
		});
	}
}
