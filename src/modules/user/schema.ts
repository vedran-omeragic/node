import { Schema } from "express-validator";

export const UserIdSchema: Schema = {
	id: {
		in: ["params"],
		isInt: true,
		toInt: true,
		errorMessage: "Validation failed. User ID must be a number!",
	},
};
