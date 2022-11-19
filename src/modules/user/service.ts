import { hash } from "bcrypt";

import { UserNotFound, UsernameOrEmailInUse } from "./errors";
import UserRepository from "./repository";
import { UserCreateInput } from "./types";

export default class UserService {
	static getUserList = async () => {
		const userList = await UserRepository.getUserList();
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
		const userExists = await UserRepository.findUser(userData.username, userData.email);
		if (userExists.length > 0) {
			throw new UsernameOrEmailInUse(userData.username, userData.email);
		}
		// Encrypt the password before commiting to the database
		userData.password = await hash(userData.password, 10);
		const newUser = await UserRepository.createUser(userData);
		return newUser;
	};
}
