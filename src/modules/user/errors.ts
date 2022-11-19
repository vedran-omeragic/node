import { CustomAPIError } from "../../api/models/errors";

export class UserNotFound extends CustomAPIError {
	constructor(id: number) {
		super(`User with ${id} could not be found!`, 404);
	}
}
