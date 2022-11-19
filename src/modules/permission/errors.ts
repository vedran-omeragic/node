import { CustomAPIError } from "../../api/models/errors";

export class PermissionNotFound extends CustomAPIError {
	constructor(code: string) {
		super(`Permission ${code} does not exist!`, 404);
	}
}
