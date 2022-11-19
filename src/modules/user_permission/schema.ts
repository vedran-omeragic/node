import { Schema } from "express-validator";

export const UserPermissionSchema: Schema = {
	code: {
		in: ["body"],
		isString: true,
		errorMessage: "Validation failed. User ID must be a number!",
	},
};
