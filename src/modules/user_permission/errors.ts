import { CustomAPIError } from "../../api/models/errors";

export class UserPermissionNotFound extends CustomAPIError {
	constructor(id: number, code: string) {
		super(`User with ID ${id} does not have ${code} permission!`, 404);
	}
}
