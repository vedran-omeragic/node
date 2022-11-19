import { UserNotFound } from "./errors";
import UserRepository from "./repository";

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
}
