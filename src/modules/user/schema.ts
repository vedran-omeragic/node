import { Schema } from "express-validator";

export const UserIdSchema: Schema = {
	id: {
		in: ["params"],
		isInt: true,
		toInt: true,
		errorMessage: "Validation failed. User ID must be a number!",
	},
};

export const NewUserSchema: Schema = {
	username: {
		in: ["body"],
		isString: true,
		errorMessage: "Invalid input format for field `username`. Must be a string.",
	},
	email: {
		in: ["body"],
		isEmail: true,
		errorMessage: "Invalid input format for field `email`. Must be a valid email address.",
	},
	password: {
		in: ["body"],
		isString: true,
		errorMessage: "Invalid input format for field `password`. Must be a string.",
	},
	first_name: {
		in: ["body"],
		isString: true,
		errorMessage: "Invalid input format for field `first name`. Must be a string.",
		optional: true,
	},
	last_name: {
		in: ["body"],
		isString: true,
		errorMessage: "Invalid input format for field `last name`. Must be a string.",
		optional: true,
	},
	status: {
		in: ["body"],
		isString: true,
		errorMessage: "Invalid input format for field `status`. Must be a string.",
		optional: true,
	},
	date_of_birth: {
		in: ["body"],
		isISO8601: true,
		errorMessage: "Invalid input format for field `date of birth`. Must be a valid ISO format date value.",
		optional: true,
	},
};

export const UpdateUserSchema: Schema = {
	...UserIdSchema,
	...NewUserSchema,
};
