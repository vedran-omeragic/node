import UserRepository from "./repository";

export default class UserService {
	static getUserList = async () => {
		const userList = UserRepository.getUserList();
		return userList;
	};
}
