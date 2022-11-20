import prisma from "../../prisma_client";

import { UserNotFound } from "./errors";
import { User, UserCreateInput, UserOutput } from "./types";

const paginationOffset = 10;

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
	static async getUserList(
		page: number,
		sortColumn?: string,
		sortDirection?: string,
		search?: string
	): Promise<UserOutput[]> {
		let orderOptions = {};
		const sortOptions: string[] = Object.keys(userView);

		if (sortColumn && sortOptions.includes(sortColumn)) {
			orderOptions = {
				[sortColumn]: sortDirection === "desc" ? "desc" : "asc",
			};
		} else {
			orderOptions = {
				created_at: "desc",
			};
		}

		return await prisma.user.findMany({
			include: {
				user_permissions: true,
			},
			where: {
				OR: [
					{
						username: {
							contains: search,
							mode: "insensitive",
						},
					},
					{
						email: {
							contains: search,
							mode: "insensitive",
						},
					},
					{
						first_name: {
							contains: search,
							mode: "insensitive",
						},
					},
					{
						last_name: {
							contains: search,
							mode: "insensitive",
						},
					},
					{
						status: {
							contains: search,
							mode: "insensitive",
						},
					},
				],
			},
			orderBy: { ...orderOptions },
			skip: page * paginationOffset,
			take: paginationOffset,
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

	static async updateUser(id: number, userData: UserCreateInput): Promise<UserOutput> {
		return await prisma.user.update({
			where: {
				id: id,
			},
			data: userData,
			select: userView,
		});
	}

	static async deleteUser(userId: number): Promise<User> {
		return await prisma.user
			.delete({
				where: {
					id: userId,
				},
			})
			.catch(() => {
				throw new UserNotFound(userId);
			});
	}

	static async findUserUnique(username: string, email: string) {
		return await prisma.user.findMany({
			where: {
				OR: [{ username: username }, { email: email }],
			},
		});
	}

	static async findUserUniqueExcludeId(username: string, email: string, id: number) {
		return await prisma.user.findMany({
			where: {
				OR: [{ username: username }, { email: email }],
				NOT: { id: id },
			},
		});
	}
}
