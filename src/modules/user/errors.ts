import { CustomAPIError } from "../../api/models/errors";

export class UserNotFound extends CustomAPIError {
	constructor(id: number) {
		super(`User with ID ${id} could not be found!`, 404);
	}
}

export class UsernameOrEmailInUse extends CustomAPIError {
	constructor(username: string, email: string) {
		super(`Username ${username} or email ${email} is already in use.`, 400);
	}
}
