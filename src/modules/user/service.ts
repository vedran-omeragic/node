import { hash } from "bcrypt";

import { UserNotFound, UsernameOrEmailInUse } from "./errors";
import UserRepository from "./repository";
import { UserCreateInput } from "./types";

export default class UserService {
	static getUserList = async (page: number, sortColumn: string, sortDirection: string, search: string) => {
		const userList = await UserRepository.getUserList(page, sortColumn, sortDirection, search);
		return userList;
	};

	static getUserWithId = async (id: number) => {
		const user = await UserRepository.getUserWithId(id);
		if (!user) {
			throw new UserNotFound(id);
		}
		return user;
	};

	static createUser = async (userData: UserCreateInput) => {
		// Since username and email are unique, check to see if user with such already exist
		const userExists = await UserRepository.findUserUnique(userData.username, userData.email);
		if (userExists.length > 0) {
			throw new UsernameOrEmailInUse(userData.username, userData.email);
		}
		// Encrypt the password before commiting to the database
		userData.password = await hash(userData.password, 10);
		const newUser = await UserRepository.createUser(userData);
		return newUser;
	};

	static updateUser = async (id: number, userData: UserCreateInput) => {
		const user = await UserRepository.getUserWithId(id);
		if (!user) {
			throw new UserNotFound(id);
		}

		// If username or email changed enforce unique
		if (user.username !== userData.email || user.email !== userData.email) {
			const userExists = await UserRepository.findUserUniqueExcludeId(userData.username, userData.email, id);
			if (userExists.length > 0) {
				throw new UsernameOrEmailInUse(userData.username, userData.email);
			}
		}

		const updatedUser = await UserRepository.updateUser(id, userData);
		return updatedUser;
	};

	static deleteUser = async (id: number) => {
		const updatedUser = await UserRepository.deleteUser(id);
		return updatedUser;
	};
}
