export class CustomAPIError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super();
		this.message = message;
		this.status = status;
	}
}

export class RequestValidationError extends CustomAPIError {
	validationErrors: any;

	constructor(validationErrors: any, status: number) {
		super("Request validation failed.", status);
		this.validationErrors = validationErrors;
	}
}
